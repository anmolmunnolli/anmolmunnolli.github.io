import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';

const nodes = [
  { id: 1, name: 'Work Experience', info: 'Details about work experience', section: 'Work Experience', lat: 30, lon: -60 },
  { id: 2, name: 'Skills', info: 'Details about skills', section: 'Skills', lat: 30, lon: 60 },
  { id: 3, name: 'Certifications', info: 'Details about certifications', section: 'Certifications', lat: 30, lon: 180 },
  { id: 4, name: 'Projects', info: 'Details about projects', section: 'Projects', lat: 0, lon: 0 },
  { id: 5, name: 'Contact Info', info: 'Details about contact info', section: 'Contact Info', lat: -30, lon: 120 },
  { id: 6, name: 'Education', info: 'Details about education', section: 'Education', lat: -30, lon: -120 }
];

const globeRadius = 2;

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = Math.sin(phi) * Math.cos(theta);
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z).multiplyScalar(radius);
}

const Globe = ({ setSelectedNode }) => {
  const groupRef = useRef();
  const [highlightedNodeIndex, setHighlightedNodeIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startRotation, setStartRotation] = useState({ x: 0, y: 0 });
  
  useFrame(() => {
    if (isDragging) {
      const delta = { x: startRotation.y - groupRef.current.rotation.y, y: startRotation.x - groupRef.current.rotation.x };
      groupRef.current.rotation.y = startRotation.y + delta.x;
      groupRef.current.rotation.x = startRotation.x + delta.y;
    }
  });

  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  const handlePointerDown = (event) => {
    setIsDragging(true);
    setStartRotation({ x: groupRef.current.rotation.x, y: groupRef.current.rotation.y });
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      const movementX = event.movementX;
      const movementY = event.movementY;

      groupRef.current.rotation.y -= movementX * 0.01;
      groupRef.current.rotation.x -= movementY * 0.01;
      // Constrain rotation to horizontal axis
      groupRef.current.rotation.x = Math.max(Math.min(groupRef.current.rotation.x, Math.PI / 2), -Math.PI / 2);
    }
  };

  useFrame(({ camera }) => {
    const closestNode = findClosestNode(camera);
    if (closestNode && closestNode.index !== highlightedNodeIndex) {
      setHighlightedNodeIndex(closestNode.index);
      setSelectedNode(nodes[closestNode.index]);
    }
  });

  function findClosestNode(camera) {
    const vector = new THREE.Vector3();
    const cameraPosition = camera.position.clone();
    let minDistance = Infinity;
    let closestNode = null;

    groupRef.current.children.forEach((child, index) => {
      child.getWorldPosition(vector);
      const distance = cameraPosition.distanceTo(vector);
      if (distance < minDistance) {
        minDistance = distance;
        closestNode = { index, distance };
      }
    });

    return closestNode;
  }

  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const start = latLonToVector3(nodes[i].lat, nodes[i].lon, globeRadius);
      const end = latLonToVector3(nodes[j].lat, nodes[j].lon, globeRadius);
      edges.push({ start, end });
    }
  }

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => setIsDragging(false)}
    >
      {nodes.map(node => {
        const position = latLonToVector3(node.lat, node.lon, globeRadius);
        const nodeSize = node.id === 1 ? 0.15 : 0.08;
        const nodeColor = highlightedNodeIndex === node.id - 1 ? 0xff0000 : 0x000000;
        return (
          <mesh
            key={node.id}
            position={position}
            userData={{ ...node, originalColor: nodeColor }}
          >
            <sphereGeometry args={[nodeSize, 16, 16]} />
            <meshBasicMaterial color={nodeColor} />
          </mesh>
        );
      })}
      {edges.map((edge, index) => (
        <Line
          key={index}
          points={[edge.start, edge.end]}
          color={0x000000}
          lineWidth={1}
        />
      ))}
    </group>
  );
};

export default Globe;
