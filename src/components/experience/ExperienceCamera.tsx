"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ExperienceCameraProps {
  scrollProgress: number;
}

export function ExperienceCamera({ scrollProgress }: ExperienceCameraProps) {
  const { camera } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    // Keyframes for calm, distant background camera trajectory
    const targetPos = new THREE.Vector3(0, 0, 7.5);
    const lookTarget = new THREE.Vector3(0, 0, 0);

    if (p < 0.25) {
      // 01 Hero: Frontal, calm, centered
      const t = p / 0.25;
      targetPos.set(0, 0, 7.5 + t * 0.4);
      lookTarget.set(0, 0, 0);
    } else if (p < 0.55) {
      // Mid sections: Gentle subtle parallax without zooming in
      const t = (p - 0.25) / 0.3;
      targetPos.set(
        THREE.MathUtils.lerp(0, 0.5, t),
        THREE.MathUtils.lerp(0, 0.2, t),
        THREE.MathUtils.lerp(7.9, 8.3, t)
      );
      lookTarget.set(0, 0, 0);
    } else if (p < 0.85) {
      // Lower sections: Subtle counter-drift
      const t = (p - 0.55) / 0.3;
      targetPos.set(
        THREE.MathUtils.lerp(0.5, -0.45, t),
        THREE.MathUtils.lerp(0.2, 0.15, t),
        THREE.MathUtils.lerp(8.3, 8.5, t)
      );
      lookTarget.set(0, 0, 0);
    } else {
      // Final sections & Footer: Serene centered distance
      const t = (p - 0.85) / 0.15;
      targetPos.set(
        THREE.MathUtils.lerp(-0.45, 0, t),
        THREE.MathUtils.lerp(0.15, 0.0, t),
        THREE.MathUtils.lerp(8.5, 8.8, t)
      );
      lookTarget.set(0, 0, 0);
    }

    // Smoothly damp camera position — lower speed = less jitter/glitch
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x, 1.8, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y, 1.8, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z, 1.8, delta);

    // Smoothly damp camera lookAt
    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, lookTarget.x, 1.8, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, lookTarget.y, 1.8, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, lookTarget.z, 1.8, delta);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
