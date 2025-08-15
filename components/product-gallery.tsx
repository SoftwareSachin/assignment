"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "./product-card"
import ProductViewer from "./product-viewer"

interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
  model_url: string
  thumbnail_url: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Modern Oak Coffee Table",
    category: "Furniture",
    price: 299.99,
    description: "A beautiful modern oak coffee table with clean lines",
    model_url: "/assets/3d/duck.glb",
    thumbnail_url: "/oak-coffee-table.png",
  },
  {
    id: 2,
    name: "Ceramic Floor Tile",
    category: "Building Material",
    price: 15.5,
    description: "High-quality ceramic floor tile, 300x300mm",
    model_url: "/assets/3d/duck.glb",
    thumbnail_url: "/ceramic-floor-tile.png",
  },
  {
    id: 3,
    name: "Designer Table Lamp",
    category: "Lighting",
    price: 89.99,
    description: "Modern designer table lamp with adjustable brightness",
    model_url: "/assets/3d/duck.glb",
    thumbnail_url: "/modern-designer-lamp.png",
  },
  {
    id: 4,
    name: "Wooden Dining Chair",
    category: "Furniture",
    price: 129.99,
    description: "Comfortable wooden dining chair with ergonomic design",
    model_url: "/assets/3d/duck.glb",
    thumbnail_url: "/images/wooden-chair.png",
  },
]

export default function ProductGallery() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProducts(mockProducts)
      setLoading(false)
    }

    loadProducts()
  }, [])

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleProductClick = (product: Product) => {
    console.log(`[v0] Opening 3D viewer for: ${product.name}`)
    setSelectedProduct(product)
  }

  const handleBackToGallery = () => {
    console.log(`[v0] Returning to gallery`)
    setSelectedProduct(null)
  }

  if (selectedProduct) {
    return <ProductViewer product={selectedProduct} onBack={handleBackToGallery} />
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">3D Product Gallery</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="sm:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} onClick={() => handleProductClick(product)}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
