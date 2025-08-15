import ProductGallery from "@/components/product-gallery"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-3xl font-serif font-bold text-primary tracking-tight">MaterialViz Pro</h1>
              <div className="hidden sm:block h-6 w-px bg-border"></div>
              <span className="hidden sm:inline-block text-sm font-medium text-muted-foreground uppercase tracking-wide">
                3D Visualization Platform
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                Products
              </a>
              <a
                href="#"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                Projects
              </a>
              <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-background via-muted/30 to-muted py-20 lg:py-28">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 tracking-tight leading-tight">
            Visualize Building Materials
            <span className="block text-primary">in 3D</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Professional visualization platform for architects, designers, and contractors.
            <span className="block mt-2">
              Explore materials with interactive 3D models and make informed decisions.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Exploring
            </button>
            <button className="border border-border text-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-muted transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      <ProductGallery />
    </main>
  )
}
