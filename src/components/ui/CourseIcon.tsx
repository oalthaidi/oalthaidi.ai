import type { CourseIcon as IconName } from "@/content/types";

/** Line icons for the four programme audiences, drawn in the mark's geometric style. */
export function CourseIcon({ name }: { name: IconName }) {
  return (
    <svg className="course-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      {name === "employee" && (
        <>
          <rect x="12" y="12" width="24" height="24" rx="2" transform="rotate(45 24 24)" />
          <circle cx="24" cy="24" r="5" fill="currentColor" />
        </>
      )}
      {name === "enterprise" && (
        <>
          <path d="M6 38 L18 26 L26 32 L42 12" />
          <path d="M34 12 H42 V20" />
        </>
      )}
      {name === "teacher" && (
        <>
          <path d="M6 18 L24 9 L42 18 L24 27 Z" />
          <path d="M14 22 V32 C14 36 34 36 34 32 V22" />
        </>
      )}
      {name === "individual" && (
        <>
          <path d="M10 34 L24 10 L38 34" />
          <path d="M16 34 L24 20 L32 34" />
        </>
      )}
    </svg>
  );
}
