import React, { useEffect, useRef, useState } from "react"

const videoSources = Array.from({ length: 9 }, (_, i) =>
  `https://wavepartyk.com/assets/files/videos/background-v${i}.mp4`
)

export default function VideoCarousel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentIndex, setCurrentIndex] = useState(2) // 从 v2 开始
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
  
    let isPlaying = false;
  
    videoEl.src = videoSources[currentIndex];
    videoEl.load();
  
    const onCanPlay = () => {
      if (!isPlaying) {
        videoEl.play().catch((err) => {
          console.warn("Autoplay blocked:", err);
        });
        isPlaying = true;
      }
    };
  
    const handleEnded = () => {
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % videoSources.length;
        setCurrentIndex(nextIndex);
      }, 200); // 稍微等一下避免冲突
    };
  
    videoEl.addEventListener("canplaythrough", onCanPlay);
    videoEl.addEventListener("ended", handleEnded);
  
    return () => {
      videoEl.removeEventListener("canplaythrough", onCanPlay);
      videoEl.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex]);
  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
      autoPlay
      muted
      playsInline
      style={{ objectPosition: "center 60%", clipPath: "inset(20% 0% 20% 0%)" }}
    />
  )
}
