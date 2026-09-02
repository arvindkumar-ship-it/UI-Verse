import { useState, useRef } from 'react';

export function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>
      <button className="music-toggle" onClick={toggle} aria-label="Toggle music">
        <img src={playing ? '/images/music-icon-playing.png' : '/images/music-icon-muted.png'} alt="" />
      </button>
    </>
  );
}