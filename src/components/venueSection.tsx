import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import React from "react"

interface VenueSectionProps {
  title: string
  images: string[]
  direction: "bottom" | "right" | "left"
}

gsap.registerPlugin(ScrollTrigger)

export default function VenueSection({ title, images, direction }: VenueSectionProps) {
  const sectionRef = useRef(null)
  const cardRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      images.forEach((_, i) => {
        const el = cardRefs.current[i]
        const baseY = direction === "bottom" ? 200 : 0
        const baseX = direction === "right" ? 300 : direction === "left" ? -300 : 0

        const delayStart = i === 0 ? "top 90%" : `top+=${300 * i} center`

        gsap.fromTo(el,
          { opacity: 0, x: baseX, y: baseY },
          {
            opacity: 1,
            x: 0,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: delayStart,
              end: "top 50%",
              scrub: true,
              markers: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [images, direction])

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] bg-white px-6 py-32 text-black overflow-hidden">
      <h2 className="text-5xl font-bold text-center mb-24">{title}</h2>
      <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => el && (cardRefs.current[i] = el)}
            className="absolute w-[80%] max-w-md rounded-xl shadow-2xl overflow-hidden"
            style={{ zIndex: 10 + i, top: `${i * 40}px` }}
          >
            <img src={src} alt={`Venue ${i + 1}`} className="w-full h-auto object-cover rounded-xl" />
          </div>
        ))}
      </div>
    </section>
  )
}