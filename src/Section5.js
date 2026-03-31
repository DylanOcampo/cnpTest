import { useRef, useState, useEffect, useCallback } from 'react';
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

const getWrappedIndex = (value, length) => ((value % length) + length) % length;
const DEGREES_PER_OPTION = 90;

function Section5() {
  const [rotationY, setRotationY] = useState(-20);
  const [isLocked, setIsLocked] = useState(false);
  const sectionRef = useRef(null);
  const accumulatedDelta = useRef(0);
  const lockedRotation = useRef(-20);

  const quarterTurns = Math.round(rotationY / 90);
  const frontOptionIndex = getWrappedIndex(-quarterTurns, cubeOptions.length);
  const frontFaceSlot = getWrappedIndex(-quarterTurns, faceTransforms.length);
  const activeOption = cubeOptions[frontOptionIndex];

  const handleWheel = useCallback((e) => {
    if (!isLocked) return;

    const currentIndex = getWrappedIndex(
      -Math.round(lockedRotation.current / 90),
      cubeOptions.length,
    );

    // At first option scrolling up → release
    if (currentIndex === 0 && e.deltaY < 0) {
      setIsLocked(false);
      return;
    }
    // At last option scrolling down → release
    if (currentIndex === cubeOptions.length - 1 && e.deltaY > 0) {
      setIsLocked(false);
      return;
    }

    e.preventDefault();

    accumulatedDelta.current += e.deltaY;
    const threshold = 80;

    if (Math.abs(accumulatedDelta.current) >= threshold) {
      const direction = accumulatedDelta.current > 0 ? -1 : 1;
      lockedRotation.current += direction * DEGREES_PER_OPTION;
      setRotationY(lockedRotation.current);
      accumulatedDelta.current = 0;
    }
  }, [isLocked]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLocked(true);
          accumulatedDelta.current = 0;
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLocked) return;

    const handler = (e) => handleWheel(e);
    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [isLocked, handleWheel]);

  return (
    <main
      ref={sectionRef}
      className="demo-page"
      style={{
        '--active-bg-image': `url(${activeOption.image})`,
      }}
    >
      <h1 className="demo-title">Demo Cubo 3D</h1>
      <p className="demo-subtitle">{activeOption.name}</p>

      <section className="cube-layout">
        <div className="scene">
          <div
            className="cube"
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

export default Section5;
