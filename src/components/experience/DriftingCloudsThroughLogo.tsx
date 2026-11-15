"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DriftingCloudsThroughLogoProps {
  scrollProgress: number;
}

interface CloudParticleData {
  initialPos: [number, number, number];
  scale: [number, number];
  speed: number;
  rotationSpeed: number;
  phase: number;
  depthLayer: number; // -1 for behind logo, 0 for through logo, 1 for in front of logo
}

export function DriftingCloudsThroughLogo({ scrollProgress }: DriftingCloudsThroughLogoProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.ShaderMaterial[]>([]);

  // 18 Cloud quads strategically positioned across Z depths to pass behind, THROUGH, and in front of the 3D logo
  // The 3D logo sits at z = 0, with a bounding box of roughly ~3.6 wide, ~2.0 high, ~0.6 deep.
  const cloudData: CloudParticleData[] = useMemo(() => [
    // LAYER 1: BEHIND THE LOGO (z: -1.8 to -0.6)
    { initialPos: [-5.2, 1.2, -1.5], scale: [4.2, 3.2], speed: 0.28, rotationSpeed: 0.04, phase: 0.2, depthLayer: -1 },
    { initialPos: [-2.0, -1.0, -1.2], scale: [3.8, 2.8], speed: 0.32, rotationSpeed: -0.05, phase: 1.5, depthLayer: -1 },
    { initialPos: [1.8, 1.4, -1.4], scale: [4.5, 3.4], speed: 0.26, rotationSpeed: 0.03, phase: 2.8, depthLayer: -1 },
    { initialPos: [4.8, -0.8, -1.0], scale: [3.6, 2.6], speed: 0.34, rotationSpeed: -0.04, phase: 4.1, depthLayer: -1 },
    { initialPos: [0.0, -1.8, -0.8], scale: [5.0, 3.5], speed: 0.24, rotationSpeed: 0.02, phase: 5.3, depthLayer: -1 },

    // LAYER 2: RIGHT THROUGH THE 3D LOGO (z: -0.25 to +0.25)
    // These literally intersect the red mark, chevron, and center void of the 3D logo!
    { initialPos: [-4.0, 0.4, 0.0], scale: [3.4, 2.4], speed: 0.35, rotationSpeed: -0.06, phase: 0.8, depthLayer: 0 },
    { initialPos: [-1.2, 0.8, -0.1], scale: [2.8, 2.0], speed: 0.38, rotationSpeed: 0.05, phase: 2.1, depthLayer: 0 },
    { initialPos: [0.3, -0.2, 0.1], scale: [3.2, 2.3], speed: 0.40, rotationSpeed: -0.04, phase: 3.4, depthLayer: 0 },
    { initialPos: [2.2, 0.5, -0.15], scale: [3.0, 2.2], speed: 0.36, rotationSpeed: 0.06, phase: 4.7, depthLayer: 0 },
    { initialPos: [3.8, -0.6, 0.15], scale: [3.5, 2.5], speed: 0.32, rotationSpeed: -0.05, phase: 5.9, depthLayer: 0 },

    // LAYER 3: IN FRONT OF THE 3D LOGO (z: +0.6 to +1.8)
    // These drift right across the front surface, casting soft translucent mist over the logo
    { initialPos: [-5.5, -0.5, 0.8], scale: [3.8, 2.8], speed: 0.42, rotationSpeed: 0.05, phase: 1.1, depthLayer: 1 },
    { initialPos: [-2.5, 1.1, 1.2], scale: [3.2, 2.4], speed: 0.45, rotationSpeed: -0.07, phase: 2.5, depthLayer: 1 },
    { initialPos: [-0.4, -0.9, 1.4], scale: [3.6, 2.7], speed: 0.44, rotationSpeed: 0.04, phase: 3.9, depthLayer: 1 },
    { initialPos: [1.5, 0.7, 0.9], scale: [3.4, 2.5], speed: 0.48, rotationSpeed: -0.05, phase: 5.1, depthLayer: 1 },
    { initialPos: [4.2, 0.2, 1.5], scale: [4.0, 3.0], speed: 0.41, rotationSpeed: 0.06, phase: 0.4, depthLayer: 1 },
    { initialPos: [-1.0, 0.0, 0.7], scale: [2.6, 1.9], speed: 0.46, rotationSpeed: -0.04, phase: 1.8, depthLayer: 1 },
    { initialPos: [0.8, -0.4, 1.1], scale: [2.9, 2.1], speed: 0.43, rotationSpeed: 0.05, phase: 3.2, depthLayer: 1 },
    { initialPos: [3.0, -1.2, 1.3], scale: [3.8, 2.8], speed: 0.39, rotationSpeed: -0.06, phase: 4.6, depthLayer: 1 },
  ], []);

  // Shared Procedural Volumetric Cloud Shaders
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uHeroFade;
    uniform float uPhase;
    uniform float uBaseOpacity;

    // Original Daytime Vanta Clouds palette
    uniform vec3 uSunColor;       // Warm golden sunlight rays (#ffa933)
    uniform vec3 uCloudColor;     // Silvery white cloud body (#f0f6ff)
    uniform vec3 uShadowColor;    // Soft atmospheric shadow (#adc1de)
    uniform vec3 uSkyAmbient;     // Daytime blue sky tint (#68b8d7)

    varying vec2 vUv;
    varying vec3 vWorldPosition;

    // Procedural Perlin / FBM noise for realistic cloud billows
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      mat2 rot = mat2(0.87758, 0.47942, -0.47942, 0.87758);
      for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = rot * p * 2.15 + vec2(100.0);
        a *= 0.48;
      }
      return v;
    }

    void main() {
      // Radial Gaussian cloud puff shape
      vec2 p = vUv * 2.0 - 1.0;
      float dist = length(p);
      if (dist > 1.0) discard;

      // Soft circular puff falloff
      float radialMask = smoothstep(1.0, 0.12, dist);

      // Billowing FBM fractal noise
      vec2 noiseCoord = vUv * 3.2 + vec2(uTime * 0.04 + uPhase, uTime * 0.02);
      float n = fbm(noiseCoord);

      // Cloud density modulation
      float density = clamp(radialMask * (n * 1.55 - 0.15), 0.0, 1.0);
      if (density < 0.02) discard;

      // Lighting matching Daytime Vanta Clouds:
      // Sunlight direction from top-left front
      float sunScatter = clamp(0.5 + 0.5 * (p.x * -0.6 - p.y * 0.7), 0.0, 1.0);
      
      // Color grading for Daytime clouds
      vec3 col = mix(uShadowColor, uCloudColor, sunScatter * 0.7 + 0.3);
      col = mix(col, uSunColor, pow(sunScatter, 3.2) * 0.45);
      col = mix(col, uSkyAmbient, (1.0 - density) * 0.25);

      // Alpha with smooth hero fade
      float alpha = density * uBaseOpacity * uHeroFade * 0.72;

      gl_FragColor = vec4(col, alpha);
    }
  `;

  // Pre-create uniforms for each cloud quad with Daytime palette
  const uniformsList = useMemo(() => {
    return cloudData.map((d) => ({
      uTime: { value: 0 },
      uHeroFade: { value: 1.0 },
      uPhase: { value: d.phase },
      uBaseOpacity: { value: d.depthLayer === 1 ? 0.65 : d.depthLayer === 0 ? 0.55 : 0.75 },

      uSunColor: { value: new THREE.Color("#ffa933") },
      uCloudColor: { value: new THREE.Color("#f0f6ff") },
      uShadowColor: { value: new THREE.Color("#adc1de") },
      uSkyAmbient: { value: new THREE.Color("#68b8d7") },
    }));
  }, [cloudData]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const p = Math.min(Math.max(scrollProgress, 0), 1);
    const heroFade = THREE.MathUtils.clamp(1.0 - (p / 0.18), 0.0, 1.0);

    // Update cloud quads positions and wrap around
    if (groupRef.current) {
      const children = groupRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const mesh = children[i] as THREE.Mesh;
        const data = cloudData[i];
        if (!mesh || !data) continue;

        // Continuous horizontal drift from left to right through the logo
        mesh.position.x += data.speed * delta;
        // Subtle vertical breathing undulation
        mesh.position.y = data.initialPos[1] + Math.sin(time * 0.4 + data.phase) * 0.25;
        // Subtle rotation of the cloud puff
        mesh.rotation.z += data.rotationSpeed * delta;

        // Wrap around seamlessly when drifting past the right bound
        if (mesh.position.x > 7.5) {
          mesh.position.x = -7.5;
        }

        // Update uniforms
        const mat = materialsRef.current[i];
        if (mat) {
          mat.uniforms.uTime.value = time;
          mat.uniforms.uHeroFade.value = THREE.MathUtils.damp(
            mat.uniforms.uHeroFade.value,
            heroFade,
            4.0,
            delta
          );
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      {cloudData.map((d, i) => (
        <mesh
          key={i}
          position={d.initialPos}
          rotation={[0, 0, d.phase]}
        >
          <planeGeometry args={[d.scale[0], d.scale[1]]} />
          <shaderMaterial
            ref={(el) => {
              if (el) materialsRef.current[i] = el;
            }}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniformsList[i]}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default DriftingCloudsThroughLogo;
