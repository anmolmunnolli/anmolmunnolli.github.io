import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import Globe from './Globe'; // Import the Globe component

const GlobeScene = ({ setSelectedNode }) => {
    const { camera, gl } = useThree();
  
    useEffect(() => {
      camera.position.z = 6; // Increase this if needed to fit the larger globe
    }, [camera]);
  
    return (
      <>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Globe setSelectedNode={setSelectedNode} />
      </>
    );
  };
export default GlobeScene;
