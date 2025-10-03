import { Brain, Dna, FlaskConical, Leaf, Microscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
      className="py-24 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge
            variant="outline"
            className="text-blue-300 border-blue-300/50 mb-4"
          >
            Explore Features
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Explore NASA's
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text leading-relaxed text-transparent block">
              Space Biology Research
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Access and analyze 608 NASA publications on space biology through
            our intelligent research dashboard with AI-powered tools designed
            for scientists and researchers.
          </p>
          <Separator className="max-w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={feature.id}
                className="group relative bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur" />

                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30">
                      <IconComponent className="w-8 h-8 text-blue-300 group-hover:text-blue-200 transition-colors" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-blue-200 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-300 mb-3">
                      Key Features:
                    </p>
                    <ul className="space-y-2">
                      {feature.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-center text-slate-300 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mr-3" />
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
          <Separator className="max-w-32 mx-auto bg-slate-600 mb-8" />
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Ready to explore NASA's space biology research collection with
            advanced AI tools?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Researching
            </button>
            <button
              type="button"
              className="px-8 py-4 border border-slate-400 text-slate-300 hover:text-white hover:border-white rounded-full transition-all duration-300"
            >
              Browse Publications
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
