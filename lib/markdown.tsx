import React from "react";

const HIGHLIGHT_MAP: Record<"bold" | "italic", string> = {
  bold: "text-foreground font-semibold",
  italic: "text-foreground/80 italic font-serif font-light",
};

function parseInline(text: string): React.ReactNode {
  const regex = /\*\*(.*?)\*\*|\*(.*?)\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const isBold = match[1] !== undefined;
    const styleKey = isBold ? "bold" : "italic";
    const matchedText = isBold ? match[1] : match[2];

    parts.push(
      <span key={match.index} className={HIGHLIGHT_MAP[styleKey]}>
        {matchedText}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export function parseMarkdown<T>(data: T): T {
  if (typeof data === "string") {
    // Return early if there is no formatting or line breaks to process
    if (!/\*{1,2}[^*]+\*{1,2}/.test(data) && !data.includes("\n\n")) {
      return data;
    }

    const paragraphs = data.split("\n\n");

    return (
      <>
        {paragraphs.map((p, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <>
                <br />
                <br />
              </>
            )}
            {parseInline(p)}
          </React.Fragment>
        ))}
      </>
    ) as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => parseMarkdown(item)) as unknown as T;
  }

  if (typeof data === "object" && data !== null) {
    const result = {} as Record<string, unknown>;
    const obj = data as Record<string, unknown>;

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = parseMarkdown(obj[key]);
      }
    }

    return result as unknown as T;
  }

  return data;
}