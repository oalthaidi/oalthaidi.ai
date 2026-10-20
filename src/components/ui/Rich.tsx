import type { Rich as RichText } from "@/content/types";

/** Renders content text where some parts are emphasised. */
export function Rich({ value }: { value: RichText }) {
  return (
    <>
      {value.map((part, index) =>
        typeof part === "string" ? <span key={index}>{part}</span> : <em key={index}>{part.em}</em>,
      )}
    </>
  );
}
