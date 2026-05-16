"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "main" | "aside";
}

const directionTransform: Record<Direction, string> = {
  up: "translate3d(0, var(--motion-distance), 0)",
  down: "translate3d(0, calc(-1 * var(--motion-distance)), 0)",
  left: "translate3d(var(--motion-distance), 0, 0)",
  right: "translate3d(calc(-1 * var(--motion-distance)), 0, 0)",
  none: "none",
};

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 500,
  distance = 16,
  className,
  as: Tag = "div",
}: FadeInProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const Component = Tag as React.ElementType;

  const style: CSSProperties = {
    "--motion-distance": `${distance}px`,
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "var(--ease-out-quart)",
    transitionProperty: "opacity, transform",
    transform: inView ? "translate3d(0, 0, 0)" : directionTransform[direction],
    opacity: inView ? 1 : 0,
    willChange: inView ? "auto" : "opacity, transform",
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      className={cn("motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100", className)}
      style={style}
    >
      {children}
    </Component>
  );
}
