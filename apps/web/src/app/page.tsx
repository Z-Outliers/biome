import Features from "@/screens/Landing/Features";
import Footer from "@/screens/Landing/Footer";
import TopSection from "@/screens/Landing/TopSection";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="brand-theme min-h-screen flex flex-col">
      {/* Simple brand header */}
      {/* <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-14 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--primary)]/10">
                <Image src="/logo.svg" alt="BioMe Logo" width={24} height={24} />
              </span>
              <span className="text-lg font-semibold">BioMe</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="/dashboard" className="text-sm px-4 py-2 rounded-md bg-[var(--primary)] text-[color:var(--primary-foreground)] hover:opacity-90">Open App</Link>
            </nav>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]" />
      </header> */}

      {/* Hero + sections */}
      <TopSection />
      <Features />
      <Footer />
    </div>
  );
}
