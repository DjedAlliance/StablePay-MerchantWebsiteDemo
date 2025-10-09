"use client"

import { motion } from "motion/react"

export function HeroBanner() {
  return (
    <div className="relative h-64 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />

      <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white mb-2">STABLEPAY</h1>
          <p className="font-serif text-lg md:text-xl text-zinc-300 italic">Merchant Demo Website</p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 px-6 py-2 bg-white text-zinc-900 text-sm font-medium rounded-sm hover:bg-zinc-100 transition-colors"
          >
            Shop Collection
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

