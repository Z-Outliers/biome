import { type ReactNode, useEffect, useMemo, useState } from "react";
import logo from "@/assets/logo.svg";

type LoadingOverlayProps = {
  show: boolean;
  text?: string;
  fullscreen?: boolean;
  children?: ReactNode;
};

export default function LoadingOverlay({
  show,
  text = "Loading...",
  fullscreen = true,
  children,
}: LoadingOverlayProps) {
  const FADE_MS = 250;
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) {
      setRender(true);
      return;
    }
    const t = setTimeout(() => setRender(false), FADE_MS);
    return () => clearTimeout(t);
  }, [show]);

  const overlay = useMemo(() => {
    const position = fullscreen ? "fixed" : "absolute";
    const opacityClass = show ? "opacity-100" : "opacity-0";
    const pointerClass = show ? "pointer-events-auto" : "pointer-events-none";

    return (
      <div
        aria-busy={show}
        aria-live="polite"
        aria-hidden={!show}
        className={`${pointerClass} ${opacityClass} inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm cursor-wait transition-opacity duration-200 ease-out`}
        style={{ position }}
      >
        <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-background/90 px-4 py-2 shadow-lg">
          <div className="relative h-6 w-6">
            <svg
              className="absolute inset-0 h-6 w-6 animate-spin text-primary"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <img
              src={logo}
              alt=""
              aria-hidden
              className="relative h-6 w-6 drop-shadow-sm"
            />
          </div>
          {text && (
            <>
              <span className="text-sm text-foreground/90" aria-hidden>
                {text}
              </span>
              <span className="sr-only">{text}</span>
            </>
          )}
        </div>
      </div>
    );
  }, [fullscreen, show, text]);

  if (fullscreen) {
    return (
      <>
        {children}
        {render ? overlay : null}
      </>
    );
  }

  return (
    <div className="relative">
      {children}
      {render ? overlay : null}
    </div>
  );
}
