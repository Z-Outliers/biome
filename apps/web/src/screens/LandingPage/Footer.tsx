import { Github, Linkedin, Mail, XIcon } from "lucide-react";
import logo from "@/assets/logo.svg";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-background/80 backdrop-blur-sm">
      {/* Subtle theme glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-[var(--primary)]/0 via-[var(--primary)]/60 to-[var(--secondary)]/0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent)]"
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="BioMe logo" className="size-8" />
              <h3 className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-2xl font-bold text-transparent">
                BioMe
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Discover the universe of biology through interactive exploration
              and cutting-edge digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {["Features", "Research", "Documentation", "Support"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "Docs", href: "#docs" },
                { label: "API", href: "#api" },
                { label: "Changelog", href: "#changelog" },
                { label: "Status", href: "#status" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-3">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: XIcon, href: "#", label: "X" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "mailto:hello@biome.app", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noreferrer noopener" : undefined
                  }
                  className="group rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  aria-label={label}
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-[color:var(--primary)]/10 transition-colors group-hover:bg-[color:var(--primary)]/20">
                    <Icon className="size-5 text-[color:var(--primary)] transition-colors group-hover:text-[color:var(--primary-foreground)]" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="mb-6 h-px opacity-60 [background:linear-gradient(90deg,transparent,theme(colors.primary.DEFAULT),theme(colors.secondary.DEFAULT),transparent)]" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} BioMe. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#privacy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </a>
            <a
              href="#status"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              System Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
