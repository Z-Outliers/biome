import { Brain, Dna, FlaskConical, Leaf, Microscope } from "lucide-react";
import {Link} from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"

const features = [
  {
    id: 1,
    icon: Microscope,
    title: "Multimodal Search",
    description:
      "Search through 608 NASA space biology publications using text, voice commands, or image uploads for comprehensive research discovery.",
    badge: "Core Feature",
    badgeVariant: "default" as const,
    highlights: ["Text Search", "Voice Recognition", "Image Analysis"],
  },
  {
    id: 2,
    icon: Brain,
    title: "Knowledge Maps",
    description:
      "Visualize connections between research papers, concepts, and discoveries with interactive knowledge graphs and relationship mapping.",
    badge: "Popular",
    badgeVariant: "secondary" as const,
    highlights: ["Interactive Graphs", "Concept Linking", "Research Pathways"],
  },
  {
    id: 3,
    icon: FlaskConical,
    title: "AI Research Assistant",
    description:
      "Get intelligent summaries, compare multiple studies, and engage with an AI chatbot trained on NASA's space biology research.",
    badge: "AI-Powered",
    badgeVariant: "destructive" as const,
    highlights: ["Smart Summaries", "Study Comparisons", "AI Chatbot"],
  },
  {
    id: 4,
    icon: Dna,
    title: "Q&A System",
    description:
      "Ask specific questions about space biology research and get precise answers extracted from NASA's publication database.",
    badge: "Research Tool",
    badgeVariant: "outline" as const,
    highlights: [
      "Question Answering",
      "Citation Tracking",
      "Source Verification",
    ],
  },
  {
    id: 5,
    icon: Leaf,
    title: "Collaborative Platform",
    description:
      "Engage with the research community through comments, annotations, and collaborative discussions on space biology findings.",
    badge: "Community",
    badgeVariant: "secondary" as const,
    highlights: [
      "Document Comments",
      "Research Notes",
      "Community Discussions",
    ],
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 px-4 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.12),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge
            variant="outline"
            className="text-emerald-300 border-emerald-300/50 mb-4"
          >
            Explore Features
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Explore NASA's
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text leading-relaxed text-transparent block">
              Space Biology Research
            </span>
          </h2>
          <p className="text-xl text-emerald-100/80 max-w-3xl mx-auto leading-relaxed">
            Access and analyze 608 NASA publications on space biology through
            our intelligent research dashboard with AI-powered tools designed
            for scientists and researchers.
          </p>
          <Separator className="max-w-24 mx-auto bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-1 rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={feature.id}
                className="group relative bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
              >
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur" />

                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 border border-emerald-400/30">
                      <IconComponent className="w-8 h-8 text-emerald-300 group-hover:text-emerald-200 transition-colors" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-emerald-200 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-emerald-100/80 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-emerald-300 mb-3">Key Features:</p>
                    <ul className="space-y-2">
                      {feature.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center text-emerald-100/90 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mr-3" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-6">
          <Separator className="max-w-32 mx-auto bg-emerald-600 mb-8" />
          <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">
            Ready to explore NASA's space biology research collection with
            advanced AI tools?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="px-8 py-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:opacity-90 text-[var(--primary-foreground)] font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/dashboard">
                Start Researching
              </Link>
            </Button>
            <Button
              variant={"outline"}
              className="px-8 py-6 border border-[var(--primary)] text-[var(--primary)] hover:text-[var(--primary-foreground)] hover:border-[var(--primary-foreground)] rounded-full transition-all duration-300"
              asChild
            >
              <Link to="/papers">
                Browse Papers
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
