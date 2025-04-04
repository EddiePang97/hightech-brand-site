// src/hooks/useScrollTriggerRefresh.ts
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function useScrollTriggerRefresh() {
  const resizeTimeout = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const handleResize = () => {
      // 清除之前的定时器
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }

      // 使用节流，避免频繁刷新
      resizeTimeout.current = setTimeout(() => {
        // 只在窗口大小变化超过一定阈值时才刷新
        const currentWidth = window.innerWidth
        const currentHeight = window.innerHeight
        
        // 如果窗口大小变化超过 50px 才刷新
        if (
          Math.abs(currentWidth - (window as any).lastWidth) > 50 ||
          Math.abs(currentHeight - (window as any).lastHeight) > 50
        ) {
          console.log("[ScrollTrigger] 强制刷新 (resize / orientationchange)")
          ScrollTrigger.refresh(true);
          
          // 更新最后记录的大小
          (window as any).lastWidth = currentWidth
          ;(window as any).lastHeight = currentHeight
        }
      }, 100) // 100ms 的节流时间
    }

    // 初始化记录窗口大小
    (window as any).lastWidth = window.innerWidth
    ;(window as any).lastHeight = window.innerHeight

    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
    }
  }, [])
}