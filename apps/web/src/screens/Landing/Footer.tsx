import { Github, Linkedin, Mail, XIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-background backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
              BioMe
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Discover the universe of biology through interactive exploration
              and cutting-edge digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {["Features", "Research", "Documentation", "Support"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Connect</h4>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: XIcon, href: "#", label: "X" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 rounded-full bg-[color:var(--primary)]/10 hover:bg-[color:var(--primary)]/20 transition-colors group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-[color:var(--primary)] group-hover:text-[color:var(--primary-foreground)] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="mb-6 h-px bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-60" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2025 BioMe. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href="#privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
