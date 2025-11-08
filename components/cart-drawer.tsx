"use client"

import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"
import { useState } from "react"
import type { CartItem } from "./data"
import { CheckoutModal } from "./checkout-modal"

interface CartDrawerProps {
  cart: CartItem[]
  onClose: () => void
  onRemoveFromCart: (productId: string) => void
  onCheckoutComplete?: () => void
}

export function CartDrawer({ cart, onClose, onRemoveFromCart, onCheckoutComplete }: CartDrawerProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false)
    onClose()
    if (onCheckoutComplete) {
      onCheckoutComplete()
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-zinc-900 shadow-xl z-40"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <h2 className="text-lg font-medium">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-zinc-400 mb-2">Your cart is empty</p>
                <button onClick={onClose} className="text-sm text-zinc-300 underline hover:text-white">
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-zinc-800/50 rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-medium truncate">{item.name}</h3>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-1.5 hover:bg-zinc-700 rounded-full ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">Qty: {item.quantity}</p>
                    <p className="text-base font-medium mt-1">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-zinc-800">
            <div className="flex justify-between mb-4">
              <span className="text-base">Total</span>
              <span className="text-base font-medium">${total < 0.01 ? total.toFixed(6) : total.toFixed(2)}</span>
            </div>
            <button
              className={`w-full py-3 text-base font-medium rounded-lg transition-colors ${
                cart.length === 0
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-white text-zinc-900 hover:bg-zinc-100"
              }`}
              onClick={() => cart.length > 0 && setIsCheckoutOpen(true)}
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal total={total} onClose={() => setIsCheckoutOpen(false)} onComplete={handleCheckoutComplete} />
        )}
      </AnimatePresence>
    </>
  )
}

