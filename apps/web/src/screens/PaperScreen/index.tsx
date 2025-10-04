import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronsLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPaperQuery } from "@/api/queries/paperQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { renderSafeHtml } from "@/helpers/renderHtml";

export default function PaperScreen() {
  const params = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(getPaperQuery(params.paperId || ""));

  // Collapsible TOC state: open on large screens, collapsed on small
  const [tocOpen, setTocOpen] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSmall = window.matchMedia("(max-width: 1024px)").matches; // lg breakpoint
      setTocOpen(!isSmall);
    }
  }, []);

  // Minimal client-side sanitizer: strip scripts/styles and inline event handlers
  const sanitized = useMemo(() => {
    const html = data?.content || "";
    try {
      const doc = new DOMParser().parseFromString(html, "text/html");
      doc.querySelectorAll("script,style").forEach((el) => {
        el.remove();
      });
      doc.querySelectorAll("*").forEach((el) => {
        // Remove on* event handler attributes
        Array.from(el.attributes).forEach((attr) => {
          if (/^on/i.test(attr.name)) {
            el.removeAttribute(attr.name);
          }
        });
      });
      return doc.body.innerHTML;
    } catch {
      return html;
    }
  }, [data?.content]);

  // Build a simple Table of Contents and inject missing IDs into headings
  const { htmlWithIds, toc } = useMemo(() => {
    const container = document.createElement("div");
    container.innerHTML = sanitized;
    const seen = new Set<string>();
    const items: { id: string; text: string; level: number }[] = [];
    const headingEls = Array.from(
      container.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ) as HTMLHeadingElement[];

    const slugify = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 64) || "section";

    headingEls.forEach((el, i) => {
      const text = (el.textContent || `Section ${i + 1}`).trim();
      const id = el.getAttribute("id") || slugify(text);
      let unique = id;
      let n = 2;
      while (seen.has(unique)) {
        unique = `${id}-${n++}`;
      }
      seen.add(unique);
      el.setAttribute("id", unique);
      items.push({ id: unique, text, level: Number(el.tagName.substring(1)) });
    });

    return { htmlWithIds: container.innerHTML, toc: items };
  }, [sanitized]);

  if (!params.paperId) {
    navigate("/dashboard/papers");
    return null;
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Paper Details</h1>
        <p className="text-muted-foreground">
          Detailed view of the selected research paper
        </p>
      </div>

      {/* Slim opener when TOC is collapsed */}
      {toc.length > 0 && !tocOpen && (
        <button
          type="button"
          className="fixed right-4 top-24 z-20 rounded-l-md border bg-muted/40 px-2 py-2 shadow-sm backdrop-blur-sm hover:bg-muted/60"
          aria-label="Open table of contents"
          onClick={() => setTocOpen(true)}
        >
          <div className="flex flex-col items-center gap-1">
            <ChevronsLeft className="h-4 w-4" />
            <span className="text-[10px] font-semibold">TOC</span>
          </div>
        </button>
      )}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className={tocOpen ? "lg:col-span-9" : "lg:col-span-12"}>
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-xl">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rich-content">{renderSafeHtml(htmlWithIds)}</div>
            </CardContent>
          </Card>
        </div>

        {toc.length > 0 && tocOpen && (
          <aside className="lg:col-span-3">
            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto rounded-lg border bg-muted/30 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <span>On this page</span>
                <button
                  type="button"
                  className="inline-flex h-7 items-center gap-1 rounded border px-2 text-[11px] font-medium text-foreground/70 hover:bg-muted/60"
                  aria-expanded={tocOpen}
                  aria-controls="toc-list"
                  onClick={() => setTocOpen((v) => !v)}
                >
                  <span className="hidden sm:inline">
                    {tocOpen ? "Collapse" : "Expand"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${tocOpen ? "rotate-0" : "-rotate-90"}`}
                  />
                </button>
              </div>
              {tocOpen && (
                <nav aria-label="Table of contents">
                  <ul id="toc-list" className="space-y-1.5">
                    {toc.map((item) => (
                      <li key={item.id} className="leading-snug">
                        <a
                          href={`#${item.id}`}
                          className="block rounded px-2 py-1 text-sm text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground"
                          style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
