"use client"

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
    import("@react-three/drei").then((mod) => {
      const { useGLTF } = mod
      return {
        default: function Model({ url }: { url: string }) {
          const { scene } = useGLTF(url)
          return (
            <group>
              <primitive object={scene} />
            </group>
          )
        },
      }
    }),
  { ssr: false },
)

function ModelFallback({ productName }: { productName: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[2, 1.5, 2]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.2]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
    </group>
  )
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
              <Model url={product.model_url} />
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

export default function ProductViewer({ product, onBack }: ProductViewerProps) {
  console.log(`[v0] Loading 3D viewer for: ${product.name}`)

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
</merged_code>
