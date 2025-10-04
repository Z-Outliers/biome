import { ImageUp, Mic, SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchSheet from "../SearchSheet";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [fileData, setFileData] = useState<FormData | null>(null);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedImage) {
      const fd = new FormData();
      fd.append("file", selectedImage);
      setFileData(fd);
      setOpen(true);
      return;
    }

    const q = searchQuery.trim();
    if (!q) return;

    setSubmittedQuery(q);
    setOpen(true);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSearchQuery("");
      setSelectedImage(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setFileData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onChangeQuery = (value: string) => {
    if (fileData) {
      setFileData(null);
      setSelectedImage(null);
    }
    setSearchQuery(value);
  };

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full">
      <form onSubmit={handleSearch}>
        <div className="rounded-md p-[1px] transition-all duration-200 focus-within:shadow-[0_0_0_2px_color-mix(in_srgb,var(--primary)_10%,transparent)] focus-within:bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--primary)_35%,transparent),color-mix(in_srgb,var(--secondary)_25%,transparent),transparent)]">
          <div className="flex items-center gap-2 rounded-md border border-muted-foreground/20 bg-muted/50 px-3 h-10 w-full transition-colors focus-within:border-[color:color-mix(in_srgb,var(--primary)_45%,var(--border))]">
            <SearchIcon className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              type="search"
              placeholder="Search publications, authors, topics..."
              className="flex-1 h-8 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
              value={searchQuery}
              onChange={(e) => onChangeQuery(e.target.value)}
            />
            {/* Image preview badge */}
            {selectedImage && (
              <span
                className="inline-flex items-center gap-1 rounded-full border bg-background/80 px-1.5 py-0.5 text-xs text-muted-foreground shadow-sm"
                title="Image selected"
              >
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="h-5 w-5 rounded object-cover"
                />
                <span className="hidden sm:inline">Image</span>
                <button
                  type="button"
                  onClick={clearSelectedImage}
                  className="ml-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full hover:bg-muted"
                  aria-label="Remove image"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </span>
            )}

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
              onClick={() => {
                setIsListening((v) => !v);
                toast.warning("Coming soon!");
              }}
              aria-label="Voice message"
              title="Voice message"
            >
              <Mic
                className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`}
              />
            </Button>
            <Button type="submit" className="h-8" variant="default">
              Search
            </Button>
          </div>
        </div>
      </form>
      <SearchSheet
        open={open}
        setOpen={setOpen}
        query={submittedQuery || ""}
        fileData={fileData || undefined}
      />
    </div>
  );
}
