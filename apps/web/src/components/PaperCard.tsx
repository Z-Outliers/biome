import { ExternalLink, Link as LinkIcon } from "lucide-react";
import logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";
import type { PaperPreview } from "@/types/paper";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type PaperCardProps = {
  paper: PaperPreview;
  className?: string;
  maxTags?: number;
  maxAuthors?: number;
  detailsHref?: string;
};

export function PaperCard({
  paper,
  className,
  maxTags = 4,
  maxAuthors = 2,
  detailsHref,
}: PaperCardProps) {
  const shownTags = paper.tags.slice(0, maxTags);
  const extraTags = paper.tags.length - shownTags.length;
  const shownAuthors = paper.authors.slice(0, maxAuthors);
  const extraAuthors = paper.authors.length - shownAuthors.length;

  const detailsPath = detailsHref ?? `/dashboard/papers/${paper.id}`;

  return (
    <Card className={cn("overflow-hidden h-full", className)}>
      <CardHeader className="gap-3 sm:flex-row">
        <div className="sm:size-24 size-20 shrink-0 overflow-hidden rounded-md border bg-muted/30">
          {paper.thumbnail ? (
            <img
              src={paper.thumbnail}
              alt="Paper thumbnail"
              className="size-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <img
                src={logo}
                alt=""
                aria-hidden
                className="size-10 opacity-70"
              />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <Tooltip>
            <TooltipTrigger className="block text-left">
              <CardTitle className="line-clamp-2 text-balance text-lg">
                {paper.title}
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent className="max-w-[20rem] text-xs whitespace-normal break-words leading-snug">
              {paper.title}
            </TooltipContent>
          </Tooltip>
          <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-1.5 text-xs">
            <span>Authors:</span>
            <span className="truncate">
              {shownAuthors.join(", ")}
              {extraAuthors > 0 && (
                <Tooltip>
                  <TooltipTrigger className="text-foreground/80 underline underline-offset-2">
                    {` +${extraAuthors} more`}
                  </TooltipTrigger>
                  <TooltipContent>{paper.authors.join(", ")}</TooltipContent>
                </Tooltip>
              )}
            </span>
          </div>
        </div>
      </CardHeader>

      {paper.tags.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {shownTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="max-w-40 truncate"
              >
                <Tooltip>
                  <TooltipTrigger className="truncate">{tag}</TooltipTrigger>
                  <TooltipContent>{tag}</TooltipContent>
                </Tooltip>
              </Badge>
            ))}
            {extraTags > 0 && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge>+{extraTags} more</Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-64">
                  <div className="flex flex-wrap gap-1">
                    {paper.tags.slice(maxTags).map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>
      )}

      <Separator className="mx-6" />

      <CardFooter className="mt-auto flex flex-wrap justify-between gap-3">
        <div className="text-muted-foreground text-xs">
          <span>Source: </span>
          <a
            href={paper.originalUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground/90 underline underline-offset-4 hover:text-primary"
          >
            {new URL(paper.originalUrl).hostname}
          </a>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Button asChild>
            <a href={detailsPath} aria-label="View details">
              <LinkIcon />
              Learn More
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PaperCard;
