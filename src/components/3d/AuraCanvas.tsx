import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ParticleConstellation } from './ParticleConstellation';
import { NeuralCoreMesh } from './NeuralCoreMesh';
import { IndianMoneyRain } from './IndianMoneyRain';
import { sound } from '../../utils/audio';
import { detectDeviceTier } from '../../utils/deviceTier';

interface AuraCanvasProps {
  finish: 'obsidian' | 'aurora' | 'gold' | 'cyber';
  explodedProgress?: number;
  lightAngle?: number;
  lightPreset?: 'clean' | 'sunset' | 'cyber' | 'noir';
}

export const AuraCanvas: React.FC<AuraCanvasProps> = ({ 
  finish, 
  explodedProgress = 0,
  lightAngle = 45,
  lightPreset = 'clean'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<NeuralCoreMesh | null>(null);
  const particlesRef = useRef<ParticleConstellation | null>(null);
  const moneyRainRef = useRef<IndianMoneyRain | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);
  const isVisibleRef = useRef(true);
  const explodedRef = useRef(explodedProgress);
  const lightAngleRef = useRef(lightAngle);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    explodedRef.current = explodedProgress;
  }, [explodedProgress]);

  useEffect(() => {
    lightAngleRef.current = lightAngle;
  }, [lightAngle]);

  // Update Studio Lights on Preset Change
  useEffect(() => {
    if (!keyLightRef.current || !rimLightRef.current) return;
    switch (lightPreset) {
      case 'clean':
        keyLightRef.current.color.set('#bef264');
        rimLightRef.current.color.set('#22d3ee');
        break;
      case 'sunset':
        keyLightRef.current.color.set('#f59e0b');
        rimLightRef.current.color.set('#fbbf24');
        break;
      case 'cyber':
        keyLightRef.current.color.set('#22d3ee');
        rimLightRef.current.color.set('#c084fc');
        break;
      case 'noir':
        keyLightRef.current.color.set('#a855f7');
        rimLightRef.current.color.set('#ec4899');
        break;
    }
  }, [lightPreset]);

  // Sync Finish Theme with 3D Materials
  useEffect(() => {
    if (coreRef.current) {
      coreRef.current.applyFinish(finish);
    }
    if (particlesRef.current) {
      particlesRef.current.setColorPalette(finish);
    }
  }, [finish]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.07);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.2);

    const quality = detectDeviceTier();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: quality.tier !== 'low',
      powerPreference: 'high-performance',
    });

    // Dynamic DPR scaling from Device Tier
    renderer.setPixelRatio(quality.dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. High-Contrast Chromatic Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const acidKey = new THREE.DirectionalLight(0xbef264, 4.0);
    acidKey.position.set(5, 5, 4);
    scene.add(acidKey);
    keyLightRef.current = acidKey;

    const cyanRim = new THREE.DirectionalLight(0x22d3ee, 3.5);
    cyanRim.position.set(-6, -4, -3);
    scene.add(cyanRim);
    rimLightRef.current = cyanRim;

    const pointGlow = new THREE.PointLight(0xbef264, 2.5, 8);
    pointGlow.position.set(0, 0, 1.2);
    scene.add(pointGlow);

    // 3. Instantiate Entities
    const particles = new ParticleConstellation(2400);
    scene.add(particles.points);
    particlesRef.current = particles;

    const moneyRain = new IndianMoneyRain(50, 24);
    scene.add(moneyRain.group);
    moneyRainRef.current = moneyRain;

    const core = new NeuralCoreMesh();
    scene.add(core.group);
    coreRef.current = core;
    core.applyFinish(finish);

    // 4. Mouse Movement Listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 5. Viewport Resize Observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisibleRef.current = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    // 7. Decoupled 120 FPS Lerped Scroll Loop (Zero React Re-render Thrash)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();
      const audioFreq = sound.getAudioFrequencyData();

      // Read live scroll target and interpolate smoothly
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = totalHeight > 0 ? Math.min(Math.max(window.scrollY / totalHeight, 0), 1) : 0;
      scrollRef.current += (targetScroll - scrollRef.current) * 0.08;

      // Orbit Key Light Angle based on AstroGL Scrubber
      const rad = (lightAngleRef.current * Math.PI) / 180;
      acidKey.position.set(Math.cos(rad) * 6, 4, Math.sin(rad) * 6);
      cyanRim.position.set(-Math.cos(rad) * 6, -3, -Math.sin(rad) * 6);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const { x: mx, y: my } = mouseRef.current;
      const currentScroll = scrollRef.current;

      particles.update(elapsedTime, mx, my, audioFreq);
      moneyRain.update(elapsedTime, mx, my, audioFreq);
      core.update(elapsedTime, currentScroll, mx, my, explodedRef.current, audioFreq);

      // Kinetic camera swerve
      camera.position.x = Math.sin(currentScroll * Math.PI) * 1.4;
      camera.position.y = -currentScroll * 2.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};
