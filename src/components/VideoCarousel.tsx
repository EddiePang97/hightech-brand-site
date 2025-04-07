import React, { useEffect, useRef, useState } from "react"

type VideoSourceType = string | string[]

export default function VideoCarousel({videoSources}: {videoSources: VideoSourceType}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return
    
    let isPlaying = false
    const sources = Array.isArray(videoSources) ? videoSources : [videoSources]
    
    videoEl.src = sources[currentIndex]
    videoEl.load()
    
    const onCanPlay = () => {
      if (!isPlaying) {
        videoEl.play().catch((err) => {
          console.warn("Autoplay blocked:", err)
        })
        isPlaying = true
      }
    }
    
    const handleEnded = () => {
      if (sources.length === 1) {
        // 单个视频时直接重播
        videoEl.play()
      } else {
        // 多个视频时切换到下一个
        setTimeout(() => {
          const nextIndex = (currentIndex + 1) % sources.length
          setCurrentIndex(nextIndex)
        }, 200)
      }
    }
    
    videoEl.addEventListener("canplaythrough", onCanPlay)
    videoEl.addEventListener("ended", handleEnded)
    
    return () => {
      videoEl.removeEventListener("canplaythrough", onCanPlay)
      videoEl.removeEventListener("ended", handleEnded)
    }
  }, [currentIndex, videoSources])

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
