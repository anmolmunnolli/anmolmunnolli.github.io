// src/components/TechAnimation.js
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function TechAnimation() {
  const meshRef = React.useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00ff00" />
    </mesh>
  );
}

export default TechAnimation;
