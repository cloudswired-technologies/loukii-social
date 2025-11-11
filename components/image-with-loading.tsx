"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function ImageWithLoading({ 
  src, 
  alt, 
  fill, 
  width, 
  height, 
  className = "",
  priority = false 
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 animate-shimmer rounded-lg ${fill ? '' : `w-[${width}px] h-[${height}px]`}`} />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  );
}
