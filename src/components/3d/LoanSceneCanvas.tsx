import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { LoanType, HomePropertyType } from '../../lib/loan-products';
import { getRupeeCoinTexture, getRupeeNoteTexture } from '../../utils/currencyTextures';
import { detectDeviceTier } from '../../utils/deviceTier';
import { generateStudioEnvironment, getContactShadowTexture } from '../../utils/hdrStudioGenerator';
import {
  createRealisticCarMesh,
  createRealisticVillaMesh,
  createRealisticVaultMesh,
  createRealisticEducationMesh,
  createRealisticBusinessMesh,
} from './realisticAssets';

interface LoanSceneCanvasProps {
  loanType: LoanType;
  propertyType?: HomePropertyType;
  hasPMAY?: boolean;
  hasDefence?: boolean;
  loanAmount: number;
  isPrimeProfile?: boolean;
}

interface FallingCoin {
  mesh: THREE.Mesh;
  fallSpeed: number;
  rotSpeed: THREE.Vector3;
  initialX: number;
  initialZ: number;
  bounceOffset: number;
}

export const LoanSceneCanvas: React.FC<LoanSceneCanvasProps> = ({
  loanType,
  propertyType = 'villa',
  hasPMAY = false,
  hasDefence = false,
  loanAmount,
  isPrimeProfile = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const activeMeshGroupRef = useRef<THREE.Group | null>(null);
  const moneyWaterfallGroupRef = useRef<THREE.Group | null>(null);
  const fallingCoinsRef = useRef<FallingCoin[]>([]);
  const wheelsRef = useRef<THREE.Group[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // ═════════════════════════════════════════════════════════════════════════
  // BUILD PHOTOREALISTIC BESPOKE 3D ASSETS
  // ═════════════════════════════════════════════════════════════════════════
  const buildProductMesh = (
    scene: THREE.Scene,
    type: LoanType,
    propType: HomePropertyType,
    pmay: boolean,
    def: boolean,
    amount: number,
    isPrime: boolean
  ) => {
    // 1. Clean up existing active group
    if (activeMeshGroupRef.current) {
      activeMeshGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
        }
      });
      scene.remove(activeMeshGroupRef.current);
    }
    wheelsRef.current = [];

    const group = new THREE.Group();
    const isHighValue = amount > 5000000 || isPrime;

    // Currency Textures
    const coinTexture = getRupeeCoinTexture();
    const note500Texture = getRupeeNoteTexture('500');
    const note2000Texture = getRupeeNoteTexture('2000');
    const contactShadowTexture = getContactShadowTexture();

    // ═══════════════════════════════════════════════════════════════════════
    // PHYSICAL PBR MATERIALS PALETTE
    // ═══════════════════════════════════════════════════════════════════════
    const carPaintMat = new THREE.MeshPhysicalMaterial({
      color: isPrime ? 0x061124 : (amount > 3000000 ? 0x0d1b2a : 0x0a0f1d),
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
    });

    const physicalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transmission: 0.94,
      opacity: 1.0,
      transparent: true,
      roughness: 0.03,
      ior: 1.52,
      thickness: 0.7,
      attenuationColor: new THREE.Color(0x38bdf8),
      attenuationDistance: 1.6,
    });

    const liquidGoldMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      metalness: 0.98,
      roughness: 0.14,
      clearcoat: 0.8,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
    });

    const brushedTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      metalness: 0.96,
      roughness: 0.2,
    });

    const stainlessSteelMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.92,
      roughness: 0.3,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.08,
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.4,
    });

    const tireRubberMat = new THREE.MeshStandardMaterial({
      color: 0x171717,
      metalness: 0.1,
      roughness: 0.85,
    });

    const brakeRotorMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.98,
      roughness: 0.25,
    });

    const brakeCaliperMat = new THREE.MeshPhysicalMaterial({
      color: 0xdc2626,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.9,
    });

    const stuccoMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.65,
      metalness: 0.15,
    });

    const basaltStoneMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.75,
      metalness: 0.3,
    });

    const teakWoodMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.6,
      metalness: 0.05,
    });

    const solarPanelMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a8a,
      metalness: 0.92,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });

    const warmInteriorMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    const richLeatherMat1 = new THREE.MeshStandardMaterial({
      color: 0x271c19,
      roughness: 0.55,
      metalness: 0.15,
    });
    const richLeatherMat2 = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.55,
      metalness: 0.15,
    });
    const richLeatherMat3 = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      roughness: 0.55,
      metalness: 0.15,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.25,
    });

    const capFabricMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.7,
      metalness: 0.1,
    });

    const coinFaceMat = new THREE.MeshStandardMaterial({
      map: coinTexture,
      metalness: 0.95,
      roughness: 0.18,
    });
    const coinMaterials = [liquidGoldMat, coinFaceMat, coinFaceMat];

    const note500Mat = new THREE.MeshStandardMaterial({
      map: note500Texture,
      side: THREE.DoubleSide,
      roughness: 0.4,
      metalness: 0.25,
    });
    const note2000Mat = new THREE.MeshStandardMaterial({
      map: note2000Texture,
      side: THREE.DoubleSide,
      roughness: 0.4,
      metalness: 0.25,
    });

    // ═══════════════════════════════════════════════════════════════════════
    // GROUND CONTACT SHADOW & CENTERED PRESENTATION PEDESTAL
    // ═══════════════════════════════════════════════════════════════════════
    const shadowGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: contactShadowTexture,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
    });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -0.56;
    group.add(groundShadow);

    const pedestalRingGeo = new THREE.RingGeometry(2.1, 2.16, 64);
    const pedestalRingMat = new THREE.MeshBasicMaterial({
      color: isPrime ? 0xbef264 : 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const pedestalRing = new THREE.Mesh(pedestalRingGeo, pedestalRingMat);
    pedestalRing.rotation.x = -Math.PI / 2;
    pedestalRing.position.y = -0.55;
    group.add(pedestalRing);

    // ═══════════════════════════════════════════════════════════════════════
    // ASSET MODEL SELECTION & INJECTION
    // ═══════════════════════════════════════════════════════════════════════
    let assetResult: { group: THREE.Group; wheels?: THREE.Group[] };

    if (type === 'car') {
      assetResult = createRealisticCarMesh(
        carPaintMat,
        physicalGlassMat,
        brushedTitaniumMat,
        carbonMat,
        tireRubberMat,
        brakeRotorMat,
        brakeCaliperMat
      );
    } else if (type === 'home') {
      assetResult = createRealisticVillaMesh(
        stuccoMat,
        basaltStoneMat,
        teakWoodMat,
        physicalGlassMat,
        solarPanelMat,
        warmInteriorMat
      );
    } else if (type === 'personal') {
      assetResult = createRealisticVaultMesh(
        stainlessSteelMat,
        liquidGoldMat,
        chromeMat,
        coinMaterials,
        note500Mat,
        note2000Mat
      );
    } else if (type === 'education') {
      assetResult = createRealisticEducationMesh(
        richLeatherMat1,
        richLeatherMat2,
        richLeatherMat3,
        liquidGoldMat,
        capFabricMat
      );
    } else {
      assetResult = createRealisticBusinessMesh(
        richLeatherMat1,
        brassMat,
        chromeMat
      );
    }

    group.add(assetResult.group);
    if (assetResult.wheels) {
      wheelsRef.current = assetResult.wheels;
    }

    scene.add(group);
    activeMeshGroupRef.current = group;

    // ═══════════════════════════════════════════════════════════════════════
    // GOLDEN RUPEE (₹) CASCADE WATERFALL (BALANCED AROUND ASSET)
    // ═══════════════════════════════════════════════════════════════════════
    if (moneyWaterfallGroupRef.current) {
      scene.remove(moneyWaterfallGroupRef.current);
    }
    fallingCoinsRef.current = [];

    if (isPrime || isHighValue || type === 'personal') {
      const waterfallGroup = new THREE.Group();
      const coinGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.03, 24);
      const quality = detectDeviceTier();
      const coinCount = isPrime ? quality.moneyParticleCount : Math.round(quality.moneyParticleCount * 0.6);

      for (let i = 0; i < coinCount; i++) {
        const coinMesh = new THREE.Mesh(coinGeom, coinMaterials);
        const startX = (Math.random() - 0.5) * 2.8;
        const startY = 0.8 + Math.random() * 2.5;
        const startZ = (Math.random() - 0.5) * 2.8;

        coinMesh.position.set(startX, startY, startZ);
        coinMesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        const scale = 0.5 + Math.random() * 0.4;
        coinMesh.scale.set(scale, scale, scale);
        waterfallGroup.add(coinMesh);

        fallingCoinsRef.current.push({
          mesh: coinMesh,
          fallSpeed: 1.2 + Math.random() * 1.8,
          rotSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.12,
            (Math.random() - 0.5) * 0.18,
            (Math.random() - 0.5) * 0.12
          ),
          initialX: startX,
          initialZ: startZ,
          bounceOffset: Math.random() * 0.3,
        });
      }

      scene.add(waterfallGroup);
      moneyWaterfallGroupRef.current = waterfallGroup;
    }
  };

  // ═════════════════════════════════════════════════════════════════════════
  // MOUNT & UNREAL STUDIO LIGHTING SETUP
  // ═════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Studio Camera: Gentle 5-degree perspective perfectly centering objects
    const camera = new THREE.PerspectiveCamera(34, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.45, 5.2);
    camera.lookAt(0, 0.05, 0);

    const quality = detectDeviceTier();
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: quality.tier !== 'low',
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(quality.dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    // 1. In-Memory Studio HDR Environment Map
    const envMap = generateStudioEnvironment(renderer);
    scene.environment = envMap;

    // 2. High-Contrast Studio Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const acidKey = new THREE.DirectionalLight(0xbef264, 4.5);
    acidKey.position.set(6, 7, 5);
    scene.add(acidKey);

    const cyanRim = new THREE.DirectionalLight(0x22d3ee, 3.8);
    cyanRim.position.set(-6, -2, -4);
    scene.add(cyanRim);

    const goldPoint = new THREE.PointLight(0xfbbf24, 3.0, 12);
    goldPoint.position.set(0, 2.5, 2.5);
    scene.add(goldPoint);

    // 3. Studio Reflection Light Cards
    const cardMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const topCardGeo = new THREE.PlaneGeometry(4.8, 0.8);
    const topCard = new THREE.Mesh(topCardGeo, cardMat);
    topCard.position.set(0, 2.8, 0);
    topCard.rotation.x = Math.PI / 2;
    scene.add(topCard);

    // Build initial mesh
    buildProductMesh(scene, loanType, propertyType, hasPMAY, hasDefence, loanAmount, isPrimeProfile);

    // Mouse tracker
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ═══════════════════════════════════════════════════════════════════════
    // ANIMATION & REALISTIC TURNTABLE KINETICS LOOP (120 FPS)
    // ═══════════════════════════════════════════════════════════════════════
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (activeMeshGroupRef.current) {
        activeMeshGroupRef.current.rotation.y = elapsed * 0.26 + mouseRef.current.x * 0.35;
        activeMeshGroupRef.current.rotation.x = mouseRef.current.y * 0.16;
        activeMeshGroupRef.current.position.y = Math.sin(elapsed * 1.4) * 0.05;
      }

      // Rotate wheels smoothly
      for (const wheel of wheelsRef.current) {
        wheel.rotation.z += delta * 4.0;
      }

      // Money Waterfall Particle Kinetics
      for (const coin of fallingCoinsRef.current) {
        coin.mesh.position.y -= coin.fallSpeed * delta;
        coin.mesh.rotation.x += coin.rotSpeed.x;
        coin.mesh.rotation.y += coin.rotSpeed.y;
        coin.mesh.rotation.z += coin.rotSpeed.z;

        // Reset to top
        if (coin.mesh.position.y < -0.48 + coin.bounceOffset) {
          coin.mesh.position.y = 2.8 + Math.random() * 0.8;
          coin.mesh.position.x = (Math.random() - 0.5) * 2.8;
          coin.mesh.position.z = (Math.random() - 0.5) * 2.8;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update 3D model whenever loanType or parameters change
  useEffect(() => {
    if (sceneRef.current) {
      buildProductMesh(
        sceneRef.current,
        loanType,
        propertyType,
        hasPMAY,
        hasDefence,
        loanAmount,
        isPrimeProfile
      );
    }
  }, [loanType, propertyType, hasPMAY, hasDefence, loanAmount, isPrimeProfile]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] md:min-h-[460px] rounded-3xl relative overflow-hidden"
      aria-label="Interactive Photorealistic 3D Loan Product Visualizer"
    />
  );
};
