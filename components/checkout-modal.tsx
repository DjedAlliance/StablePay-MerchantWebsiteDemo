"use client"

import type React from "react"
import { motion } from "motion/react"
import { X, CreditCard, ShoppingCartIcon as Paypal, Apple } from "lucide-react"
import { useState, useEffect } from "react"

// @ts-ignore - stablepay-sdk types not available
import StablePay from "stablepay-sdk";
// @ts-ignore - CSS import for stablepay-sdk
import "stablepay-sdk/dist/esm/styles.css";

interface CheckoutModalProps {
  total: number
  onClose: () => void
  onComplete: () => void
}

export function CheckoutModal({ total, onClose, onComplete }: CheckoutModalProps) {
  // onComplete will be used when StablePay widget completes
  void onComplete; // Suppress unused variable warning
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [networkSelector, setNetworkSelector] = useState<StablePay.NetworkSelector | null>(null)

  useEffect(() => {
    const merchantConfig = new StablePay.MerchantConfig({
      receivingAddress: "0x29574AE32a52E2c2Cf7b447EEA09a9c77eA2b2c8",
      blacklist: [],
      Amounts: {
        "sepolia": { stablecoin: 10 },
        "milkomeda-mainnet": { stablecoin: 50 },
        "ethereum-classic": { stablecoin: 0.0001 },
      },
    })

    const selector = new StablePay.NetworkSelector(merchantConfig)
    setNetworkSelector(selector)
  }, [])

  return (
    <>
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50"
        onClick={onClose}
      />

      {/* Modal Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="w-[90%] max-w-md bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 shadow-xl">
          <div className="p-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif tracking-wide text-white">Checkout</h2>
              <button onClick={onClose} className="p-1.5 hover:bg-zinc-800 rounded-full">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="mb-6">
              <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                <span className="text-zinc-400">Shipping</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="flex justify-between items-center py-3 font-medium">
                <span className="text-zinc-300">Total</span>
                <span className="text-xl text-white">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-300 mb-3">Payment Method</h3>
              <div className="space-y-3">
                <PaymentOption
                  id="card"
                  label="Credit Card"
                  icon={<CreditCard className="w-4 h-4" />}
                  selected={selectedPayment === "card"}
                  onSelect={() => setSelectedPayment("card")}
                />
                <PaymentOption
                  id="paypal"
                  label="PayPal"
                  icon={<Paypal className="w-4 h-4" />}
                  selected={selectedPayment === "paypal"}
                  onSelect={() => setSelectedPayment("paypal")}
                />
                <PaymentOption
                  id="apple"
                  label="Apple Pay"
                  icon={<Apple className="w-4 h-4" />}
                  selected={selectedPayment === "apple"}
                  onSelect={() => setSelectedPayment("apple")}
                />
              </div>
            </div>

            {/* StablePay Widget Button (Properly Aligned at Bottom) */}
            <div className="mt-6 flex justify-center">
              {networkSelector && (
                <StablePay.Widget networkSelector={networkSelector} buttonSize="large" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

interface PaymentOptionProps {
  id: string
  label: string
  icon: React.ReactNode
  selected: boolean
  onSelect: () => void
}

function PaymentOption({ label, icon, selected, onSelect }: PaymentOptionProps) {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
        selected
          ? "bg-zinc-800 border border-zinc-700"
          : "bg-zinc-800/50 hover:bg-zinc-800/80 border border-transparent"
      }`}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-zinc-700 rounded-md">{icon}</div>
      <div className="flex-1">
        <div className="text-sm font-medium text-white">{label}</div>
      </div>
      <div className="w-5 h-5 rounded-full border border-zinc-600 flex items-center justify-center">
        {selected && <div className="w-3 h-3 bg-white rounded-full" />}
      </div>
    </div>
  )
}
