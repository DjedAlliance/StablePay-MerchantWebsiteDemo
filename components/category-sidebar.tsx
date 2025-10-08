"use client"

import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"

interface CategorySidebarProps {
  isOpen: boolean
  selectedCategory: string
  onCategorySelect: (category: string) => void
  onClose: () => void
}

const categories = ["All", "Lighting", "Kitchenware", "Home Decor", "Plants", "Office", "Textiles"]

export function CategorySidebar({ isOpen, selectedCategory, onCategorySelect, onClose }: CategorySidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black z-30"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed md:relative left-0 top-14 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 z-30 md:translate-x-0"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-zinc-100">Categories</h2>
            <button className="md:hidden p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400" onClick={onClose}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedCategory === category
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                }`}
                onClick={() => {
                  onCategorySelect(category)
                  if (window.innerWidth < 768) {
                    onClose()
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}

