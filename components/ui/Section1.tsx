"use client";
import React, { useRef, useState } from 'react';

const cubeOptions = [
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

const faceTransforms = [
  'rotateY(0deg) translateZ(130px)',
  'rotateY(90deg) translateZ(130px)',
  'rotateY(180deg) translateZ(130px)',
  'rotateY(-90deg) translateZ(130px)',
];

const getWrappedIndex = (value: number, length: number): number =>
  ((value % length) + length) % length;

function Section1() {
  const [rotationY, setRotationY] = useState(-20);
  const [isDragging, setIsDragging] = useState(false);
  const dragData = useRef({ active: false, startX: 0, startRotation: 0 });
  const quarterTurns = Math.round(rotationY / 90);
  const frontOptionIndex = getWrappedIndex(-quarterTurns, cubeOptions.length);
  const frontFaceSlot = getWrappedIndex(-quarterTurns, faceTransforms.length);
  const activeOption = cubeOptions[frontOptionIndex];

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    dragData.current = {
      active: true,
      startX: event.clientX,
      startRotation: rotationY,
    };

    setIsDragging(true);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragData.current.active) {
      return;
    }

    const deltaX = event.clientX - dragData.current.startX;

    setRotationY(dragData.current.startRotation + deltaX * 0.45);
    
  };

  const endDrag = () => {
    setIsDragging(false);
    dragData.current.active = false;
  };
  
  return (
        <main
      className="demo-page"
      style={{
        '--active-bg-image': `url(${activeOption.image})`,
      } as React.CSSProperties}
    >
      <h1 className="demo-title">Demo Cubo 3D</h1>
      <p className="demo-subtitle">{activeOption.name}</p>

      <section className="cube-layout">
        <div
          className="scene"
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            className={`cube ${isDragging ? 'cube-dragging' : ''}`}
            style={{
              transform: `translateZ(-130px) rotateY(${rotationY}deg)`,
            }}
            aria-label="Cubo 3D con imagenes"
          >
            {faceTransforms.map((transform, index) => {
              const slotDistanceFromFront = getWrappedIndex(
                index - frontFaceSlot,
                faceTransforms.length,
              );
              const option = cubeOptions[
                getWrappedIndex(frontOptionIndex + slotDistanceFromFront, cubeOptions.length)
              ];

              return (
              <div
                key={`${transform}-${option.name}`}
                className="cube-face"
                style={{
                  transform,
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.38)), url(${option.image})`,
                }}
              />
              );
            })}
          </div>
        </div>

      </section>


    </main>
  );
}

export default Section1;
