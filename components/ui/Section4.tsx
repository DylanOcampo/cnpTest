
"use client";
import { useState, Suspense, useRef, useCallback } from 'react';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

const basePath = process.env.NODE_ENV === 'production' ? '/cnpTest' : '';
const SHIBA_MODEL_URL = `${basePath}/shiba.glb`;

interface Option {
  name: string;
  image: string;
}

const options: Option[] = [
  {
    name: 'Opcion 1',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Opcion 2',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Opcion 3',
    image:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Opcion 4',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Opcion 5',
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Opcion 6',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Opcion 7',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
  },
];

const STEP = (2 * Math.PI) / options.length;

function ShibaModel() {
  const { scene } = useGLTF(SHIBA_MODEL_URL);
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />;
}

function Section4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevAngle = useRef(0);
  const activeOption = options[activeIndex];

  const handleOrbitChange = useCallback((e: any) => {
    const azimuth = (e.target as OrbitControlsImpl).getAzimuthalAngle();
    const newIndex =
      ((Math.round(azimuth / STEP) % options.length) + options.length) % options.length;
    if (newIndex !== prevAngle.current) {
      prevAngle.current = newIndex;
      setActiveIndex(newIndex);
    }
  }, []);

  return (
    <section
      className="section4"
      style={{
        '--s4-bg-image': `url(${activeOption.image})`,
      } as React.CSSProperties}
    >
      <div className="s4-bg" />

      <h1 className="s4-title">{activeOption.name}</h1>

      <div className="s4-canvas-wrapper">
        <Canvas camera={{ position: [0, 4, 5], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <ShibaModel  />
            <Environment preset="sunset" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            onChange={handleOrbitChange}
          />
        </Canvas>
      </div>

      <div className="s4-options">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`s4-option-btn${i === activeIndex ? ' s4-option-active' : ''}`}
            onClick={() => setActiveIndex(i)}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Section4;
