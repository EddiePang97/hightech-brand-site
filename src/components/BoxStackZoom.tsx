import React, { useRef, useEffect, useState } from 'react'

interface BoxStackZoomProps {
    title: string;
    cardData: any[];
    video?: string | string[];
}

export default function BoxStackZoom({ title, cardData, video }: BoxStackZoomProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

    useEffect(() => {
        if (!video || !videoRef.current) return

        const videoElement = videoRef.current
        
        const handleVideoEnd = () => {
            if (Array.isArray(video)) {
                // 多个视频的情况
                setCurrentVideoIndex((prev) => {
                    const nextIndex = prev + 1
                    if (nextIndex >= video.length) {
                        // 播放完所有视频后重新开始
                        videoElement.src = video[0]
                        return 0
                    } else {
                        // 播放下一个视频
                        videoElement.src = video[nextIndex]
                        return nextIndex
                    }
                })
            } else {
                // 单个视频的情况，直接循环播放
                videoElement.play()
            }
        }

        videoElement.addEventListener('ended', handleVideoEnd)
        
        // 设置初始视频
        videoElement.src = Array.isArray(video) ? video[0] : video
        videoElement.play()

        return () => {
            videoElement.removeEventListener('ended', handleVideoEnd)
        }
    }, [video])

    return (
        <div className="relative w-full h-screen">
            {video && (
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    muted
                    playsInline
                />
            )}
            <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white">{title}</h2>
                {/* 其他内容 */}
            </div>
        </div>
    )
} 