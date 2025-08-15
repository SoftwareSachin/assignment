"use client"

import type React from "react"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), {
  ssr: false,
})

const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.OrbitControls })), {
  ssr: false,
})

const Environment = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Environment })), {
  ssr: false,
})

interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
  model_url: string
  thumbnail_url: string
}

interface ProductViewerProps {
  product: Product
  onBack: () => void
}

const Model = dynamic(
  () =>
    Promise.resolve(function Model({ productName }: { productName: string }) {
      return <CustomProductGeometry productName={productName} />
    }),
  { ssr: false },
)

function CustomProductGeometry({ productName }: { productName: string }) {
  if (productName.toLowerCase().includes("coffee table")) {
    return (
      <group>
        {/* Table top */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Table legs */}
        <mesh position={[-1.3, -0.2, -0.6]}>
          <cylinderGeometry args={[0.05, 0.05, 1.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[1.3, -0.2, -0.6]}>
          <cylinderGeometry args={[0.05, 0.05, 1.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-1.3, -0.2, 0.6]}>
          <cylinderGeometry args={[0.05, 0.05, 1.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[1.3, -0.2, 0.6]}>
          <cylinderGeometry args={[0.05, 0.05, 1.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    )
  }

  if (productName.toLowerCase().includes("ceramic") || productName.toLowerCase().includes("tile")) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[2, 0.1, 2]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        {/* Tile pattern */}
        <mesh position={[0, 0.051, 0]}>
          <boxGeometry args={[1.8, 0.01, 1.8]} />
          <meshStandardMaterial color="#E6E6FA" />
        </mesh>
      </group>
    )
  }

  if (productName.toLowerCase().includes("lamp")) {
    return (
      <group>
        {/* Base */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.2]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.6]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        {/* Lampshade */}
        <mesh position={[0, 1, 0]}>
          <coneGeometry args={[0.6, 0.8, 8]} />
          <meshStandardMaterial color="#F0F8FF" />
        </mesh>
      </group>
    )
  }

  if (productName.toLowerCase().includes("chair")) {
    return (
      <group>
        {/* Seat */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.2, 0.1, 1.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 1, -0.5]}>
          <boxGeometry args={[1.2, 1.2, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Chair legs */}
        <mesh position={[-0.5, -0.3, -0.5]}>
          <cylinderGeometry args={[0.03, 0.03, 1.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.5, -0.3, -0.5]}>
          <cylinderGeometry args={[0.03, 0.03, 1.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.5, -0.3, 0.5]}>
          <cylinderGeometry args={[0.03, 0.03, 1.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.5, -0.3, 0.5]}>
          <cylinderGeometry args={[0.03, 0.03, 1.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    )
  }

  // Default fallback
  return (
    <group>
      <mesh>
        <boxGeometry args={[2, 1.5, 2]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
    </group>
  )
}

function ModelFallback({ productName }: { productName: string }) {
  return <CustomProductGeometry productName={productName} />
}

const ThreeDScene = dynamic(
  () =>
    Promise.resolve(function ThreeDScene({ product }: { product: Product }) {
      return (
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="studio" />
            <Suspense fallback={<ModelFallback productName={product.name} />}>
              <Model productName={product.name} />
            </Suspense>
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas>
        </div>
      )
    }),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">Loading 3D model...</div>
    ),
  },
)

function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  try {
    return <>{children}</>
  } catch (error) {
    console.log("[v0] Error boundary caught GLB loading error:", error)
    return <>{fallback}</>
  }
}

export default function ProductViewer({ product, onBack }: ProductViewerProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="mb-4 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <ThreeDScene product={product} />
              <div className="mt-4 text-sm text-muted-foreground">
                <p>• Drag to rotate • Scroll to zoom • Right-click + drag to pan</p>
              </div>
            </div>
            <div className="md:w-80">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{product.name}</h1>
                  <p className="text-muted-foreground">{product.category}</p>
                </div>
                <div className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                <div className="pt-4">
                  <Button className="w-full" size="lg">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
