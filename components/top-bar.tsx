"use client"

import type React from "react"

import { Search, ShoppingBag, X, Menu } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import Link from "next/link"

interface TopBarProps {
  cartItemCount: number
  onCartClick: () => void
  onSearch: (query: string) => void
  onMenuClick: () => void
}

export function TopBar({ cartItemCount, onCartClick, onSearch, onMenuClick }: TopBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false)
      searchInputRef.current?.blur()
    }
  }

  return (
    <div
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled ? "bg-zinc-900 shadow-sm" : "bg-zinc-900"
      } border-b border-zinc-800`}
    >
      <div className="flex items-center justify-between px-3 h-14">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onMenuClick} className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-300">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="text-lg font-medium text-zinc-100 shrink-0 font-serif tracking-wide">
            STABLEPAY
          </Link>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <motion.div className="relative" initial={false} animate={{ width: isSearchOpen ? "auto" : 0 }}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              className={`w-48 sm:w-56 bg-zinc-800 rounded-md text-sm px-3 py-1.5 
                                text-zinc-200
                                focus:outline-none focus:ring-1 focus:ring-zinc-700
                                transition-all duration-200 ${isSearchOpen ? "opacity-100" : "opacity-0"}`}
              onChange={(e) => onSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {isSearchOpen && (
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false)
                  onSearch("")
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-zinc-700 
                                    rounded-full text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-1.5 rounded-md transition-colors text-zinc-300 ${
              isSearchOpen ? "bg-zinc-800" : "hover:bg-zinc-800"
            }`}
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onCartClick}
            className="p-1.5 hover:bg-zinc-800 rounded-md relative text-zinc-300"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItemCount > 0 && (
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-white 
                                    text-zinc-900 text-xs font-medium w-4 h-4 
                                    flex items-center justify-center rounded-full"
              >
                {cartItemCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

