import * as THREE from 'three';
import { getRupeeCoinTexture, getRupeeNoteTexture } from '../../utils/currencyTextures';

interface FloatingCurrency {
  mesh: THREE.Mesh;
  initialPos: THREE.Vector3;
  rotSpeed: THREE.Vector3;
  floatSpeed: number;
  phase: number;
  radius: number;
}

export class IndianMoneyRain {
  public group: THREE.Group;
  private items: FloatingCurrency[] = [];

  constructor(coinCount = 45, noteCount = 20) {
    this.group = new THREE.Group();

    const coinTexture = getRupeeCoinTexture();
    const note500Texture = getRupeeNoteTexture('500');
    const note2000Texture = getRupeeNoteTexture('2000');

    // 1. Coin Materials & Geometry
    const coinGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.04, 32);
    // Face materials: side is gold metallic, top & bottom have the coin texture
    const goldRimMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.95,
      roughness: 0.2,
    });
    const coinFaceMat = new THREE.MeshStandardMaterial({
      map: coinTexture,
      metalness: 0.85,
      roughness: 0.25,
    });
    const coinMaterials = [goldRimMat, coinFaceMat, coinFaceMat];

    // 2. Note Materials & Geometry
    const noteGeom = new THREE.PlaneGeometry(0.72, 0.36);
    const note500Mat = new THREE.MeshStandardMaterial({
      map: note500Texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      roughness: 0.4,
      metalness: 0.3,
    });
    const note2000Mat = new THREE.MeshStandardMaterial({
      map: note2000Texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      roughness: 0.4,
      metalness: 0.3,
    });

    // 3. Spawn Floating Indian Rupee Coins
    for (let i = 0; i < coinCount; i++) {
      const mesh = new THREE.Mesh(coinGeom, coinMaterials);
      const radius = 3.5 + Math.random() * 6.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;
      const x = Math.cos(angle) * radius;

      mesh.position.set(x, y, z);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const scale = 0.6 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      this.group.add(mesh);
      this.items.push({
        mesh,
        initialPos: new THREE.Vector3(x, y, z),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.02
        ),
        floatSpeed: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        radius,
      });
    }

    // 4. Spawn Floating Indian Rupee Notes (₹500 and ₹2000)
    for (let i = 0; i < noteCount; i++) {
      const mat = i % 2 === 0 ? note500Mat : note2000Mat;
      const mesh = new THREE.Mesh(noteGeom, mat);
      const radius = 4.0 + Math.random() * 6.0;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;
      const x = Math.cos(angle) * radius;

      mesh.position.set(x, y, z);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const scale = 0.8 + Math.random() * 0.6;
      mesh.scale.set(scale, scale, scale);

      this.group.add(mesh);
      this.items.push({
        mesh,
        initialPos: new THREE.Vector3(x, y, z),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.015
        ),
        floatSpeed: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        radius,
      });
    }
  }

  public update(time: number, mouseX: number, mouseY: number, audioFreq = 0) {
    this.group.rotation.y = time * 0.03 + mouseX * 0.15;
    this.group.rotation.x = time * 0.015 + mouseY * 0.15;

    for (const item of this.items) {
      // Rotation
      item.mesh.rotation.x += item.rotSpeed.x * (1 + audioFreq * 2);
      item.mesh.rotation.y += item.rotSpeed.y * (1 + audioFreq * 2);
      item.mesh.rotation.z += item.rotSpeed.z * (1 + audioFreq * 2);

      // Vertical drift with loop
      const yOffset = Math.sin(time * item.floatSpeed + item.phase) * 0.6;
      item.mesh.position.y = item.initialPos.y + yOffset + (audioFreq * 0.4);
      item.mesh.position.x = item.initialPos.x + Math.cos(time * 0.5 + item.phase) * 0.2;
    }
  }
}