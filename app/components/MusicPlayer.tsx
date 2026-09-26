"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

interface MusicPlayerProps {
  src: string;
  title?: string;
  audioRef: RefObject<HTMLAudioElement | null>;
}

export default function MusicPlayer({
  src,
  title = "Our wedding song",
  audioRef,
}: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.35;

    return () => {
      audio.pause();
    };
  }, [audioRef]);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch (error) {
      console.error("Audio gagal diputar:", error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    const nextMuted = !muted;

    audio.muted = nextMuted;
    setMuted(nextMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <div
        className="fixed bottom-6 right-6 z-50"
        aria-label={title}
      >
        <div className="flex items-center gap-1 rounded-full border border-[#d8d0c4] bg-[#f7f4ee]/95 p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-md">
          {/* Play / Pause */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause music" : "Play music"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#403b34] transition-all duration-300 hover:bg-[#292722] hover:text-[#f7f4ee]"
          >
            {playing ? (
              <Pause
                size={13}
                strokeWidth={1.5}
              />
            ) : (
              <Play
                size={13}
                strokeWidth={1.5}
                className="ml-0.5"
              />
            )}
          </button>

          <span className="h-4 w-px bg-[#d8d0c4]" />

          {/* Mute / Unmute */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute music" : "Mute music"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#403b34] transition-all duration-300 hover:bg-[#292722] hover:text-[#f7f4ee]"
          >
            {muted ? (
              <VolumeX
                size={14}
                strokeWidth={1.5}
              />
            ) : (
              <Volume2
                size={14}
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}