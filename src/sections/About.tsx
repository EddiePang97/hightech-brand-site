import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { TextPlugin } from "gsap/TextPlugin"

import React from "react"
import useScrollTriggerRefresh from "../hooks/useScrollTriggerRefresh"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin)

export default function About() {
    useScrollTriggerRefresh()

    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const imageRef = useRef(null)
    const textRef = useRef(null)
    const imageRightRef = useRef(null)
    const textLeftRef = useRef(null)
    const backgroundRef = useRef(null)

    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 背景粒子动画
            gsap.to(backgroundRef.current, {
                backgroundPosition: "50% 100%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            })

            // 标题动画增强
            gsap.fromTo(
                titleRef.current,
                { 
                    scale: 3.1, 
                    opacity: 0.5,
                    blur: 20,
                    textShadow: "0 0 20px rgba(0,0,0,0.5)"
                },
                {
                    scale: 1,
                    opacity: 1,
                    blur: 0,
                    textShadow: "0 0 0px rgba(0,0,0,0)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "top+=100 top",
                        scrub: true,
                    },
                }
            )

            if (isDesktop) {
                // 桌面端增强动画
                // 左侧图片动画
                gsap.fromTo(imageRef.current,
                    { 
                        x: -200, 
                        y: -150, 
                        opacity: 0,
                        rotationY: -45,
                        filter: "blur(10px)"
                    },
                    {
                        x: 50, 
                        y: 0, 
                        opacity: 1,
                        rotationY: 0,
                        filter: "blur(0px)",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top+=150 center",
                            end: "top+=400 center",
                            scrub: true,
                        },
                    })

                // 右侧文字动画
                gsap.fromTo(textRef.current,
                    { 
                        x: 0, 
                        y: 40, 
                        opacity: 0,
                        filter: "blur(10px)",
                        color: "rgba(0,0,0,0)"
                    },
                    {
                        x: 10, 
                        y: 0, 
                        opacity: 1,
                        filter: "blur(0px)",
                        color: "rgba(55,65,81,1)",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top+=250 center",
                            end: "top+=400 center",
                            scrub: true,
                        },
                    })

                // 左侧文字动画
                gsap.fromTo(textLeftRef.current,
                    { 
                        x: 0, 
                        opacity: 0,
                        filter: "blur(10px)",
                        color: "rgba(0,0,0,0)"
                    },
                    {
                        x: -18, 
                        opacity: 1,
                        filter: "blur(0px)",
                        color: "rgba(55,65,81,1)",
                        scrollTrigger: {
                            trigger: textLeftRef.current,
                            start: "top 80%",
                            end: "top 60%",
                            scrub: true,
                        },
                    })

                // 右侧图片动画
                gsap.fromTo(imageRightRef.current,
                    { 
                        x: 150, 
                        y: 100, 
                        opacity: 0,
                        rotationY: 45,
                        filter: "blur(10px)"
                    },
                    {
                        x: -60, 
                        y: -30, 
                        opacity: 1,
                        rotationY: 0,
                        filter: "blur(0px)",
                        scrollTrigger: {
                            trigger: imageRightRef.current,
                            start: "top 80%",
                            end: "top 60%",
                            scrub: true,
                        },
                    })
            } else {
                // 移动端动画增强
                const enhancedFadeUp = (target: any, delay = 0) => {
                    gsap.fromTo(
                        target,
                        { 
                            y: 40, 
                            opacity: 0,
                            filter: "blur(10px)"
                        },
                        {
                            y: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                            delay,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: target,
                                start: "top 90%",
                                toggleActions: "play none none none",
                            },
                        }
                    )
                }

                enhancedFadeUp(imageRef.current)
                enhancedFadeUp(textRef.current, 0.2)
                enhancedFadeUp(textLeftRef.current)
                enhancedFadeUp(imageRightRef.current, 0.2)
            }

        }, sectionRef)

        return () => ctx.revert()
    }, [isDesktop])

    return (
        <section 
            id="about"
            ref={sectionRef} 
            className="relative min-h-[250vh] bg-gradient-to-b from-white to-gray-100 px-6 py-32 overflow-hidden text-black"
        >
            <div 
                ref={backgroundRef}
                className="absolute inset-0 bg-[url('/assets/particles.png')] bg-repeat opacity-10"
            />
            <h2 ref={titleRef} className="text-6xl font-bold text-center mb-12">
                About Us
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
                <img
                    ref={imageRef}
                    src="/assets/about1.png"
                    alt="About"
                    className="w-full md:w-1/2 rounded-xl shadow-2xl transform-gpu transition-transform duration-300 hover:scale-105"
                />
                <p
                    ref={textRef}
                    className="text-lg max-w-xl text-gray-700 leading-relaxed"
                >
                    We are a visionary brand merging innovation, culture, and experience. Our spaces offer a symphony of sound, visuals, and flavor—curated for a new era of lifestyle venues.
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
                <p
                    ref={textLeftRef}
                    className="text-lg max-w-xl text-gray-700 leading-relaxed"
                >
                    Through design, music, and atmosphere, we invite our guests to explore immersive environments that redefine entertainment and social experiences.
                </p>
                <img
                    ref={imageRightRef}
                    src="/assets/about2.png"
                    alt="About 2"
                    className="w-full md:w-1/2 rounded-xl shadow-2xl relative md:-translate-x-4 z-10 transform-gpu transition-transform duration-300 hover:scale-105"
                />
            </div>
        </section>
    )
}