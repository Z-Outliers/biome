import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { Link } from "react-router";
import { searchPapersQuery } from "@/api/queries/paperQueries";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  query: string;
};

export default function SearchSheet({ open, setOpen, query }: Props) {
  const { data, isLoading } = useQuery(searchPapersQuery(query));

  if (!query) return null;

  console.log(data);

  const truncate = (s: string, n = 140) => {
    if (!s) return "";
    if (s.length <= n) return s;
    const sub = s.slice(0, n);
    const lastSpace = sub.lastIndexOf(" ");
    return (lastSpace > n * 0.6 ? sub.slice(0, lastSpace) : sub) + "…";
  };

  const formatAuthors = (authors: string[], max = 3) => {
    if (!authors?.length) return "";
    if (authors.length <= max) return authors.join(", ");
    const more = authors.length - max;
    return `${authors.slice(0, max).join(", ")}, +${more} more`;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className="dashboard-theme h-[80vh] w-full max-w-none sm:rounded-t-lg"
      >
        <SheetHeader className="sticky top-0 z-10 bg-background/80 backdrop-blur p-4 pb-2">
          <SheetTitle>Results{query ? ` for "${query}"` : ""}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4 pt-3 space-y-6">
          {/* Summary section (special styling) */}
          <div className="rounded-lg p-[1px] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
            <Card className="rounded-lg bg-background">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[color:var(--primary)]" />
                  <CardTitle>Summary</CardTitle>
                </div>
                {!isLoading && query && (
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
                      Here's a concise overview of the most relevant information
                      related to{" "}
                      <span className="font-medium text-foreground">
                        "{query}"
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
            <h3 className="text-xs uppercase tracking-wide text-muted-foreground/80">
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
                {data?.papers.map((doc) => (
                  <Link
                    key={doc.id}
                    onClick={() => setOpen(false)}
                    to={`/dashboard/papers/${doc.id}`}
                    className="block"
                  >
                    <Card className="hover:bg-muted/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md border bg-muted">
                            {doc.thumbnail ? (
                              <img
                                src={doc.thumbnail}
                                alt={`${doc.title} thumbnail`}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="grid h-full w-full place-items-center text-[10px] text-muted-foreground/60">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-base leading-snug line-clamp-2">
                              {doc.title}
                            </CardTitle>
                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                              {truncate(doc.abstract, 140)}
                            </p>
                            <div
                              className="mt-2 truncate text-xs text-muted-foreground/80"
                              title={doc.authors.join(", ")}
                            >
                              {formatAuthors(doc.authors, 3)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
