import * as THREE from 'three';

export class ParticleConstellation {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private count: number;
  private originalPositions: Float32Array;

  constructor(count = 2400) {
    this.count = count;
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color('#bef264'); // Acid Lime
    const color2 = new THREE.Color('#22d3ee'); // Electric Cyan
    const color3 = new THREE.Color('#c084fc'); // Ultraviolet

    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 5.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixedColor = Math.random() > 0.5 
        ? color1.clone().lerp(color2, Math.random()) 
        : color2.clone().lerp(color3, Math.random());

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    this.originalPositions = new Float32Array(positions);
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geometry, this.material);
  }

  public update(time: number, mouseX: number, mouseY: number, audioFreq = 0) {
    this.points.rotation.y = time * 0.06 + mouseX * 0.25;
    this.points.rotation.x = time * 0.03 + mouseY * 0.25;

    const positions = this.geometry.attributes.position.array as Float32Array;
    const audioExpansion = audioFreq * 2.0;

    for (let i = 0; i < this.count; i += 3) {
      const idx = i * 3;
      const origX = this.originalPositions[idx];
      const origY = this.originalPositions[idx + 1];
      const origZ = this.originalPositions[idx + 2];

      const wave = (Math.sin(time * 2.2 + origX * 0.6) * 0.18) + (audioExpansion * (origX > 0 ? 0.35 : -0.35));
      positions[idx] = origX + wave;
      positions[idx + 1] = origY + Math.cos(time * 1.8 + origY * 0.6) * 0.18 + (audioExpansion * 0.25);
      positions[idx + 2] = origZ + wave;
    }
    this.geometry.attributes.position.needsUpdate = true;

    this.material.size = 0.042 + audioFreq * 0.06;
  }

  public setColorPalette(theme: 'obsidian' | 'aurora' | 'gold' | 'cyber') {
    const colors = this.geometry.attributes.color.array as Float32Array;
    let c1 = new THREE.Color('#bef264');
    let c2 = new THREE.Color('#22d3ee');

    if (theme === 'gold') {
      c1 = new THREE.Color('#fbbf24');
      c2 = new THREE.Color('#f59e0b');
    } else if (theme === 'aurora') {
      c1 = new THREE.Color('#34d399');
      c2 = new THREE.Color('#22d3ee');
    } else if (theme === 'cyber') {
      c1 = new THREE.Color('#f43f5e');
      c2 = new THREE.Color('#c084fc');
    }

    for (let i = 0; i < this.count; i++) {
      const mixed = c1.clone().lerp(c2, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    this.geometry.attributes.color.needsUpdate = true;
  }
}
