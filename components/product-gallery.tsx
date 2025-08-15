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
    model_url: "/models/coffee-table.glb",
    thumbnail_url: "/oak-coffee-table.png",
  },
  {
    id: 2,
    name: "Ceramic Floor Tile",
    category: "Building Material",
    price: 15.5,
    description: "High-quality ceramic floor tile, 300x300mm",
    model_url: "/models/ceramic-tile.glb",
    thumbnail_url: "/ceramic-floor-tile.png",
  },
  {
    id: 3,
    name: "Designer Table Lamp",
    category: "Lighting",
    price: 89.99,
    description: "Modern designer table lamp with adjustable brightness",
    model_url: "/models/table-lamp.glb",
    thumbnail_url: "/modern-designer-lamp.png",
  },
  {
    id: 4,
    name: "Wooden Dining Chair",
    category: "Furniture",
    price: 129.99,
    description: "Comfortable wooden dining chair with ergonomic design",
    model_url: "/models/wooden-chair.glb",
    thumbnail_url: "/images/wooden-chair.png",
  },
  {
    id: 5,
    name: "Marble Kitchen Countertop",
    category: "Building Material",
    price: 89.99,
    description: "Premium Carrara marble countertop slab, 120x60cm",
    model_url: "/models/marble-countertop.glb",
    thumbnail_url: "/white-marble-countertop.png",
  },
  {
    id: 6,
    name: "Industrial Pendant Light",
    category: "Lighting",
    price: 149.99,
    description: "Black metal industrial pendant light with Edison bulb",
    model_url: "/models/pendant-light.glb",
    thumbnail_url: "/placeholder-uo38t.png",
  },
  {
    id: 7,
    name: "Scandinavian Sofa",
    category: "Furniture",
    price: 899.99,
    description: "3-seater Scandinavian style sofa in light gray fabric",
    model_url: "/models/scandinavian-sofa.glb",
    thumbnail_url: "/light-gray-scandinavian-sofa.png",
  },
  {
    id: 8,
    name: "Hardwood Flooring",
    category: "Building Material",
    price: 45.99,
    description: "Premium oak hardwood flooring planks, per square meter",
    model_url: "/models/hardwood-flooring.glb",
    thumbnail_url: "/oak-hardwood-flooring.png",
  },
  {
    id: 9,
    name: "Modern Bookshelf",
    category: "Furniture",
    price: 249.99,
    description: "5-tier modern bookshelf in walnut finish",
    model_url: "/models/bookshelf.glb",
    thumbnail_url: "/placeholder-ww7ze.png",
  },
  {
    id: 10,
    name: "LED Ceiling Light",
    category: "Lighting",
    price: 199.99,
    description: "Dimmable LED ceiling light with remote control",
    model_url: "/models/ceiling-light.glb",
    thumbnail_url: "/placeholder-3m2jp.png",
  },
  {
    id: 11,
    name: "Subway Tile",
    category: "Building Material",
    price: 8.99,
    description: "Classic white subway tile, 75x150mm, per square meter",
    model_url: "/models/subway-tile.glb",
    thumbnail_url: "/white-subway-bathroom-tiles.png",
  },
  {
    id: 12,
    name: "Executive Office Desk",
    category: "Furniture",
    price: 549.99,
    description: "Large executive desk with built-in storage drawers",
    model_url: "/models/office-desk.glb",
    thumbnail_url: "/modern-executive-desk.png",
  },
  {
    id: 13,
    name: "Track Lighting System",
    category: "Lighting",
    price: 299.99,
    description: "Adjustable track lighting system with 4 spotlights",
    model_url: "/models/track-lighting.glb",
    thumbnail_url: "/modern-track-lighting.png",
  },
  {
    id: 14,
    name: "Granite Bathroom Vanity",
    category: "Building Material",
    price: 399.99,
    description: "Black granite vanity top with integrated sink",
    model_url: "/models/granite-vanity.glb",
    thumbnail_url: "/black-granite-vanity.png",
  },
  {
    id: 15,
    name: "Velvet Accent Chair",
    category: "Furniture",
    price: 329.99,
    description: "Luxurious emerald velvet accent chair with gold legs",
    model_url: "/models/velvet-chair.glb",
    thumbnail_url: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 16,
    name: "Smart Chandelier",
    category: "Lighting",
    price: 799.99,
    description: "Crystal chandelier with smart LED bulbs and app control",
    model_url: "/models/smart-chandelier.glb",
    thumbnail_url: "/placeholder.svg?height=300&width=300",
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
