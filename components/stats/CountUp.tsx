"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

function format(value: number, decimals: number): string {
  return decimals > 0 ? value.toFixed(decimals) : String(Math.floor(value));
}

export function CountUp({
  end,
  duration = 1.8,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      ref.current.textContent = `${prefix}${format(end, decimals)}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: end,
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${format(obj.val, decimals)}${suffix}`;
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [end, duration, prefix, suffix, decimals]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${prefix}${format(end, decimals)}${suffix}`}
    >
      {prefix}
      {format(0, decimals)}
      {suffix}
    </span>
  );
}
