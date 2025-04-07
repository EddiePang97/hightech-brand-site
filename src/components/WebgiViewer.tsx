import React, { useRef, useCallback, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    ViewerApp,
    addBasePlugins,
    AssetManagerBasicPopupPlugin,
    CanvasSnipperPlugin,
    FileTransferPlugin,
    TonemapPlugin,
    AssetManagerPlugin
} from "webgi"

export default function WebgiViewer() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [viewer, setViewer] = useState<any>(null)
    
    useEffect(() => {
        if (!canvasRef.current) return

        const initViewer = async () => {
            const newViewer = new ViewerApp({
                canvas: canvasRef.current!,
            })
            
            await addBasePlugins(newViewer as any)
            await newViewer.addPlugin(AssetManagerBasicPopupPlugin as any)
            await newViewer.addPlugin(FileTransferPlugin as any)
            await newViewer.addPlugin(CanvasSnipperPlugin as any)
            
            const manager = await newViewer.addPlugin(AssetManagerPlugin as any)
            
            await newViewer.load("/public/assets/models/scene.glb")
            
            const tonemap = newViewer.getPlugin(TonemapPlugin as any)
            if (tonemap) {
            //    tonemap.config.clipBackground = true
            }
            
            newViewer.scene.activeCamera.setCameraOptions({
                controlsEnabled: false,
            })
            
            window.scrollTo(0, 0)
            
            newViewer.addEventListener('preFrame', () => {
                // 在这里添加帧更新逻辑
            })
            
            setViewer(newViewer)
        }

        initViewer()
        
        return () => {
            if (viewer) {
                viewer.dispose()
            }
        }
    }, [])

    return (
        <div id="webgi-canvas-container" className="w-full h-full">
            <canvas id="webgi-canvas" ref={canvasRef} className="w-full h-full" />
        </div>
    )
}

