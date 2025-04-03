import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import React from "react"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function About() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const imageRightRef = useRef(null)
  const textLeftRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 延長 Pin 區段
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "+=1200",
        pin: true,
        scrub: true,
      })

      gsap.fromTo(titleRef.current,
        { scale: 3.1, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          transformOrigin: "center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top+=100 top",
            scrub: true,
          }
        }
      )

      gsap.fromTo(imageRef.current,
        { x: -200,y:-150, opacity: 0 },
        {
          x: 50,
          y:0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=150 center",
            end: "top+=400 center",
            scrub: true,
          }
        }
      )

      gsap.fromTo(textRef.current,
        { y: 40,x:0, opacity: 0 },
        {
          y: 0,
          x:10,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=250 center",
            end: "top+=400 center",
            scrub: true,
          }
        }
      )

      gsap.fromTo(textLeftRef.current,
        { x: 0, opacity: 0 },
        {
          x: -18,
          opacity: 1,
          scrollTrigger: {
            trigger: textLeftRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
          }
        }
      )

      gsap.fromTo(imageRightRef.current,
        { x: 150, y: 100, opacity: 0 },
        {
          x: -60, y: -30,
          opacity: 1,
          scrollTrigger: {
            trigger: imageRightRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative min-h-[250vh] bg-white px-6 py-32 overflow-hidden text-black">
      <h2 ref={titleRef} className="text-6xl font-bold text-center mb-12">
        About Us
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
        <img
          ref={imageRef}
          src="/assets/about1.png"
          alt="About"
          className="w-full md:w-1/2 rounded-xl shadow-xl"
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
          className="w-full md:w-1/2 rounded-xl shadow-xl relative -translate-x-4 z-10"
        />
      </div>
    </section>
  )
}