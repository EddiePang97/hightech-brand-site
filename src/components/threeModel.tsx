// OrbitalModel.tsx
import React, { Suspense, useRef, useEffect, forwardRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import gsap from 'gsap'
import { Group } from 'three'

// 模型组件
const Model = forwardRef<Group>((_, ref) => {
  const gltf = useGLTF('/assets/models/Orbital_Harmony_0404094013_texture.glb')

  useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.scale.set(1, 1, 1) // ✅ 放大模型
    }
  }, [ref])

  return <primitive ref={ref} object={gltf.scene} />
})
Model.displayName = 'Model'

// 分段组件
const Section = ({
  children,
  isActive,
  onEnter
}: {
  children: React.ReactNode
  isActive: boolean
  onEnter: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onEnter()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [onEnter])

  return (
    <div
      ref={ref}
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        opacity: isActive ? 1 : 0.3,
        transition: 'opacity 0.5s'
      }}
    >
      {children}
    </div>
  )
}

// 主组件
export default function OrbitalViewer() {
  const [activeSection, setActiveSection] = useState(0)
  const modelRef = useRef<Group>(null)

  const handleSectionEnter = (sectionIndex: number) => {
    setActiveSection(sectionIndex)

    if (modelRef.current) {
      const timeline = gsap.timeline()

      switch (sectionIndex) {
        case 0:
          // 模型移动到左边
          timeline.to(modelRef.current.position, {
            x: -20,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: 'power2.out'
          }).to(modelRef.current.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1.2,
            ease: 'power2.out'
          }, '<')
          break

        case 1:
          // 模型旋转并往下
          timeline.to(modelRef.current.rotation, {
            y: modelRef.current.rotation.y + Math.PI * 1.5,
            duration: 1.5,
            ease: 'power2.inOut'
          }).to(modelRef.current.position, {
            x: 0,
            y: -1.5,
            z: 0,
            duration: 1.5,
            ease: 'power2.inOut'
          }, '<')
          break

        case 2:
          // 模型放大并居中
          timeline.to(modelRef.current.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: 'power2.out'
          }).to(modelRef.current.scale, {
            x: 1.8,
            y: 1.8,
            z: 1.8,
            duration: 1.5,
            ease: 'back.out(1.7)'
          }, '<')
          break
      }
    }
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '300vh',
        background: 'transparent',
        position: 'relative'
      }}
    >
      {/* Sticky Canvas */}
      <div
        style={{
          position: 'sticky',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Canvas
          style={{ background: 'transparent' }}
          camera={{ position: [0, 0, 50], fov: 50 }} // ✅ 正中视角
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Model ref={modelRef} />
          </Suspense>
          {/* Dev 用三维坐标辅助线 */}
          {/* <axesHelper args={[5]} /> */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>

      {/* Section 1 */}
      <Section isActive={activeSection === 0} onEnter={() => handleSectionEnter(0)}>
        <div
          style={{
            position: 'absolute',
            left: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            borderRadius: '8px',
            maxWidth: '300px'
          }}
        >
          第一部分：模型在左边
        </div>
      </Section>

      {/* Section 2 */}
      <Section isActive={activeSection === 1} onEnter={() => handleSectionEnter(1)}>
        <div
          style={{
            position: 'absolute',
            right: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            borderRadius: '8px',
            maxWidth: '300px'
          }}
        >
          第二部分：模型旋转向下
        </div>
      </Section>

      {/* Section 3 */}
      <Section isActive={activeSection === 2} onEnter={() => handleSectionEnter(2)}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '20%',
            transform: 'translateX(-50%)',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            borderRadius: '8px',
            maxWidth: '300px'
          }}
        >
          第三部分：模型放大居中
        </div>
      </Section>
    </div>
  )
}

// 模型预加载
useGLTF.preload('/assets/models/Orbital_Harmony_0404094013_texture.glb')
