import * as THREE from 'three';
import { HomePropertyType } from '../../lib/loan-products';
import { getRupeeCoinTexture, getRupeeNoteTexture } from '../../utils/currencyTextures';

export interface BuiltAssetResult {
  group: THREE.Group;
  wheels?: THREE.Group[];
}

/**
 * Builds an authentic, proportionally accurate luxury sports sedan.
 */
export function createRealisticCarMesh(
  carPaintMat: THREE.Material,
  physicalGlassMat: THREE.Material,
  brushedTitaniumMat: THREE.Material,
  carbonMat: THREE.Material,
  tireRubberMat: THREE.Material,
  brakeRotorMat: THREE.Material,
  brakeCaliperMat: THREE.Material
): BuiltAssetResult {
  const carGroup = new THREE.Group();
  const wheels: THREE.Group[] = [];

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.08,
  });
  const mirrorGlassMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 1.0,
    roughness: 0.02,
  });
  const grilleMeshMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0c,
    metalness: 0.8,
    roughness: 0.6,
  });
  const headlightLedMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
  const taillightLedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  // 1. Lower Body Chassis
  const lowerBodyGeo = new THREE.BoxGeometry(2.9, 0.42, 1.3);
  const lowerBody = new THREE.Mesh(lowerBodyGeo, carPaintMat);
  lowerBody.position.set(0, -0.12, 0);
  carGroup.add(lowerBody);

  // 2. Front Hood (Sloped downward)
  const hoodGeo = new THREE.BoxGeometry(0.92, 0.2, 1.24);
  const hood = new THREE.Mesh(hoodGeo, carPaintMat);
  hood.position.set(0.98, -0.03, 0);
  hood.rotation.z = -0.08;
  carGroup.add(hood);

  // 3. Front Bumper & Lower Air Intake Grille
  const bumperGeo = new THREE.BoxGeometry(0.28, 0.34, 1.28);
  const bumper = new THREE.Mesh(bumperGeo, carPaintMat);
  bumper.position.set(1.42, -0.18, 0);
  carGroup.add(bumper);

  const grilleGeo = new THREE.BoxGeometry(0.08, 0.2, 0.9);
  const grille = new THREE.Mesh(grilleGeo, grilleMeshMat);
  grille.position.set(1.56, -0.2, 0);
  carGroup.add(grille);

  const grilleSurround = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.24, 0.94), chromeMat);
  grilleSurround.position.set(1.55, -0.2, 0);
  carGroup.add(grilleSurround);

  // 4. Rear Trunk & Bumper
  const trunkGeo = new THREE.BoxGeometry(0.62, 0.24, 1.24);
  const trunk = new THREE.Mesh(trunkGeo, carPaintMat);
  trunk.position.set(-1.14, -0.02, 0);
  carGroup.add(trunk);

  const rearBumperGeo = new THREE.BoxGeometry(0.26, 0.36, 1.28);
  const rearBumper = new THREE.Mesh(rearBumperGeo, carPaintMat);
  rearBumper.position.set(-1.42, -0.16, 0);
  carGroup.add(rearBumper);

  // Dual Chrome Exhaust Tips
  const exhaustGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.12, 16);
  const exhaustL = new THREE.Mesh(exhaustGeo, chromeMat);
  exhaustL.rotation.z = Math.PI / 2;
  exhaustL.position.set(-1.55, -0.26, 0.38);
  const exhaustR = new THREE.Mesh(exhaustGeo, chromeMat);
  exhaustR.rotation.z = Math.PI / 2;
  exhaustR.position.set(-1.55, -0.26, -0.38);
  carGroup.add(exhaustL, exhaustR);

  // 5. Upper Cabin Pillars & Roof
  const roofGeo = new THREE.BoxGeometry(1.15, 0.05, 1.02);
  const roof = new THREE.Mesh(roofGeo, carPaintMat);
  roof.position.set(-0.1, 0.44, 0);
  carGroup.add(roof);

  // Front Windshield (Sloped)
  const windshieldGeo = new THREE.BoxGeometry(0.62, 0.04, 1.08);
  const windshield = new THREE.Mesh(windshieldGeo, physicalGlassMat);
  windshield.position.set(0.58, 0.23, 0);
  windshield.rotation.z = -Math.PI / 4.2;
  carGroup.add(windshield);

  // Rear Windshield (Sloped)
  const rearWindowGeo = new THREE.BoxGeometry(0.58, 0.04, 1.08);
  const rearWindow = new THREE.Mesh(rearWindowGeo, physicalGlassMat);
  rearWindow.position.set(-0.74, 0.23, 0);
  rearWindow.rotation.z = Math.PI / 4.2;
  carGroup.add(rearWindow);

  // Side Glass
  const sideGlassGeo = new THREE.BoxGeometry(1.22, 0.36, 0.04);
  const sideGlassL = new THREE.Mesh(sideGlassGeo, physicalGlassMat);
  sideGlassL.position.set(-0.1, 0.24, 0.52);
  const sideGlassR = new THREE.Mesh(sideGlassGeo, physicalGlassMat);
  sideGlassR.position.set(-0.1, 0.24, -0.52);
  carGroup.add(sideGlassL, sideGlassR);

  const pillarL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.36, 0.06), carbonMat);
  pillarL.position.set(-0.1, 0.24, 0.52);
  const pillarR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.36, 0.06), carbonMat);
  pillarR.position.set(-0.1, 0.24, -0.52);
  carGroup.add(pillarL, pillarR);

  // 6. Side Mirrors
  const mirrorHousingGeo = new THREE.BoxGeometry(0.12, 0.1, 0.15);
  const mirrorL = new THREE.Mesh(mirrorHousingGeo, carPaintMat);
  mirrorL.position.set(0.46, 0.14, 0.68);
  const mirrorGlassL = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.07), mirrorGlassMat);
  mirrorGlassL.rotation.y = -Math.PI / 2;
  mirrorGlassL.position.set(0.45, 0.14, 0.75);

  const mirrorR = new THREE.Mesh(mirrorHousingGeo, carPaintMat);
  mirrorR.position.set(0.46, 0.14, -0.68);
  const mirrorGlassR = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.07), mirrorGlassMat);
  mirrorGlassR.rotation.y = Math.PI / 2;
  mirrorGlassR.position.set(0.45, 0.14, -0.75);
  carGroup.add(mirrorL, mirrorGlassL, mirrorR, mirrorGlassR);

  // 7. Headlight & Taillight Assemblies
  const headlightR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.28), headlightLedMat);
  headlightR.position.set(1.44, -0.04, 0.46);
  const headlightL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.28), headlightLedMat);
  headlightL.position.set(1.44, -0.04, -0.46);

  const headlightGlassR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 0.3), physicalGlassMat);
  headlightGlassR.position.copy(headlightR.position);
  const headlightGlassL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 0.3), physicalGlassMat);
  headlightGlassL.position.copy(headlightL.position);
  carGroup.add(headlightR, headlightL, headlightGlassR, headlightGlassL);

  const taillightR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.3), taillightLedMat);
  taillightR.position.set(-1.48, -0.02, 0.46);
  const taillightL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.3), taillightLedMat);
  taillightL.position.set(-1.48, -0.02, -0.46);
  const centerLightbar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.62), taillightLedMat);
  centerLightbar.position.set(-1.47, -0.02, 0);
  carGroup.add(taillightR, taillightL, centerLightbar);

  // 8. Four Realistic Wheels
  const wheelPositions = [
    { x: 0.92, z: 0.65 },
    { x: 0.92, z: -0.65 },
    { x: -0.92, z: 0.65 },
    { x: -0.92, z: -0.65 },
  ];

  wheelPositions.forEach((pos) => {
    const wheelAssembly = new THREE.Group();
    wheelAssembly.position.set(pos.x, -0.3, pos.z);

    const tireGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.2, 32);
    const tire = new THREE.Mesh(tireGeo, tireRubberMat);
    tire.rotation.x = Math.PI / 2;
    wheelAssembly.add(tire);

    const rimLip = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.21, 32), brushedTitaniumMat);
    rimLip.rotation.x = Math.PI / 2;
    wheelAssembly.add(rimLip);

    const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.04, 24), brakeRotorMat);
    rotor.rotation.x = Math.PI / 2;
    wheelAssembly.add(rotor);

    const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.13, 0.06), brakeCaliperMat);
    caliper.position.set(0.11, 0.08, pos.z > 0 ? -0.05 : 0.05);
    wheelAssembly.add(caliper);

    for (let s = 0; s < 5; s++) {
      const angle = (s * Math.PI * 2) / 5;
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.21, 0.02), chromeMat);
      spoke.rotation.z = angle;
      spoke.position.z = pos.z > 0 ? 0.1 : -0.1;
      wheelAssembly.add(spoke);
    }

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.22, 16), chromeMat);
    hub.rotation.x = Math.PI / 2;
    wheelAssembly.add(hub);

    carGroup.add(wheelAssembly);
    wheels.push(wheelAssembly);
  });

  // Perfectly Centered Vertically
  carGroup.position.set(0, 0.06, 0);
  return { group: carGroup, wheels };
}

/**
 * Builds an authentic, architectural modern luxury residence.
 */
export function createRealisticVillaMesh(
  stuccoMat: THREE.Material,
  basaltStoneMat: THREE.Material,
  teakWoodMat: THREE.Material,
  physicalGlassMat: THREE.Material,
  solarPanelMat: THREE.Material,
  warmInteriorMat: THREE.Material
): BuiltAssetResult {
  const villaGroup = new THREE.Group();

  const lawnGrassMat = new THREE.MeshStandardMaterial({
    color: 0x166534,
    roughness: 0.85,
    metalness: 0.1,
  });
  const pavedStoneMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.7,
    metalness: 0.2,
  });
  const windowFrameMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.3,
  });

  // 1. Manicured Lawn Foundation Base
  const baseGeo = new THREE.BoxGeometry(3.2, 0.08, 2.5);
  const base = new THREE.Mesh(baseGeo, lawnGrassMat);
  base.position.set(0, -0.46, 0);
  villaGroup.add(base);

  // Concrete Walkway Entrance
  const walkwayGeo = new THREE.BoxGeometry(0.8, 0.02, 1.2);
  const walkway = new THREE.Mesh(walkwayGeo, pavedStoneMat);
  walkway.position.set(0.5, -0.41, 0.7);
  villaGroup.add(walkway);

  // 2. Ground Floor Living Pavilion
  const groundFloorGeo = new THREE.BoxGeometry(2.2, 0.68, 1.6);
  const groundFloor = new THREE.Mesh(groundFloorGeo, stuccoMat);
  groundFloor.position.set(0, -0.08, 0);
  villaGroup.add(groundFloor);

  // Basalt Stone Accent Wall
  const stoneWallGeo = new THREE.BoxGeometry(0.2, 0.76, 1.64);
  const stoneWall = new THREE.Mesh(stoneWallGeo, basaltStoneMat);
  stoneWall.position.set(-1.05, -0.04, 0);
  villaGroup.add(stoneWall);

  // Floor-to-Ceiling Ground Glass Facade
  const groundGlassGeo = new THREE.BoxGeometry(1.5, 0.58, 0.05);
  const groundGlass = new THREE.Mesh(groundGlassGeo, physicalGlassMat);
  groundGlass.position.set(0.28, -0.08, 0.81);

  const mullionV = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.58, 0.07), windowFrameMat);
  mullionV.position.set(0.28, -0.08, 0.81);
  villaGroup.add(groundGlass, mullionV);

  // Warm Interior Lighting Glow Plane
  const warmInterior = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.04, 1.1), warmInteriorMat);
  warmInterior.position.set(0.28, 0.06, 0.2);
  villaGroup.add(warmInterior);

  // 3. Cantilevered Upper Master Suite
  const upperFloorGeo = new THREE.BoxGeometry(1.9, 0.64, 1.5);
  const upperFloor = new THREE.Mesh(upperFloorGeo, stuccoMat);
  upperFloor.position.set(-0.25, 0.56, 0.08);
  villaGroup.add(upperFloor);

  // Teak Wood Siding Panel
  const teakPanelGeo = new THREE.BoxGeometry(0.78, 0.62, 0.04);
  const teakPanel = new THREE.Mesh(teakPanelGeo, teakWoodMat);
  teakPanel.position.set(-0.8, 0.56, 0.84);
  villaGroup.add(teakPanel);

  // Upper Panoramic Bedroom Glass Suite
  const upperGlassGeo = new THREE.BoxGeometry(1.0, 0.52, 0.05);
  const upperGlass = new THREE.Mesh(upperGlassGeo, physicalGlassMat);
  upperGlass.position.set(0.16, 0.56, 0.84);
  villaGroup.add(upperGlass);

  // 4. Cantilever Balcony with Glass Railing
  const balconySlabGeo = new THREE.BoxGeometry(1.1, 0.05, 0.48);
  const balconySlab = new THREE.Mesh(balconySlabGeo, stuccoMat);
  balconySlab.position.set(0.16, 0.24, 1.06);

  const balconyGlassGeo = new THREE.BoxGeometry(1.1, 0.3, 0.02);
  const balconyGlass = new THREE.Mesh(balconyGlassGeo, physicalGlassMat);
  balconyGlass.position.set(0.16, 0.41, 1.29);
  villaGroup.add(balconySlab, balconyGlass);

  // 5. Rooftop Photovoltaic Solar Arrays
  for (let p = 0; p < 4; p++) {
    const panelGeo = new THREE.BoxGeometry(0.38, 0.03, 0.6);
    const panel = new THREE.Mesh(panelGeo, solarPanelMat);
    panel.position.set(-0.7 + p * 0.42, 0.91, -0.08);
    panel.rotation.x = -0.1;
    villaGroup.add(panel);
  }

  // 6. Modern Infinity Reflection Pool
  const poolBorder = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, 0.75), pavedStoneMat);
  poolBorder.position.set(0.78, -0.42, 0.45);

  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    roughness: 0.03,
    metalness: 0.85,
    transmission: 0.9,
    transparent: true,
  });
  const water = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.05, 0.62), waterMat);
  water.position.set(0.78, -0.38, 0.45);
  villaGroup.add(poolBorder, water);

  // Perfectly Centered Vertically
  villaGroup.position.set(0, 0.04, 0);
  return { group: villaGroup };
}

/**
 * Builds an authentic heavy bank vault door & gold reserve stack.
 */
export function createRealisticVaultMesh(
  stainlessSteelMat: THREE.Material,
  goldBullionMat: THREE.Material,
  chromeMat: THREE.Material,
  coinMaterials: THREE.Material[],
  note500Mat: THREE.Material,
  note2000Mat: THREE.Material
): BuiltAssetResult {
  const vaultGroup = new THREE.Group();

  // 1. Heavy Circular Steel Portal Casing (Scaled to fit frame gracefully)
  const outerPortalGeo = new THREE.CylinderGeometry(1.18, 1.18, 0.38, 36);
  const outerPortal = new THREE.Mesh(outerPortalGeo, stainlessSteelMat);
  outerPortal.rotation.x = Math.PI / 2;
  vaultGroup.add(outerPortal);

  // 2. Beveled Vault Door Frame
  const innerDoorGeo = new THREE.CylinderGeometry(0.98, 0.98, 0.44, 36);
  const innerDoor = new THREE.Mesh(innerDoorGeo, chromeMat);
  innerDoor.rotation.x = Math.PI / 2;
  vaultGroup.add(innerDoor);

  // 3. 16 Heavy Radial Locking Chrome Bolts
  for (let b = 0; b < 16; b++) {
    const angle = (b * Math.PI * 2) / 16;
    const boltGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.18, 16);
    const bolt = new THREE.Mesh(boltGeo, goldBullionMat);
    bolt.position.set(Math.cos(angle) * 1.0, Math.sin(angle) * 1.0, 0.16);
    bolt.rotation.x = Math.PI / 2;
    vaultGroup.add(bolt);
  }

  // 4. Central Vault Multi-Spoke Locking Wheel
  const centerHubGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 24);
  const centerHub = new THREE.Mesh(centerHubGeo, chromeMat);
  centerHub.rotation.x = Math.PI / 2;
  centerHub.position.z = 0.26;
  vaultGroup.add(centerHub);

  for (let s = 0; s < 6; s++) {
    const spokeAngle = (s * Math.PI * 2) / 6;
    const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.65, 16), chromeMat);
    spoke.position.set(Math.cos(spokeAngle) * 0.24, Math.sin(spokeAngle) * 0.24, 0.3);
    spoke.rotation.z = spokeAngle + Math.PI / 2;
    vaultGroup.add(spoke);

    const handle = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), goldBullionMat);
    handle.position.set(Math.cos(spokeAngle) * 0.56, Math.sin(spokeAngle) * 0.56, 0.3);
    vaultGroup.add(handle);
  }

  // 5. Stamped 24K 999.9 Gold Bullion Bars
  const bullionGeo = new THREE.BoxGeometry(0.46, 0.12, 0.22);
  for (let bar = 0; bar < 8; bar++) {
    const bullion = new THREE.Mesh(bullionGeo, goldBullionMat);
    const row = Math.floor(bar / 4);
    const col = bar % 4;
    bullion.position.set(-0.42 + col * 0.28, -0.48 + row * 0.15, 0.36);
    vaultGroup.add(bullion);
  }

  // 6. Stacks of ₹500 & ₹2000 Indian Banknotes
  for (let n = 0; n < 6; n++) {
    const bundleGeo = new THREE.BoxGeometry(0.38, 0.08, 0.2);
    const bundle = new THREE.Mesh(bundleGeo, n % 2 === 0 ? note500Mat : note2000Mat);
    bundle.position.set(-0.38 + (n % 3) * 0.38, 0.44 - Math.floor(n / 3) * 0.12, 0.32);
    vaultGroup.add(bundle);
  }

  // 7. Large Golden Rupee (₹) Presentation Coin
  const heroCoin = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.07, 32), coinMaterials);
  heroCoin.rotation.x = Math.PI / 2;
  heroCoin.position.set(0, 0, 0.35);
  vaultGroup.add(heroCoin);

  // Perfectly Centered Vertically
  vaultGroup.position.set(0, 0.06, 0);
  return { group: vaultGroup };
}

/**
 * Builds an authentic academic scholar mortarboard & library reference books.
 */
export function createRealisticEducationMesh(
  leatherMat1: THREE.Material,
  leatherMat2: THREE.Material,
  leatherMat3: THREE.Material,
  gildedGoldMat: THREE.Material,
  capFabricMat: THREE.Material
): BuiltAssetResult {
  const eduGroup = new THREE.Group();

  const mats = [leatherMat1, leatherMat2, leatherMat3];
  const widths = [1.6, 1.45, 1.32];
  const depths = [1.2, 1.1, 0.98];

  for (let b = 0; b < 3; b++) {
    const book = new THREE.Mesh(new THREE.BoxGeometry(widths[b], 0.16, depths[b]), mats[b]);
    book.position.set(0, -0.38 + b * 0.18, 0);
    book.rotation.y = (b - 1) * 0.12;
    eduGroup.add(book);

    const pages = new THREE.Mesh(new THREE.BoxGeometry(widths[b] - 0.08, 0.12, depths[b] - 0.08), gildedGoldMat);
    pages.position.copy(book.position);
    pages.rotation.copy(book.rotation);
    eduGroup.add(pages);
  }

  const skull = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.44, 0.26, 24), capFabricMat);
  skull.position.set(0, 0.22, 0);
  eduGroup.add(skull);

  const capSquare = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 1.2), capFabricMat);
  capSquare.position.set(0, 0.38, 0);
  capSquare.rotation.y = Math.PI / 4;
  eduGroup.add(capSquare);

  const button = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), gildedGoldMat);
  button.position.set(0, 0.42, 0);
  eduGroup.add(button);

  const tasselCord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 0.55, 8), gildedGoldMat);
  tasselCord.position.set(0.34, 0.24, 0.34);
  tasselCord.rotation.z = -Math.PI / 4;
  eduGroup.add(tasselCord);

  // Perfectly Centered Vertically
  eduGroup.position.set(0, 0.06, 0);
  return { group: eduGroup };
}

/**
 * Builds an authentic executive leather briefcase & financial asset ledger.
 */
export function createRealisticBusinessMesh(
  leatherMat: THREE.Material,
  brassMat: THREE.Material,
  chromeMat: THREE.Material
): BuiltAssetResult {
  const bizGroup = new THREE.Group();

  const briefcase = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.25, 0.52), leatherMat);
  briefcase.position.set(0, -0.06, 0);
  bizGroup.add(briefcase);

  const cornerGeo = new THREE.BoxGeometry(0.2, 0.2, 0.54);
  const cornerPositions = [
    { x: 0.82, y: 0.48 },
    { x: -0.82, y: 0.48 },
    { x: 0.82, y: -0.6 },
    { x: -0.82, y: -0.6 },
  ];
  cornerPositions.forEach((pos) => {
    const corner = new THREE.Mesh(cornerGeo, brassMat);
    corner.position.set(pos.x, pos.y, 0);
    bizGroup.add(corner);
  });

  const latchL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.06), brassMat);
  latchL.position.set(-0.45, 0.32, 0.27);
  const latchR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.06), brassMat);
  latchR.position.set(0.45, 0.32, 0.27);
  bizGroup.add(latchL, latchR);

  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 16, 24, Math.PI), leatherMat);
  handle.position.set(0, 0.58, 0);
  bizGroup.add(handle);

  const dRingL = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.018, 12, 16), brassMat);
  dRingL.position.set(-0.22, 0.58, 0);
  const dRingR = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.018, 12, 16), brassMat);
  dRingR.position.set(0.22, 0.58, 0);
  bizGroup.add(dRingL, dRingR);

  // Perfectly Centered Vertically
  bizGroup.position.set(0, 0.06, 0);
  return { group: bizGroup };
}
