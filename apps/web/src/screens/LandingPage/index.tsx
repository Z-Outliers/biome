import Footer from "./Footer"
import TopSection from "./TopSection"
import Features from "./Features"

export default function LandingPage() {
  return (
    <div className="brand-theme min-h-screen flex flex-col">
      <TopSection />
      <Features />
      <Footer />
    </div>
  )
}