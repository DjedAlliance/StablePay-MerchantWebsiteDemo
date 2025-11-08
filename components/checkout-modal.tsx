"use client"

import type React from "react"
import { motion } from "motion/react"
import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { TransactionVerifier } from "./transaction-verifier"

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
  const [networkSelector, setNetworkSelector] = useState<StablePay.NetworkSelector | null>(null)
  const [showVerifier, setShowVerifier] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string>("")
  const [selectedNetwork, setSelectedNetwork] = useState<string>("ethereum-classic")
  const [paymentSucceeded, setPaymentSucceeded] = useState(false)

  useEffect(() => {
    // Use cart total dynamically for all networks
    const config = new StablePay.Config({
      receivingAddress: "0x29574AE32a52E2c2Cf7b447EEA09a9c77eA2b2c8",
      blacklist: [],
      Amounts: {
        "sepolia": { stablecoin: total },
        "milkomeda-mainnet": { stablecoin: total },
        "ethereum-classic": { stablecoin: total }, // Uses Mordor testnet under the hood
      },
    })

    const selector = new StablePay.NetworkSelector(config)
    setNetworkSelector(selector)
  }, [total]) // Re-initialize when cart total changes

  // Handle transaction completion from widget
  const handleTransactionComplete = (details: any) => {
    console.log("Transaction completed:", details)
    
    if (details.txHash) {
      // Show the transaction verifier overlay (widget stays open underneath)
      setTransactionHash(details.txHash)
      setSelectedNetwork(details.network || "ethereum-classic")
      setShowVerifier(true)
    }
  }

  const handleVerificationSuccess = () => {
    console.log("✅ Payment verified successfully!")
    setPaymentSucceeded(true)
    // Keep verifier open to show success message
    // User will close it manually by clicking "Close" button
  }

  const handleVerificationFailure = () => {
    console.log("❌ Payment verification failed")
    // Keep verifier open to show error, user can close it
  }

  const handleVerificationClose = () => {
    setShowVerifier(false)
    setTransactionHash("")
    
    // If payment succeeded, trigger completion callback (clear cart, etc.)
    if (paymentSucceeded) {
      onComplete()
    }
    
    onClose() // Close widget when user closes verifier
  }

  return (
    <>
      {/* Transaction Verifier Overlay - Shows on top of widget */}
      {showVerifier && transactionHash && (
        <TransactionVerifier
          txHash={transactionHash}
          network={selectedNetwork}
          onClose={handleVerificationClose}
          onSuccess={handleVerificationSuccess}
          onFailure={handleVerificationFailure}
        />
      )}

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
                <span className="text-white">${total < 0.01 ? total.toFixed(6) : total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                <span className="text-zinc-400">Shipping</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="flex justify-between items-center py-3 font-medium">
                <span className="text-zinc-300">Total</span>
                <span className="text-xl text-white">${total < 0.01 ? total.toFixed(6) : total.toFixed(2)}</span>
              </div>
            </div>

            {/* StablePay Widget Button */}
            <div className="mt-6 flex justify-center">
              {networkSelector && (
                <StablePay.Widget 
                  networkSelector={networkSelector} 
                  buttonSize="large"
                  onTransactionComplete={handleTransactionComplete}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
