import Link from "next/link";
import BlurText from "@/components/BlurText";
import { Button } from "@/components/ui/button";
import Orb from "@/components/Orb";

export default function TopSection() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute bg-black inset-0 -z-10">
        <Orb />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      </div>

      <div className="text-center space-y-8 px-4">
        <div className="space-y-6">
          <BlurText
            text="Discover Your Universe"
            className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight"
          />
          <BlurText
            text="Journey through the cosmos of biological discovery"
            className="text-xl sm:text-2xl lg:text-3xl text-zinc-300 font-light max-w-3xl text-center"
          />
        </div>

        <div className="pt-8">
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Explore the intricate patterns of life through an immersive digital
            experience that brings biology to your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-300 font-semibold px-8 py-4 rounded-full"
              asChild
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button
              size="lg"
              className="border-2 border-zinc-400 bg-transparent text-zinc-300 hover:bg-zinc-200 hover:text-black hover:border-zinc-200 transition-all duration-300 rounded-full px-8 py-4 font-semibold backdrop-blur-sm"
              variant="outline"
              asChild
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
