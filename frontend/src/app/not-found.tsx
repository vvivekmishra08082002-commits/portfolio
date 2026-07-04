"use client";

import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedTorus />
          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center p-8 glass rounded-3xl border border-border/50 max-w-2xl mx-auto shadow-2xl backdrop-blur-md">
        <h1 className="text-7xl md:text-9xl font-black text-primary mb-4 drop-shadow-lg">404</h1>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">Coming Soon</h2>
        <p className="text-foreground/80 font-medium text-lg mb-8 max-w-md">
          The page or certificate you are looking for doesn't exist yet, or the link was incorrect. 
        </p>
        <Link 
          href="/" 
          className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 uppercase tracking-widest text-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
