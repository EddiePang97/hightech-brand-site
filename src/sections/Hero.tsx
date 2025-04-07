import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import React from "react"

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const navbarRef = useRef<HTMLElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const topAreaRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ 背景縮小，露出白邊
      gsap.fromTo(bgRef.current,
        { scaleX: 1 },
        {
          scaleX: 0.9,
          transformOrigin: "center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        }
      )

      // ✅ 標題縮放
      gsap.fromTo([titleRef.current, subtitleRef.current],
        { scale: 1.2, opacity: 0.8 },
        {
          scale: 0.68,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "center center",
            scrub: true,
          }
        }
      )

      // ✅ Scroll Down Arrow 動畫
      gsap.to(arrowRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.2
      })
    }, sectionRef)

    // 添加全局滚动监听
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = sectionRef.current?.clientHeight || 0

      if (scrollY > heroHeight && !isHovering) {
        gsap.to(navbarRef.current, { 
          y: -100, 
          duration: 0.3, 
          ease: "power2.out" 
        })
      } else {
        gsap.to(navbarRef.current, { 
          y: 0, 
          duration: 0.3, 
          ease: "power2.out" 
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      ctx.revert()
    }
  }, [isHovering])

  // 处理顶部区域悬停
  const handleTopAreaHover = (isHovering: boolean) => {
    setIsHovering(isHovering)
    
    if (isHovering) {
      // 清除之前的定时器
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
      // 显示 navbar
      gsap.to(navbarRef.current, { 
        y: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      })
    } else {
      // 设置延迟隐藏
      hideTimeoutRef.current = setTimeout(() => {
        if (window.scrollY > 0) {
          gsap.to(navbarRef.current, { 
            y: -100, 
            duration: 0.3, 
            ease: "power2.out" 
          })
        }
      }, 3000) // 3秒后隐藏
    }
  }

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden scrollbar-hide">
      {/* 顶部悬停区域 */}
      <div
        ref={topAreaRef}
        className="fixed top-0 left-0 w-full h-20 z-40"
        onMouseEnter={() => handleTopAreaHover(true)}
        onMouseLeave={() => handleTopAreaHover(false)}
      />

      {/* 背景圖層 */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 overflow-hidden rounded-xl transition-transform duration-1000"
      >
        <img
          src="/assets/background.jpg"
          className="w-full h-full object-cover"
          alt="Background"
        />
      </div>

      {/* 導航欄 */}
      <header
        ref={navbarRef}
        className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50 text-white backdrop-blur-md bg-black/30 transition-transform duration-500"
      >
        <div className="text-2xl font-bold">
          <img src="/assets/LOGO.png" alt="Logo" className="w-40 h-20" />
        </div>
        <nav className="space-x-6 hidden md:flex">
          <a
            onClick={(e) => {
              e.preventDefault()
              gsap.to(window, {
                scrollTo: "#about",
                duration: 1.2,
                ease: "power2.inOut"
              })
            }}
            className="cursor-pointer hover:underline"
          >
            About
          </a>
          <a href="#venues" className="hover:underline">Venues</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* 中央文字層 */}
      <div className="flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg"
        >
          Welcome to Our Future
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl max-w-xl drop-shadow-md"
        >
          Experience a new level of digital innovation
        </p>
      </div>

      {/* Scroll down 提示箭頭 */}
      {/* <div ref={arrowRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white opacity-80">
        <span className="text-2xl animate-bounce">↓</span>
      </div> */}
    </section>
  )
}
