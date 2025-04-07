import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SpotlightCard from "../components/SpotlightCard"
import VideoCarousel from "../components/VideoCarousel"
import useScrollTriggerRefresh from "../hooks/useScrollTriggerRefresh"

gsap.registerPlugin(ScrollTrigger)

interface CardData {
    image: string
    title: string
    description: string
}

interface BoxStackZoomProps {
    title: string;
    cardData: CardData[];
    videoSources: string[];
}


export default function BoxStackZoom({title, cardData, videoSources}:BoxStackZoomProps) {
    useScrollTriggerRefresh()
    const sectionRef = useRef(null)
    const boxRefs = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        const vh = window.innerHeight

        const ctx = gsap.context(() => {
            boxRefs.current.forEach((box, i) => {
                if (!box) return

                if (i === 0) {
                    // Box 1 放大标题
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top",
                            end: "top+=600 top",
                            scrub: true,
                        },
                    })

                    tl.fromTo(
                        box,
                        { scale: 1, opacity: 1 },
                        {
                            scale: 3,
                            opacity: 1,
                            transformOrigin: "center",
                            ease: "power2.inOut",
                        }
                    )

                    tl.to(
                        box,
                        {
                            opacity: 0,
                            scale: 1,
                            ease: "power1.out",
                        },
                        0.3
                    )
                } else {
                    // 每张卡片进入节奏：更宽松、更慢
                    const gap = 600
                    const index = i - 1 // 因为 box[0] 是标题

                    gsap.fromTo(
                        box,
                        { y: vh / 2, scale: 0.95, opacity: 0 },
                        {
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: `${600 + index * 1.2 * vh}px top`,
                                end: `${600 + (index + 1) * 1.2 * vh}px top`,
                                scrub: true,
                            },
                        }
                    )
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative h-[600vh] bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                <div className="relative w-full h-full">
                    {/* 背景视频 */}
                    <VideoCarousel videoSources={videoSources} />

                    {/* Box 1: Title */}
                    <div
                        ref={(el) => el && (boxRefs.current[0] = el)}
                        className="absolute flex items-center justify-center text-white font-black h-screen w-full text-[10vw] mix-blend-multiply bg-black overflow-hidden"
                        style={{
                            zIndex: 1,
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        {title}
                    </div>

                    {/* Box 2~4 */}
                    {cardData.map((card, i) => (
                        <div
                            key={i}
                            ref={(el) => el && (boxRefs.current[i + 1] = el)} // i+1 因为 box[0] 是标题
                            className="absolute flex items-center justify-center text-white font-black w-[90vw] max-w-[90vw] md:max-w-[980px] h-[50vh] md:h-[60vh]"
                            style={{
                                //  backgroundColor: `hsl(${(i + 1) * 60}, 70%, 50%)`,
                                zIndex: i + 2,
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <SpotlightCard className="w-full h-full p-4">
                                    <div className="flex flex-col md:flex-row h-full w-full items-center justify-center gap-6">
                                        {/* 左图放大占位 */}
                                        <div className="w-full md:w-1/3 h-[250px] md:h-full">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                        </div>

                                        {/* 右文 */}
                                        <div className="w-full md:w-2/3 text-center md:text-left flex flex-col justify-center px-2 md:px-6">
                                            <h3 className="text-2xl font-bold">{card.title}</h3>
                                            <p className="mt-2 text-base leading-relaxed">{card.description}</p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

