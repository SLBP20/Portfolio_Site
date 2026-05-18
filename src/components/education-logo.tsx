"use client";

import Image from "next/image";
import { useState } from "react";

type EducationLogoProps = {
  src: string;
  alt: string;
  fallback: string;
};

export function EducationLogo({ src, alt, fallback }: EducationLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-22 w-22 items-center justify-center rounded-full border border-[rgba(95,135,199,0.25)] bg-[rgba(95,135,199,0.08)] font-[var(--font-heading)] text-3xl text-[var(--foreground)]">
        {fallback}
      </div>
    );
  }

  return (
    <div className="relative flex h-22 w-22 items-center justify-center overflow-hidden rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="88px"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
