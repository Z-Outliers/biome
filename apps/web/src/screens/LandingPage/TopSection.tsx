import { Link } from "react-router";
import Logo from "@/assets/logo.svg";
import BlurText from "@/components/BlurText";
import DarkVeil from "@/components/DarkVeil";
import { Button } from "@/components/ui/button";

export default function TopSection() {
  return (
    <section className="w-screen h-[calc(100svh-4rem)] md:h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DarkVeil hueShift={120} />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      </div>
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full items-center">
          {/* Left: Text */}
          <div className="text-left space-y-8">
            <div className="space-y-6">
              <BlurText
                text="Biomechanics Beyond Earth"
                className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight"
              />
              <BlurText
                text="Search, summarize, and discover NASA space biology with AI-powered insight."
                className="text-xl sm:text-2xl lg:text-3xl text-zinc-300 font-light max-w-2xl"
              />
            </div>

            <div className="pt-2">
              <p className="text-zinc-300/90 text-lg max-w-xl leading-relaxed">
                Turn questions into knowledge faster with multimodal search and
                research tools crafted for scientists.
              </p>

              <div className="flex flex-col mt-8 sm:flex-row gap-4 sm:gap-6 items-center">
                <Button
                  size="lg"
                  className="bg-[var(--primary)] text-[color:var(--primary-foreground)] hover:opacity-90 font-semibold px-8 py-4 rounded-full"
                  asChild
                >
                  <Link to="/dashboard">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  className="border-2 border-[color:var(--secondary)] bg-transparent text-zinc-200 hover:text-zinc-200 hover:bg-[color:var(--secondary)]/10 hover:border-[color:var(--secondary)] transition-all duration-300 rounded-full px-8 py-4 font-semibold backdrop-blur-sm"
                  variant="outline"
                  asChild
                >
                  <a href="#features">Learn More</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Logo/Image */}
          <div className="hidden md:flex justify-center">
            <div className="relative group">
              {/* Branded glow ring */}
              <div className="absolute -inset-16 rounded-[3rem] bg-gradient-to-r from-[var(--primary)]/35 to-[var(--secondary)]/35 blur-[72px]" />
              <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[0.25deg]">
                <img
                  src={Logo}
                  width={500}
                  height={500}
                  alt="BioMe Logo"
                  className="mx-auto biome-float will-change-transform drop-shadow-[0_0_50px_rgba(0,179,59,0.35)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
