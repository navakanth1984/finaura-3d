import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

let sharedDracoLoader: DRACOLoader | null = null;
let sharedKTX2Loader: KTX2Loader | null = null;

export function getSharedDracoLoader(): DRACOLoader {
  if (!sharedDracoLoader) {
    sharedDracoLoader = new DRACOLoader();
    sharedDracoLoader.setDecoderPath('/draco/');
    sharedDracoLoader.preload();
  }
  return sharedDracoLoader;
}

export function getSharedKTX2Loader(renderer?: THREE.WebGLRenderer): KTX2Loader {
  if (!sharedKTX2Loader) {
    sharedKTX2Loader = new KTX2Loader();
    sharedKTX2Loader.setTranscoderPath('/basis/');
    if (renderer) {
      sharedKTX2Loader.detectSupport(renderer);
    }
  }
  return sharedKTX2Loader;
}

export function createConfiguredGLTFLoader(renderer?: THREE.WebGLRenderer): GLTFLoader {
  const loader = new GLTFLoader();
  loader.setDRACOLoader(getSharedDracoLoader());
  if (renderer) {
    loader.setKTX2Loader(getSharedKTX2Loader(renderer));
  }
  return loader;
}

export const ASSET_MODEL_REGISTRY: Record<string, { high?: string; medium?: string; low?: string }> = {
  car: {
    high: '/assets/models/car-high.glb',
    medium: '/assets/models/car-med.glb',
    low: '/assets/models/car-low.glb',
  },
  home: {
    high: '/assets/models/villa-high.glb',
    medium: '/assets/models/villa-med.glb',
    low: '/assets/models/villa-low.glb',
  },
  personal: {
    high: '/assets/models/vault-high.glb',
    medium: '/assets/models/vault-med.glb',
    low: '/assets/models/vault-low.glb',
  },
  education: {
    high: '/assets/models/mortarboard-high.glb',
    medium: '/assets/models/mortarboard-med.glb',
    low: '/assets/models/mortarboard-low.glb',
  },
  business: {
    high: '/assets/models/briefcase-high.glb',
    medium: '/assets/models/briefcase-med.glb',
    low: '/assets/models/briefcase-low.glb',
  },
};
