// src/components/BarChart.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const BarChart = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6e1d3);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Bars
    const barGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    const barMaterial = new THREE.MeshBasicMaterial({ color: 0x6d4c41 });

    const bars = [];
    for (let i = 0; i < 5; i++) {
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      bar.position.x = i - 2;
      bars.push(bar);
      scene.add(bar);
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      bars.forEach((bar, index) => {
        bar.scale.y = Math.abs(Math.sin(Date.now() * 0.001 + index));
      });
      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100px', height: '100px' }} />;
};

export default BarChart;
