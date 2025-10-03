'use client'

import { Search, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Prevent hydration mismatch with theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      {/* Sidebar Toggle */}
      <SidebarTrigger className="h-8 w-8" />
      <Separator orientation="vertical" className="mr-2 h-6" />
      
      {/* Main Search Bar */}
      <div className="flex-1 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search publications, authors, topics..."
            className="pl-10 pr-4 h-10 w-full bg-muted/50 border-muted-foreground/20 focus:bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Theme Toggle */}
      <div className="ml-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8"
        >
          {mounted && (
            <>
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </>
          )}
        </Button>
      </div>
    </header>
  )
}
