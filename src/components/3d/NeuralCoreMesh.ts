import * as THREE from 'three';

export class NeuralCoreMesh {
  public group: THREE.Group;
  private coreMesh: THREE.Mesh;
  private outerRing: THREE.Mesh;
  private secondaryRing: THREE.Mesh;
  private backPlate: THREE.Mesh;
  private innerSphere: THREE.Mesh;
  private fauxGlowSphere: THREE.Mesh;
  private material: THREE.MeshPhysicalMaterial;
  private wireMaterial: THREE.MeshStandardMaterial;
  private secondaryWireMaterial: THREE.MeshStandardMaterial;
  private backPlateMaterial: THREE.MeshStandardMaterial;

  constructor() {
    this.group = new THREE.Group();

    // 1. Central Core Torus Knot (Sculptural Beryllium Transducer / Liquid Chrome Engine)
    const torusGeometry = new THREE.TorusKnotGeometry(1.25, 0.38, 160, 48, 2, 3);
    this.material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#11131a'),
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      transmission: 0.25,
      thickness: 1.4,
      ior: 1.52,
    });
    this.coreMesh = new THREE.Mesh(torusGeometry, this.material);
    this.group.add(this.coreMesh);

    // 2. Primary Outer Gyroscope Tracking Ring (6DoF IMU Ring - Acid / Neon)
    const ringGeometry = new THREE.TorusGeometry(2.3, 0.035, 32, 120);
    this.wireMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#bef264'),
      emissive: new THREE.Color('#84cc16'),
      emissiveIntensity: 0.85,
      metalness: 0.9,
      roughness: 0.1,
    });
    this.outerRing = new THREE.Mesh(ringGeometry, this.wireMaterial);
    this.outerRing.rotation.x = Math.PI / 3.5;
    this.group.add(this.outerRing);

    // 3. Secondary Counter-Rotating Orbital Ring (Cyber Cyan)
    const ring2Geometry = new THREE.TorusGeometry(2.6, 0.02, 32, 120);
    this.secondaryWireMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#22d3ee'),
      emissive: new THREE.Color('#06b6d4'),
      emissiveIntensity: 0.7,
      metalness: 0.9,
      roughness: 0.15,
    });
    this.secondaryRing = new THREE.Mesh(ring2Geometry, this.secondaryWireMaterial);
    this.secondaryRing.rotation.y = Math.PI / 4;
    this.secondaryRing.rotation.x = -Math.PI / 4;
    this.group.add(this.secondaryRing);

    // 4. Back-Plate CNC Holographic Resonance Chamber
    const backPlateGeom = new THREE.CylinderGeometry(1.9, 1.9, 0.12, 64);
    this.backPlateMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#090a0f'),
      metalness: 0.95,
      roughness: 0.18,
      wireframe: true,
    });
    this.backPlate = new THREE.Mesh(backPlateGeom, this.backPlateMaterial);
    this.backPlate.rotation.x = Math.PI / 2;
    this.group.add(this.backPlate);

    // 5. Inner Neural Glow NPU Sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(0.75, 4);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#08090e'),
      emissive: new THREE.Color('#bef264'),
      emissiveIntensity: 0.9,
      wireframe: true,
    });
    this.innerSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.group.add(this.innerSphere);

    // 6. Zero-Overhead Faux-Glow Shell (ovos additive glow shell)
    const glowGeom = new THREE.SphereGeometry(1.15, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#bef264'),
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.fauxGlowSphere = new THREE.Mesh(glowGeom, glowMat);
    this.group.add(this.fauxGlowSphere);
  }

  public update(
    time: number, 
    scrollProgress: number, 
    mouseX: number, 
    mouseY: number,
    explodedProgress = 0,
    audioFrequency = 0
  ) {
    const audioPulse = audioFrequency * 0.45;

    // Kinematic Disassembly
    this.coreMesh.position.z = THREE.MathUtils.lerp(0, 2.0, explodedProgress);
    this.outerRing.position.x = THREE.MathUtils.lerp(0, 2.8, explodedProgress);
    this.outerRing.position.y = THREE.MathUtils.lerp(0, 1.4, explodedProgress);
    this.secondaryRing.position.x = THREE.MathUtils.lerp(0, -2.5, explodedProgress);
    this.secondaryRing.position.y = THREE.MathUtils.lerp(0, -1.2, explodedProgress);
    this.backPlate.position.z = THREE.MathUtils.lerp(0, -2.4, explodedProgress);
    this.innerSphere.position.y = THREE.MathUtils.lerp(0, -1.8, explodedProgress);

    // Core organic rotation + responsive mouse tilt
    this.coreMesh.rotation.x = time * 0.45 + mouseY * 0.6 + scrollProgress * Math.PI;
    this.coreMesh.rotation.y = time * 0.65 + mouseX * 0.6 + scrollProgress * Math.PI * 1.5;

    // Gyro orbital counter-rotations
    this.outerRing.rotation.z = -time * 0.6 + scrollProgress * Math.PI * 2;
    this.outerRing.rotation.y = time * 0.35;
    this.secondaryRing.rotation.x = time * 0.4 + scrollProgress * Math.PI;
    this.secondaryRing.rotation.z = time * 0.5;

    // Pulse inner core scale to audio frequency
    const pulse = 1.0 + Math.sin(time * 3.5) * 0.08 + audioPulse;
    this.innerSphere.scale.set(pulse, pulse, pulse);
    this.fauxGlowSphere.scale.set(pulse * 1.35, pulse * 1.35, pulse * 1.35);
    this.innerSphere.rotation.y = -time * 0.25;

    // Dynamic emissive overdrive from audio
    this.wireMaterial.emissiveIntensity = 0.8 + audioPulse * 2.5;
    this.secondaryWireMaterial.emissiveIntensity = 0.7 + audioPulse * 2.0;

    // Subtle floating bobbing
    this.group.position.y = Math.sin(time * 1.8) * 0.18;
  }

  public applyFinish(theme: 'obsidian' | 'aurora' | 'gold' | 'cyber') {
    switch (theme) {
      case 'obsidian':
        this.material.color.set('#0a0b10');
        this.material.metalness = 0.98;
        this.material.roughness = 0.08;
        this.wireMaterial.color.set('#bef264');
        this.wireMaterial.emissive.set('#84cc16');
        this.secondaryWireMaterial.color.set('#22d3ee');
        this.secondaryWireMaterial.emissive.set('#06b6d4');
        (this.fauxGlowSphere.material as THREE.MeshBasicMaterial).color.set('#bef264');
        break;
      case 'aurora':
        this.material.color.set('#042f2e');
        this.material.metalness = 0.85;
        this.material.roughness = 0.15;
        this.wireMaterial.color.set('#34d399');
        this.wireMaterial.emissive.set('#059669');
        this.secondaryWireMaterial.color.set('#a7f3d0');
        this.secondaryWireMaterial.emissive.set('#10b981');
        (this.fauxGlowSphere.material as THREE.MeshBasicMaterial).color.set('#34d399');
        break;
      case 'gold':
        this.material.color.set('#451a03');
        this.material.metalness = 0.98;
        this.material.roughness = 0.1;
        this.wireMaterial.color.set('#fbbf24');
        this.wireMaterial.emissive.set('#d97706');
        this.secondaryWireMaterial.color.set('#fde68a');
        this.secondaryWireMaterial.emissive.set('#b45309');
        (this.fauxGlowSphere.material as THREE.MeshBasicMaterial).color.set('#fbbf24');
        break;
      case 'cyber':
        this.material.color.set('#3b0764');
        this.material.metalness = 0.9;
        this.material.roughness = 0.18;
        this.wireMaterial.color.set('#f43f5e');
        this.wireMaterial.emissive.set('#e11d48');
        this.secondaryWireMaterial.color.set('#c084fc');
        this.secondaryWireMaterial.emissive.set('#9333ea');
        (this.fauxGlowSphere.material as THREE.MeshBasicMaterial).color.set('#f43f5e');
        break;
    }
  }
}
