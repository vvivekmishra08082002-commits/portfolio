"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function Stars(props: any) {
  const ref = useRef<any>(null);
  const sphere = useMemo(() => random.inSphere(new Float32Array(5001), { radius: 1.5 }), []);

  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#88ccff");

  useEffect(() => {
    // Vibrant indigo for light mode, light blue for dark mode
    setColor(resolvedTheme === 'light' ? "#4f46e5" : "#88ccff");
  }, [resolvedTheme]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={color}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-100] w-full h-full pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  );
}
