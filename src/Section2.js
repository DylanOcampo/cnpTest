import { useEffect, useRef } from 'react';

const scrollTexts = [
  'Cada paso cuenta: lo que hoy parece pequeno, manana sera estructura.',
  'El foco no es hacerlo perfecto, es mantener el ritmo aunque cambie la ruta.',
  'Cuando avanzas con intencion, incluso la pausa se convierte en progreso.',
  'La claridad llega despues del movimiento, no antes de empezar.',
  'Todo gran cambio comienza como una idea borrosa y termina como direccion.',
  'Sigue desplazandote: el siguiente tramo puede ser el que lo conecte todo.',
];

function Section2() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('scroll-text-visible', entry.isIntersecting);
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    itemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="scroll-reveal-section" aria-label="Textos con efecto al hacer scroll">
      <header className="scroll-reveal-header">
        <p>Desplazate hacia abajo</p>
        <h2>Textos que se enfocan al entrar en pantalla</h2>
      </header>

      <div className="scroll-text-track">
        {scrollTexts.map((text, index) => (
          <article
            key={text}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="scroll-text-card"
          >
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Section2;
