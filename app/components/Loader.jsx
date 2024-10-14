import React from "react";
import Image from "next/image";

export default function Loader({ isLoading, gifSrc, size, alt }) {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
      role="alert"
      aria-busy="true"
    >
      <div className="text-center">
        <Image
          src={gifSrc}
          width={size}
          height={size}
          alt={alt}
          className="mx-auto"
        />
        <p className="mt-2 text-sm text-muted-foreground">{alt}</p>
      </div>
    </div>
  );
}
