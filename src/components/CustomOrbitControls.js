import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls';

const CustomOrbitControls = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControlsImpl(camera, gl.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.rotateSpeed = 0.5;
    controls.enablePan = false; // Optional: disable panning if not needed

    // Restrict vertical rotation
    controls.maxPolarAngle = Math.PI / 2; // Limit to horizontal plane
    controls.minPolarAngle = Math.PI / 2; // Prevent below the horizon

    // Allow smooth horizontal rotation
    controls.maxAzimuthAngle = Infinity; // No limit to horizontal rotation
    controls.minAzimuthAngle = -Infinity; // No limit to horizontal rotation

    // Cleanup on unmount
    return () => controls.dispose();
  }, [camera, gl]);

  return null;
};

export default CustomOrbitControls;
