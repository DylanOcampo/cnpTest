import { useMemo, useRef, useState } from 'react';

const VIDEO_ID = 'dQw4w9WgXcQ';

function Section3() {
  const sectionRef = useRef(null);
  const iframeRef = useRef(null);
  const [isInside, setIsInside] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const cursorLabel = isPlaying ? 'Dale click para pausar' : 'Dale click para play';

  const embedUrl = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: '0',
      controls: '0',
      disablekb: '1',
      enablejsapi: '1',
      iv_load_policy: '3',
      loop: '1',
      modestbranding: '1',
      playsinline: '1',
      rel: '0',
      playlist: VIDEO_ID,
      origin: window.location.origin,
    });

    return `https://www.youtube.com/embed/${VIDEO_ID}?${params.toString()}`;
  }, []);

  const sendCommand = (command) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) {
      return;
    }

    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: command,
        args: [],
      }),
      '*',
    );
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      sendCommand('pauseVideo');
      setIsPlaying(false);
      return;
    }

    sendCommand('playVideo');
    setIsPlaying(true);
  };

  const handlePointerMove = (event) => {
    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }

    setCursorPos({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="video-section"
      aria-label="Seccion interactiva con video de fondo"
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseMove={handlePointerMove}
      onClick={handleTogglePlay}
    >
      <iframe
        ref={iframeRef}
        title="Video de fondo"
        src={embedUrl}
        className="video-section-frame"
        allow="autoplay; encrypted-media; picture-in-picture"
      />

      <div className="video-section-overlay" />

      <div className="video-section-copy">

      </div>

      {isInside && (
        <div
          className="video-section-cursor"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        >
          {cursorLabel}
        </div>
      )}

      <button
        type="button"
        className="video-section-mobile-hint"
        onClick={(event) => {
          event.stopPropagation();
          handleTogglePlay();
        }}
      >
        {cursorLabel}
      </button>
    </section>
  );
}

export default Section3;