"use client";

import { useState } from "react";
import Image from "next/image";

interface AvatarPairProps {
  size: number;
}

export function AvatarPair({ size }: AvatarPairProps) {
  const [swapped, setSwapped] = useState(false);
  const overlap = Math.round(size * 0.5);
  const totalWidth = size + overlap;

  return (
    <div
      className="relative cursor-pointer"
      style={{ height: size, width: totalWidth }}
      onClick={() => setSwapped((s) => !s)}
      onMouseEnter={() => setSwapped(true)}
      onMouseLeave={() => setSwapped(false)}
    >
      <Image
        src="/images/profile.jpg"
        alt="Mali Franzese"
        width={size}
        height={size}
        className="absolute top-0 rounded-full border-2 transition-all duration-500 ease-in-out"
        style={{
          left: swapped ? overlap : 0,
          zIndex: swapped ? 0 : 1,
          borderColor: swapped ? "var(--bg)" : "var(--border)",
        }}
        priority
      />
      <Image
        src="/images/avatar.jpg"
        alt="Mali Franzese avatar"
        width={size}
        height={size}
        className="absolute top-0 rounded-full border-2 transition-all duration-500 ease-in-out"
        style={{
          left: swapped ? 0 : overlap,
          zIndex: swapped ? 1 : 0,
          borderColor: swapped ? "var(--border)" : "var(--bg)",
        }}
        priority
      />
    </div>
  );
}
