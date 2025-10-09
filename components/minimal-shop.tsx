"use client"

import { AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"
import { ProductGrid } from "./product-grid"
import { CartDrawer } from "./cart-drawer"
import { ProductModal } from "./product-modal"
import { TopBar } from "./top-bar"
import { CategorySidebar } from "./category-sidebar"
import { HeroBanner } from "./hero-banner"
import { ToastContainer } from "./toast-container"
import { type Product, type CartItem, products } from "./data"
import { useToast } from "@/hooks/use-toast"

export default function MinimalShop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Add dark class to html element to enable dark mode
    document.documentElement.classList.add("dark")
  }, [])

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const handleCheckoutComplete = () => {
    setCart([])
    toast({
      title: "Order Completed",
      description: "Thank you for your purchase!",
      duration: 5000,
    })
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="h-screen bg-zinc-900 text-white overflow-hidden flex flex-col">
      <TopBar
        cartItemCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        onMenuClick={toggleSidebar}
      />

      <div className="flex flex-1 overflow-hidden">
        <CategorySidebar
          isOpen={isSidebarOpen}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 overflow-y-auto">
          <HeroBanner />

          <div className="mx-auto px-4 py-8">
            <h2 className="text-xl font-medium mb-6 px-2">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
            <ProductGrid products={filteredProducts} onProductSelect={setSelectedProduct} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(product) => {
              addToCart(product)
              setSelectedProduct(null)
              setIsCartOpen(true)
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            onRemoveFromCart={removeFromCart}
            onCheckoutComplete={handleCheckoutComplete}
          />
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  )
}

