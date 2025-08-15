import ProductGallery from "@/components/product-gallery"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">MaterialViz Pro</h1>
              <span className="text-sm text-muted-foreground">3D Visualization Platform</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Products
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Categories
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Projects
              </a>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-background to-muted py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Visualize Building Materials in 3D</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional visualization platform for architects, designers, and contractors. Explore materials with
            interactive 3D models and make informed decisions.
          </p>
        </div>
      </section>

      <ProductGallery />
    </main>
  )
}
