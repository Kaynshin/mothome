"use client";

import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface StaggerProps {
  children: ReactNode;
  direction?: Direction;
  stagger?: number;
  initialDelay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  as?: "div" | "section" | "ul" | "ol";
}

const directionTransform: Record<Direction, string> = {
  up: "translate3d(0, var(--motion-distance), 0)",
  down: "translate3d(0, calc(-1 * var(--motion-distance)), 0)",
  left: "translate3d(var(--motion-distance), 0, 0)",
  right: "translate3d(calc(-1 * var(--motion-distance)), 0, 0)",
  none: "none",
};

export function Stagger({
  children,
  direction = "up",
  stagger = 70,
  initialDelay = 0,
  duration = 500,
  distance = 16,
  className,
  as: Tag = "div",
}: StaggerProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const items = Children.toArray(children);
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={className}
    >
      {items.map((child, index) => {
        const delay = initialDelay + index * stagger;
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

        if (isValidElement(child)) {
          const element = child as ReactElement<{
            style?: CSSProperties;
            className?: string;
          }>;
          return cloneElement(element, {
            key: element.key ?? index,
            style: { ...style, ...(element.props.style ?? {}) },
            className: cn(
              "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
              element.props.className
            ),
          });
        }

        return (
          <div
            key={index}
            className="motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100"
            style={style}
          >
            {child}
          </div>
        );
      })}
    </Component>
  );
}
