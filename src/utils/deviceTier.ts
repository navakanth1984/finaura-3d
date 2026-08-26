export type DeviceTier = 'low' | 'medium' | 'high';

export interface QualityConfig {
  tier: DeviceTier;
  dpr: number;
  shadowMapSize: number;
  enableShadows: boolean;
  moneyParticleCount: number;
  ambientCoinsCount: number;
  anisotropy: number;
}

export function detectDeviceTier(): QualityConfig {
  if (typeof window === 'undefined') {
    return {
      tier: 'medium',
      dpr: 1.5,
      shadowMapSize: 1024,
      enableShadows: true,
      moneyParticleCount: 24,
      ambientCoinsCount: 35,
      anisotropy: 4,
    };
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;

  if (isMobile || hardwareConcurrency <= 4 || deviceMemory <= 4) {
    return {
      tier: 'low',
      dpr: Math.min(window.devicePixelRatio || 1, 1.25),
      shadowMapSize: 512,
      enableShadows: false,
      moneyParticleCount: 16,
      ambientCoinsCount: 20,
      anisotropy: 1,
    };
  }

  if (hardwareConcurrency >= 8 && deviceMemory >= 8) {
    return {
      tier: 'high',
      dpr: Math.min(window.devicePixelRatio || 1, 2.0),
      shadowMapSize: 2048,
      enableShadows: true,
      moneyParticleCount: 42,
      ambientCoinsCount: 60,
      anisotropy: 8,
    };
  }

  return {
    tier: 'medium',
    dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    shadowMapSize: 1024,
    enableShadows: true,
    moneyParticleCount: 28,
    ambientCoinsCount: 35,
    anisotropy: 4,
  };
}
