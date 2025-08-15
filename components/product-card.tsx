import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Product {
  id: number
  name: string
  category: string
  price: number
  thumbnail_url?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-3 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={
              product.thumbnail_url || `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(product.name)}`
            }
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <p className="font-bold text-lg text-primary">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
