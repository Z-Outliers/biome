import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, ImageUp, Mic, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSubmittedQuery(searchQuery.trim());
    setIsLoading(true);
    setOpen(true);
    // UI-only: simulate a short loading state
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // UI-only: reflect chosen file name in the input for now
      const base = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      setSearchQuery(base);
    }
  };

  const toggleMic = () => setIsListening((v) => !v);

  const documents = submittedQuery
    ? Array.from({ length: 5 }).map((_, i) => ({
        id: i + 1,
        title: `Relevant document ${i + 1} for "${submittedQuery}"`,
        snippet:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        source: i % 2 === 0 ? "arXiv" : "PubMed",
        year: 2020 + ((i * 3) % 5),
      }))
    : [];

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full">
      <form onSubmit={handleSearch}>
        <div className="flex items-center gap-2 rounded-md border border-muted-foreground/20 bg-muted/50 px-3 h-10 w-full">
          <SearchIcon className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            type="search"
            placeholder="Search publications, authors, topics..."
            className="flex-1 h-8 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Right action buttons */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelected}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={handleUploadClick}
            aria-label="Upload image"
            title="Upload image"
          >
            <ImageUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={isListening ? "default" : "ghost"}
            onClick={toggleMic}
            aria-label="Voice message"
            title="Voice message"
          >
            <Mic className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`} />
          </Button>
          <Button type="submit" className="h-8" variant="default">
            Search
          </Button>
        </div>
      </form>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="dashboard-theme h-[80vh] w-full max-w-none sm:rounded-t-lg"
        >
          <SheetHeader className="p-4 pb-2">
            <SheetTitle>
              Results{submittedQuery ? ` for "${submittedQuery}"` : ""}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4 pt-2 space-y-6">
            {/* Summary section (special styling) */}
            <div className="rounded-lg p-[1px] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
              <Card className="rounded-lg bg-background">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[color:var(--primary)]" />
                    <CardTitle>Summary</CardTitle>
                  </div>
                  {!isLoading && submittedQuery && (
                    <p className="text-xs text-muted-foreground">
                      Auto-generated overview
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Here's a concise overview of the most relevant
                        information related to{" "}
                        <span className="font-medium text-foreground">
                          "{submittedQuery}"
                        </span>
                        . This section will summarize key findings, trends, and
                        noteworthy references.
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="border border-[var(--primary)] text-[color:var(--primary)] bg-transparent">
                          Key Finding
                        </Badge>
                        <Badge className="border border-[var(--primary)] text-[color:var(--primary)] bg-transparent">
                          Top Author
                        </Badge>
                        <Badge className="border border-[var(--primary)] text-[color:var(--primary)] bg-transparent">
                          Trending Topic
                        </Badge>
                      </div>

                      {/* Confidence meter */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          Confidence
                        </span>
                        <div className="h-2 flex-1 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-[var(--primary)]"
                            style={{ width: "72%" }}
                          />
                        </div>
                        <span className="text-xs font-medium text-foreground">
                          72%
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Documents list */}
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Documents
              </h3>
              {isLoading ? (
                <div className="grid gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <div className="h-5 bg-muted rounded w-1/2 mb-2" />
                      <div className="h-4 bg-muted rounded w-full mb-1" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-3">
                  {documents.map((doc) => (
                    <Card
                      key={doc.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base leading-snug">
                            {doc.title}
                          </CardTitle>
                          <Badge variant="secondary">{doc.source}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <p className="line-clamp-2">{doc.snippet}</p>
                        <div className="mt-3 text-xs text-muted-foreground/80">
                          {doc.year}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
