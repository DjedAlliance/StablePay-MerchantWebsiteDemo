"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface TransactionVerifierProps {
  txHash: string
  network: string // e.g., "ethereum-classic", "sepolia", "mordor-testnet"
  onClose: () => void
  onSuccess?: () => void
  onFailure?: () => void
}

interface TransactionStatus {
  status: "pending" | "success" | "failed"
  blockNumber?: number
  confirmations?: number
  errorMessage?: string
  gasUsed?: string
  from?: string
  to?: string
  value?: string
}

// Map network names to Blockscout API endpoints
const BLOCKSCOUT_ENDPOINTS: Record<string, string> = {
  "ethereum-classic": "https://etc-mordor.blockscout.com/api", // Uses Mordor testnet under the hood
  "sepolia": "https://eth-sepolia.blockscout.com/api",
  "milkomeda-mainnet": "https://explorer-mainnet-cardano-evm.c1.milkomeda.com/api",
}

export function TransactionVerifier({ 
  txHash, 
  network, 
  onClose, 
  onSuccess, 
  onFailure 
}: TransactionVerifierProps) {
  const [status, setStatus] = useState<TransactionStatus>({ status: "pending" })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let pollInterval: NodeJS.Timeout
    let initialDelay: NodeJS.Timeout

    const checkTransaction = async () => {
      try {
        const endpoint = BLOCKSCOUT_ENDPOINTS[network]
        
        if (!endpoint) {
          setStatus({
            status: "failed",
            errorMessage: `Network "${network}" not supported for verification`
          })
          setLoading(false)
          return
        }

        // Blockscout API call to get transaction details
        const response = await fetch(
          `${endpoint}?module=transaction&action=gettxinfo&txhash=${txHash}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch transaction data")
        }

        const data = await response.json()
        
        console.log("📊 Blockscout API Response:", {
          status: data.status,
          hasResult: !!data.result,
          fullResponse: data
        })

        if (data.status === "1" && data.result) {
          const tx = data.result
          
          console.log("🔍 Transaction Details:", {
            success: tx.success,
            blockNumber: tx.blockNumber,
            confirmations: tx.confirmations,
            hash: tx.hash
          })
          
          // Check if transaction is successful
          // Blockscout API returns: success: true/false
          const isSuccess = tx.success === true
          
          if (isSuccess) {
            console.log("✅ Transaction SUCCESS!")
            setStatus({
              status: "success",
              blockNumber: parseInt(tx.blockNumber),
              confirmations: parseInt(tx.confirmations || "0"),
              gasUsed: tx.gasUsed,
              from: tx.from,
              to: tx.to,
              value: tx.value,
            })
            setLoading(false)
            onSuccess?.()
            return // Stop polling
          } else {
            // Transaction failed (explicit error)
            console.log("❌ Transaction FAILED!")
            setStatus({
              status: "failed",
              errorMessage: tx.errDescription || tx.revertReason || "Transaction failed",
              blockNumber: parseInt(tx.blockNumber),
            })
            setLoading(false)
            onFailure?.()
            return // Stop polling
          }
        } else {
          // Transaction not found or still pending
          console.log("⏳ Transaction not found yet, continuing to poll...")
          setStatus({ status: "pending" })
        }
      } catch (error) {
        console.error("Error checking transaction:", error)
        // Don't stop polling on errors - transaction might not be indexed yet
        // Just keep status as pending and continue trying
        setStatus({ status: "pending" })
      }
    }

    // Wait 2 seconds before first check to let transaction propagate
    initialDelay = setTimeout(() => {
      checkTransaction()
    }, 2000)

    // Poll every 5 seconds for up to 3 minutes
    let pollCount = 0
    const maxPolls = 36 // 5 seconds * 36 = 3 minutes

    pollInterval = setInterval(() => {
      pollCount++
      
      if (pollCount >= maxPolls) {
        clearInterval(pollInterval)
        setStatus({
          status: "failed",
          errorMessage: "Transaction verification timeout. The transaction may still be processing. Please check Blockscout manually."
        })
        setLoading(false)
        onFailure?.()
        return
      }

      // Continue polling while pending or loading
      if (status.status === "pending" || loading) {
        checkTransaction()
      } else {
        clearInterval(pollInterval)
      }
    }, 5000)

    return () => {
      if (initialDelay) clearTimeout(initialDelay)
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [txHash, network, onSuccess, onFailure])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-zinc-900 rounded-lg p-6 max-w-md w-full border border-zinc-800 shadow-xl"
        >
          <div className="text-center">
            {/* Status Icon */}
            <div className="mb-4 flex justify-center">
              {loading ? (
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
              ) : status.status === "success" ? (
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500" />
              )}
            </div>

            {/* Status Title */}
            <h2 className="text-xl font-semibold text-white mb-2">
              {loading
                ? "Verifying Transaction..."
                : status.status === "success"
                ? "Payment Successful!"
                : "Payment Failed"}
            </h2>

            {/* Status Message */}
            <p className="text-zinc-400 text-sm mb-4">
              {loading
                ? "Please wait while we confirm your transaction on the blockchain."
                : status.status === "success"
                ? "Your payment has been confirmed on the blockchain."
                : status.errorMessage || "The transaction could not be completed."}
            </p>

            {/* Transaction Details */}
            <div className="bg-zinc-800/50 rounded-lg p-4 mb-4 text-left">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Network:</span>
                  <span className="text-zinc-300 font-mono">{network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Transaction Hash:</span>
                  <a
                    href={`${BLOCKSCOUT_ENDPOINTS[network]?.replace('/api', '')}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-mono truncate max-w-[200px]"
                  >
                    {txHash.slice(0, 10)}...{txHash.slice(-8)}
                  </a>
                </div>
                {status.blockNumber && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Block Number:</span>
                    <span className="text-zinc-300 font-mono">{status.blockNumber}</span>
                  </div>
                )}
                {status.confirmations !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Confirmations:</span>
                    <span className="text-zinc-300 font-mono">{status.confirmations}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            {!loading && (
              <button
                onClick={onClose}
                className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

