
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ServerLocation {
  name: string;
  position: [number, number, number];
  count: number;
  latency: string;
  color: string;
}

interface InteractiveGlobeProps {
  onLocationSelect: (location: string) => void;
  selectedLocation?: string;
}

const serverLocations: ServerLocation[] = [
  { 
    name: 'US East', 
    position: [0.8, 0.4, 0.4], 
    count: 34, 
    latency: '12ms',
    color: '#3b82f6'
  },
  { 
    name: 'US West', 
    position: [0.2, 0.3, 0.9], 
    count: 29, 
    latency: '8ms',
    color: '#10b981'
  },
  { 
    name: 'Europe', 
    position: [-0.2, 0.6, 0.7], 
    count: 21, 
    latency: '45ms',
    color: '#f59e0b'
  },
  { 
    name: 'Asia Pacific', 
    position: [-0.8, 0.2, 0.5], 
    count: 18, 
    latency: '89ms',
    color: '#8b5cf6'
  }
];

const LocationMarker = ({ location, onSelect, isSelected }: { 
  location: ServerLocation; 
  onSelect: (name: string) => void;
  isSelected: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered || isSelected ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={location.position}>
      <mesh
        ref={meshRef}
        onClick={() => onSelect(location.name)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={location.color} 
          emissive={isSelected ? location.color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>
      
      {(hovered || isSelected) && (
        <group position={[0, 0.1, 0]}>
          <mesh>
            <planeGeometry args={[0.8, 0.4]} />
            <meshBasicMaterial 
              color="#000000" 
              transparent 
              opacity={0.8}
            />
          </mesh>
          <mesh position={[0, 0, 0.001]}>
            <planeGeometry args={[0.75, 0.35]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      )}
    </group>
  );
};

const Globe = ({ onLocationSelect, selectedLocation }: InteractiveGlobeProps) => {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color="#1e293b" 
          transparent 
          opacity={0.8}
          wireframe={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.01, 64, 64]} />
        <meshBasicMaterial 
          color="#334155" 
          transparent 
          opacity={0.1}
          wireframe
        />
      </mesh>

      {serverLocations.map((location) => (
        <LocationMarker
          key={location.name}
          location={location}
          onSelect={onLocationSelect}
          isSelected={selectedLocation === location.name}
        />
      ))}

      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        autoRotate={false}
      />
    </>
  );
};

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ onLocationSelect, selectedLocation }) => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <Globe onLocationSelect={onLocationSelect} selectedLocation={selectedLocation} />
      </Canvas>
    </div>
  );
};

export default InteractiveGlobe;
