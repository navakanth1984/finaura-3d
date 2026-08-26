import * as THREE from 'three';

let cachedEnvironmentMap: THREE.Texture | null = null;

/**
 * Generates an in-memory photorealistic Studio HDRI Equirectangular Environment Map.
 * Provides real-time softbox reflections, chrome specular highlights, and glass refractions
 * without requiring external 20MB HDR files.
 */
export function generateStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  if (cachedEnvironmentMap) {
    return cachedEnvironmentMap;
  }

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallbackTexture = new THREE.Texture();
    return fallbackTexture;
  }

  // 1. Dark Studio Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#040608');
  bgGrad.addColorStop(0.4, '#090d16');
  bgGrad.addColorStop(0.5, '#020305');
  bgGrad.addColorStop(1.0, '#000000');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Large Overhead Studio Softbox (Key highlight across car hood & villa roof)
  const topSoftbox = ctx.createRadialGradient(width * 0.5, height * 0.22, 10, width * 0.5, height * 0.22, width * 0.35);
  topSoftbox.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  topSoftbox.addColorStop(0.3, 'rgba(220, 245, 255, 0.85)');
  topSoftbox.addColorStop(0.7, 'rgba(120, 180, 255, 0.25)');
  topSoftbox.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = topSoftbox;
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.22, width * 0.38, height * 0.16, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Right Key Light (Warm Acid / Golden Banking Glow)
  const rightKey = ctx.createRadialGradient(width * 0.82, height * 0.38, 5, width * 0.82, height * 0.38, width * 0.25);
  rightKey.addColorStop(0, 'rgba(235, 255, 160, 0.95)');
  rightKey.addColorStop(0.4, 'rgba(190, 242, 100, 0.5)');
  rightKey.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = rightKey;
  ctx.beginPath();
  ctx.ellipse(width * 0.82, height * 0.38, width * 0.22, height * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // 4. Left Rim Light (Cool Cyan Tech Lighting)
  const leftRim = ctx.createRadialGradient(width * 0.18, height * 0.42, 5, width * 0.18, height * 0.42, width * 0.25);
  leftRim.addColorStop(0, 'rgba(180, 245, 255, 0.9)');
  leftRim.addColorStop(0.4, 'rgba(34, 211, 238, 0.45)');
  leftRim.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = leftRim;
  ctx.beginPath();
  ctx.ellipse(width * 0.18, height * 0.42, width * 0.22, height * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // 5. Elongated Horizontal Horizon Strips (Creates sleek automotive edge reflections)
  const horizonGrad = ctx.createLinearGradient(0, height * 0.45, 0, height * 0.55);
  horizonGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  horizonGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
  horizonGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = horizonGrad;
  ctx.fillRect(0, height * 0.46, width, height * 0.08);

  // 6. Convert to Equirectangular PMREM Map
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.needsUpdate = true;

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const renderTarget = pmremGenerator.fromEquirectangular(texture);
  cachedEnvironmentMap = renderTarget.texture;

  texture.dispose();
  pmremGenerator.dispose();

  return cachedEnvironmentMap;
}

/**
 * Creates an ultra-soft radial ambient occlusion contact shadow texture for grounding 3D objects.
 */
export function getContactShadowTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const center = size / 2;
    const grad = ctx.createRadialGradient(center, center, size * 0.05, center, center, size * 0.45);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    grad.addColorStop(0.3, 'rgba(0, 0, 0, 0.65)');
    grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.3)');
    grad.addColorStop(0.85, 'rgba(0, 0, 0, 0.08)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(center, center, size * 0.48, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
