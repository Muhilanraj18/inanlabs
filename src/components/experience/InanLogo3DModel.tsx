"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface InanLogo3DModelProps {
  scrollProgress: number;
  isDark: boolean;
  pointer: { x: number; y: number };
}

export function InanLogo3DModel({
  scrollProgress,
  isDark,
  pointer,
}: InanLogo3DModelProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const redMeshRef = useRef<THREE.Mesh>(null);
  const blackMeshRef = useRef<THREE.Mesh>(null);

  // User interactive drag & inertia rotation tracking
  const userRotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      // Do not capture if user clicked on button, link, or input
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select"))
      ) {
        return;
      }

      // Capture drag when near hero
      if (window.scrollY < window.innerHeight * 0.95) {
        isDragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current = { x: e.clientX, y: e.clientY };

      const sensitivity = 0.007;
      userRotation.current.y += dx * sensitivity;
      userRotation.current.x += dy * sensitivity;

      velocity.current.x = dx * sensitivity;
      velocity.current.y = dy * sensitivity;
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  // 1. Precise 2D Logo Shapes derived from mathematical vectorization of the official mark
  const { redGeometry, blackGeometry, redEdges, blackEdges } = useMemo(() => {
    // Red parallelogram mark
    const redShape = new THREE.Shape();
    redShape.moveTo(-3.1529, 1.6588);
    redShape.lineTo(-2.6235, 1.0235);
    redShape.lineTo(-1.2706, 1.0235);
    redShape.lineTo(-1.7529, 1.6588);
    redShape.closePath();

    // Black geometric body (chevron + spine + right leg)
    const blackShape = new THREE.Shape();
    blackShape.moveTo(-2.4824, 0.8118);
    blackShape.lineTo(-0.1529, -1.9294);
    blackShape.lineTo(-0.1412, 0.3059);
    blackShape.lineTo(1.7412, -1.9176);
    blackShape.lineTo(3.1529, -1.9176);
    blackShape.lineTo(-0.2118, 1.9294);
    blackShape.lineTo(-0.2235, -0.2941);
    blackShape.lineTo(-1.1529, 0.8118);
    blackShape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 2,
      depth: 0.58,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelOffset: 0,
      bevelSegments: 5,
    };

    const redGeom = new THREE.ExtrudeGeometry(redShape, extrudeSettings);
    // Center along Z axis so front and back are symmetrical around z=0
    redGeom.translate(0, 0, -0.29);
    redGeom.computeVertexNormals();

    const blackGeom = new THREE.ExtrudeGeometry(blackShape, extrudeSettings);
    blackGeom.translate(0, 0, -0.29);
    blackGeom.computeVertexNormals();

    const rEdges = new THREE.EdgesGeometry(redGeom, 24);
    const bEdges = new THREE.EdgesGeometry(blackGeom, 24);

    return {
      redGeometry: redGeom,
      blackGeometry: blackGeom,
      redEdges: rEdges,
      blackEdges: bEdges,
    };
  }, []);

  // 2. Procedural PBR Materials — no textures, pure GPU 60fps
  const materials = useMemo(() => {
    // Pure obsidian titanium black — procedural PBR, zero texture cost
    const blackMat = new THREE.MeshPhysicalMaterial({
      color: "#0c0d12",
      roughness: 0.18,
      metalness: 0.92,
      clearcoat: 0.6,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
    });

    const redMat = new THREE.MeshPhysicalMaterial({
      color: "#ff0022",
      emissive: "#ff0022",
      emissiveIntensity: isDark ? 0.45 : 0.25,
      roughness: 0.14,
      metalness: 0.35,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      reflectivity: 0.98,
    });

    // Chamfer highlights: subtle edge outlines
    const wireframeMat = new THREE.LineBasicMaterial({
      color: isDark ? "#ffffff" : "#444654",
      transparent: true,
      opacity: isDark ? 0.3 : 0.2,
    });

    const redWireframeMat = new THREE.LineBasicMaterial({
      color: "#ff2244",
      transparent: true,
      opacity: 0.6,
    });
    return {
      black: blackMat,
      red: redMat,
      wireframe: wireframeMat,
      redWireframe: redWireframeMat,
    };
  }, [isDark]);

  // Frame Loop - Cinematic smooth presence in hero and anchored background stage
  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    const time = state.clock.elapsedTime;
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    // Center lock - absolutely no left-to-right dancing
    const targetX = 0;

    // Organic hover breathing when in hero
    const hoverY = Math.sin(time * 0.9) * 0.03;
    const targetY = THREE.MathUtils.lerp(0.22, 0.0, p) + hoverY;

    // Depth: recessed subtly in the background
    const targetZ = THREE.MathUtils.lerp(-0.8, -1.8, p);

    // Scale: slightly bigger logo, dignified presence in hero background
    const baseScale = THREE.MathUtils.lerp(0.50, 0.40, p);
    const targetScale = isHovered && p < 0.15 ? baseScale * 1.08 : baseScale;

    // Apply interactive drag velocity and continuous rotation when idle
    if (!isDragging.current) {
      userRotation.current.y += velocity.current.x;
      userRotation.current.x += velocity.current.y;

      // Inertia damping
      velocity.current.x *= 0.93;
      velocity.current.y *= 0.93;

      // Gentle continuous idle turn when not interacting
      userRotation.current.y += 0.25 * delta;

      // Pitch slowly eases back to neutral level
      userRotation.current.x = THREE.MathUtils.lerp(userRotation.current.x, 0, 0.025);
    }

    // Clamp pitch between -0.95 and 0.95 rad (~-55 to +55 deg)
    userRotation.current.x = Math.max(-0.95, Math.min(0.95, userRotation.current.x));

    // Responsive dynamic pointer tilt
    const pointerTiltX = (pointer.y || 0) * 0.22;
    const pointerTiltY = (pointer.x || 0) * 0.28;

    // Combined interactive rotation
    const targetRotX = userRotation.current.x + 0.08 + pointerTiltX;
    const targetRotY = userRotation.current.y + p * Math.PI * 0.6 + pointerTiltY;

    // Smooth damp factor (consistent, silky-smooth motion with zero sudden pops)
    const dampSpeed = isDragging.current ? 12.0 : 3.5;

    rootGroupRef.current.position.x = THREE.MathUtils.damp(
      rootGroupRef.current.position.x,
      targetX,
      dampSpeed,
      delta
    );
    rootGroupRef.current.position.y = THREE.MathUtils.damp(
      rootGroupRef.current.position.y,
      targetY,
      dampSpeed,
      delta
    );
    rootGroupRef.current.position.z = THREE.MathUtils.damp(
      rootGroupRef.current.position.z,
      targetZ,
      dampSpeed,
      delta
    );

    rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
      rootGroupRef.current.rotation.x,
      targetRotX,
      dampSpeed,
      delta
    );
    rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
      rootGroupRef.current.rotation.y,
      targetRotY,
      dampSpeed,
      delta
    );
    rootGroupRef.current.rotation.z = 0;

    const curScale = rootGroupRef.current.scale.x;
    const newScale = THREE.MathUtils.damp(curScale, targetScale, dampSpeed, delta);
    rootGroupRef.current.scale.set(newScale, newScale, newScale);
  });

  return (
    <group
      ref={rootGroupRef}
      position={[0, 0, 0]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* ── 1. RED ACCENT PARALLELOGRAM ── */}
      <mesh
        ref={redMeshRef}
        geometry={redGeometry}
        material={materials.red}
      >
        <lineSegments geometry={redEdges} material={materials.redWireframe} />
      </mesh>

      {/* ── 2. MAIN BLACK TITANIUM GEOMETRIC BODY ── */}
      <mesh
        ref={blackMeshRef}
        geometry={blackGeometry}
        material={materials.black}
      >
        <lineSegments geometry={blackEdges} material={materials.wireframe} />
      </mesh>
    </group>
  );
}
