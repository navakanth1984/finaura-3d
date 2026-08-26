import * as THREE from 'three';

let coinTextureCache: THREE.CanvasTexture | null = null;
let note500TextureCache: THREE.CanvasTexture | null = null;
let note2000TextureCache: THREE.CanvasTexture | null = null;

/**
 * Procedurally generates a high-resolution golden Indian Rupee (₹) coin texture.
 */
export function getRupeeCoinTexture(): THREE.CanvasTexture {
  if (coinTextureCache) return coinTextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // 1. Radial Golden Gradient
  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
  grad.addColorStop(0, '#fef08a'); // Bright Gold
  grad.addColorStop(0.5, '#eab308'); // Vibrant Gold
  grad.addColorStop(0.85, '#ca8a04'); // Deep Gold
  grad.addColorStop(1, '#854d0e'); // Burnished Bronze Border

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(256, 256, 250, 0, Math.PI * 2);
  ctx.fill();

  // 2. Milled Outer Coin Border (Teeth / Grooves)
  ctx.strokeStyle = '#fef9c3';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(256, 256, 235, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(256, 256, 220, 0, Math.PI * 2);
  ctx.stroke();

  // Draw 60 Milled notches around rim
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * Math.PI * 2;
    const x1 = 256 + Math.cos(angle) * 222;
    const y1 = 256 + Math.sin(angle) * 222;
    const x2 = 256 + Math.cos(angle) * 233;
    const y2 = 256 + Math.sin(angle) * 233;
    ctx.strokeStyle = i % 2 === 0 ? '#fef08a' : '#854d0e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // 3. Inner Decorative Star / Ring
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.6)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(256, 256, 175, 0, Math.PI * 2);
  ctx.stroke();

  // 4. Central Indian Rupee Symbol (₹)
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 6;

  ctx.fillStyle = '#422006'; // Embossed Dark Bronze Engraving
  ctx.font = '900 210px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('₹', 256, 246);

  // Inner Highlight on Rupee Symbol
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#fef08a';
  ctx.fillText('₹', 253, 243);

  // 5. Year / Satyameva Jayate Subtle Text
  ctx.fillStyle = '#713f12';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('INDIA  •  2026', 256, 390);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  coinTextureCache = texture;
  return texture;
}

/**
 * Procedurally generates an Indian Rupee Banknote texture (₹500 / ₹2000 styling).
 */
export function getRupeeNoteTexture(denomination: '500' | '2000'): THREE.CanvasTexture {
  if (denomination === '500' && note500TextureCache) return note500TextureCache;
  if (denomination === '2000' && note2000TextureCache) return note2000TextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const is500 = denomination === '500';
  const mainColor = is500 ? '#0f766e' : '#be185d'; // Emerald stone vs Magenta
  const darkColor = is500 ? '#115e59' : '#9d174d';
  const lightColor = is500 ? '#2dd4bf' : '#f472b6';
  const accentColor = is500 ? '#bef264' : '#fbbf24';

  // 1. Banknote Background with Gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 256);
  grad.addColorStop(0, darkColor);
  grad.addColorStop(0.5, mainColor);
  grad.addColorStop(1, darkColor);

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // 2. Guilloche Geometric Border Pattern
  ctx.strokeStyle = lightColor;
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, 488, 232);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, 472, 216);

  // 3. Security Thread Band (Metallic Holographic Stripe)
  const stripeGrad = ctx.createLinearGradient(160, 0, 180, 0);
  stripeGrad.addColorStop(0, 'rgba(190, 242, 100, 0.4)');
  stripeGrad.addColorStop(0.5, '#bef264');
  stripeGrad.addColorStop(1, 'rgba(34, 211, 238, 0.4)');
  ctx.fillStyle = stripeGrad;
  ctx.fillRect(160, 12, 18, 232);

  // 4. Header RBI Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('RESERVE BANK OF INDIA', 200, 48);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '11px sans-serif';
  ctx.fillText('GUARANTEED BY CENTRAL GOVT', 200, 68);

  // 5. Large Denomination
  ctx.fillStyle = accentColor;
  ctx.font = '900 64px sans-serif';
  ctx.fillText(`₹${denomination}`, 200, 150);

  // 6. Mahatma Gandhi Watermark Oval
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(80, 128, 55, 75, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('₹', 80, 136);

  // 7. Microtext Serial
  ctx.font = 'bold 13px monospace';
  ctx.fillStyle = '#fef08a';
  ctx.textAlign = 'right';
  ctx.fillText('7AC 894210', 480, 225);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  if (is500) {
    note500TextureCache = texture;
  } else {
    note2000TextureCache = texture;
  }

  return texture;
}