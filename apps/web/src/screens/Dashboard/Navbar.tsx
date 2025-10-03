"use client";

import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Search from "./Search";
import { useTheme } from "@/providers/ThemeProvider";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      {/* Sidebar Toggle */}
      <SidebarTrigger className="h-8 w-8" />
      <Separator orientation="vertical" className="mr-2 h-6" />

      {/* Search Bar */}
      <Search />

      {/* Theme Toggle */}
      <div className="ml-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8"
        >
          <>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </>
        </Button>
      </div>
    </header>
  );
}
