"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { BufferGeometry, MeshStandardMaterial } from "three";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MotoPart {
  name: string;
  label: string;
  service: string;
  serviceHref: string;
  color: number;
  position: [number, number, number];
  size: [number, number, number];
}

// ---------------------------------------------------------------------------
// Moto parts config — placeholder geometry
// Replace with actual segmented 3D model when sourced from Sketchfab
// ---------------------------------------------------------------------------

const MOTO_PARTS: MotoPart[] = [
  {
    name: "moteur",
    label: "Moteur",
    service: "Révision & Entretien",
    serviceHref: "/atelier#revision",
    color: 0x0050a0,
    position: [0, 0, 0],
    size: [1.2, 0.8, 0.6],
  },
  {
    name: "freins",
    label: "Freins",
    service: "Contrôle Technique",
    serviceHref: "/atelier#controle-technique",
    color: 0xb8943a,
    position: [-1.2, -0.4, 0.2],
    size: [0.6, 0.6, 0.2],
  },
  {
    name: "transmission",
    label: "Transmission",
    service: "Réparation & Diagnostic",
    serviceHref: "/atelier#reparation",
    color: 0x8a8070,
    position: [1.2, -0.3, 0.1],
    size: [0.8, 0.5, 0.4],
  },
  {
    name: "reservoir",
    label: "Réservoir",
    service: "Kit Éthanol eFlexMoto",
    serviceHref: "/atelier#kit-ethanol",
    color: 0x1a1a1a,
    position: [0, 0.7, 0],
    size: [1.0, 0.4, 0.5],
  },
];

// ---------------------------------------------------------------------------
// Labels overlay
// ---------------------------------------------------------------------------

interface PartLabelProps {
  label: string;
  service: string;
  serviceHref: string;
  visible: boolean;
  index: number;
}

function PartLabel({ label, service, serviceHref, visible, index }: PartLabelProps) {
  return (
    <div
      className={`absolute transition-all duration-500 pointer-events-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{
        left: `${20 + index * 22}%`,
        top: `${30 + (index % 2) * 20}%`,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative">
        {/* Connector line */}
        <div
          className="absolute -bottom-4 left-1/2 w-px h-4 bg-[var(--color-bleu-logo)]/60"
          aria-hidden="true"
        />
        {/* Label card */}
        <div className="bg-[var(--color-card)]/90 border border-[var(--color-bleu-logo)]/30 rounded-md px-3 py-2 backdrop-blur-sm pointer-events-auto">
          <p className="font-heading text-xs font-semibold text-[var(--color-bleu-logo)] uppercase tracking-wide">
            {label}
          </p>
          <Link
            href={serviceHref}
            className="font-sans text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
          >
            → {service}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function HeroParallax3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [labelsVisible, setLabelsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [assembled, setAssembled] = useState(false);
  const threeCleanup = useRef<(() => void) | null>(null);

  // WebGL detection
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Three.js setup
  useEffect(() => {
    if (!webglSupported || !canvasRef.current || !sectionRef.current) return;

    let animFrame: number;
    let gsapKill: (() => void) | null = null;

    async function init() {
      const THREE = await import("three");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const canvas = canvasRef.current;
      const section = sectionRef.current;
      if (!canvas || !section) return;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setClearColor(0x000000, 0);

      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(
        50,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0.5, 5);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
      keyLight.position.set(2, 3, 2);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0x0050a0, 0.5);
      rimLight.position.set(-3, 0, -2);
      scene.add(rimLight);

      // Build moto parts
      const partMeshes = MOTO_PARTS.map((part) => {
        const geo = new THREE.BoxGeometry(...part.size);
        const mat = new THREE.MeshStandardMaterial({
          color: part.color,
          metalness: 0.6,
          roughness: 0.3,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...part.position);
        mesh.userData = { basePosition: [...part.position] };
        scene.add(mesh);
        return mesh;
      });

      // Group wrapper for overall rotation
      const group = new THREE.Group();
      partMeshes.forEach((m) => {
        scene.remove(m);
        group.add(m);
      });
      scene.add(group);

      // GSAP ScrollTrigger timeline
      // Scroll 0%: assembled moto, parts at base position
      // Scroll 25-75%: parts float out with labels
      // Scroll 100%: reassemble + CTA

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);

            // Labels visible 20-80%
            setLabelsVisible(progress > 0.2 && progress < 0.8);

            // Assembled: 0-15% and 90-100%
            setAssembled(progress < 0.15 || progress > 0.9);
          },
        },
      });

      // Decompose parts outward
      MOTO_PARTS.forEach((part, i) => {
        const mesh = partMeshes[i];
        const spreadX = part.position[0] * 3.5;
        const spreadY = part.position[1] * 2 + 0.5;
        const spreadZ = part.position[2] * 2 - 1;

        tl.to(
          mesh.position,
          {
            x: spreadX,
            y: spreadY,
            z: spreadZ,
            duration: 0.4,
            ease: "power2.out",
          },
          0.1 + i * 0.05
        );
        tl.to(
          mesh.rotation,
          {
            y: (i % 2 === 0 ? 1 : -1) * Math.PI * 0.3,
            x: Math.PI * 0.1,
            duration: 0.4,
          },
          0.1 + i * 0.05
        );
      });

      // Reassemble
      MOTO_PARTS.forEach((part, i) => {
        const mesh = partMeshes[i];
        tl.to(
          mesh.position,
          {
            x: part.position[0],
            y: part.position[1],
            z: part.position[2],
            duration: 0.3,
            ease: "back.out(1.2)",
          },
          0.75 + i * 0.04
        );
        tl.to(
          mesh.rotation,
          { y: 0, x: 0, duration: 0.3 },
          0.75 + i * 0.04
        );
      });

      // Subtle group rotation during scroll
      tl.to(
        group.rotation,
        { y: Math.PI * 0.3, duration: 0.5, ease: "none" },
        0
      );
      tl.to(
        group.rotation,
        { y: 0, duration: 0.3, ease: "back.out(1)" },
        0.75
      );

      gsapKill = () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        gsap.killTweensOf([group.rotation, ...partMeshes.map((m) => m.position)]);
      };

      // Resize handler
      function handleResize() {
        if (!canvas) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
      window.addEventListener("resize", handleResize);

      // Animate loop
      let time = 0;
      function animate() {
        animFrame = requestAnimationFrame(animate);
        time += 0.01;
        // Subtle idle float when assembled
        if (scrollProgress < 0.15) {
          group.position.y = Math.sin(time * 0.8) * 0.05;
        }
        renderer.render(scene, camera);
      }
      animate();

      threeCleanup.current = () => {
        cancelAnimationFrame(animFrame);
        gsapKill?.();
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        partMeshes.forEach((m) => {
          (m.geometry as BufferGeometry).dispose();
          (m.material as MeshStandardMaterial).dispose();
        });
      };
    }

    init();

    return () => {
      threeCleanup.current?.();
    };
  }, [webglSupported]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fallback (no WebGL)
  if (!webglSupported) {
    return <HeroFallback />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[var(--color-background)]"
      aria-label="Hero — Anatomy of Speed"
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,80,160,${
              0.05 + scrollProgress * 0.15
            }), transparent)`,
          }}
        />
      </div>

      {/* Part labels overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden={!labelsVisible}
      >
        {MOTO_PARTS.map((part, i) => (
          <PartLabel
            key={part.name}
            label={part.label}
            service={part.service}
            serviceHref={part.serviceHref}
            visible={labelsVisible}
            index={i}
          />
        ))}
      </div>

      {/* Hero text overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        style={{
          opacity: assembled ? 1 : 0.2,
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Eyebrow */}
        <p className="font-heading text-sm md:text-base text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-6">
          Garage moto artisanal · Thonon-les-Bains
        </p>

        {/* Title */}
        <h1
          className="font-accent uppercase tracking-wider text-[var(--color-foreground)] leading-none mb-4"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
        >
          Mothome
        </h1>

        {/* Tagline */}
        <p className="font-heading text-xl md:text-3xl text-[var(--color-muted-foreground)] uppercase tracking-widest mb-8">
          La Mécanique comme{" "}
          <span className="text-[var(--color-bleu-logo)]">Passion</span>
        </p>

        {/* Description */}
        <p className="font-sans text-base md:text-lg text-[var(--color-muted-foreground)] max-w-xl mb-10 leading-relaxed">
          Atelier, service à domicile, accessoires, dépôt-vente — et un bar
          où les passionnés se retrouvent. Un concept unique dans le Chablais.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
          <Link
            href="/contact#rdv"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] text-white font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200 shadow-[var(--shadow-bleu)]"
          >
            Prendre rendez-vous
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/atelier"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] hover:border-[var(--color-muted-foreground)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
          >
            Découvrir l&apos;atelier
          </Link>
        </div>
      </div>

      {/* Phase indicator (scroll hint) */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-muted-foreground)] transition-opacity duration-300"
        style={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
        aria-hidden="true"
      >
        <span className="font-sans text-xs uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-bleu-logo)] transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />
    </section>
  );
}

// ---------------------------------------------------------------------------
// CSS Fallback (no WebGL / SSR)
// ---------------------------------------------------------------------------

function HeroFallback() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-background)]"
      aria-label="Hero — Mothome"
    >
      {/* Static cinematic background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(0,80,160,0.15),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-[var(--spacing-container)] text-center">
        <p className="font-heading text-sm md:text-base text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-6">
          Garage moto artisanal · Thonon-les-Bains
        </p>
        <h1
          className="font-accent uppercase tracking-wider text-[var(--color-foreground)] leading-none mb-4"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
        >
          Mothome
        </h1>
        <p className="font-heading text-xl md:text-3xl text-[var(--color-muted-foreground)] uppercase tracking-widest mb-8">
          La Mécanique comme{" "}
          <span className="text-[var(--color-bleu-logo)]">Passion</span>
        </p>
        <p className="font-sans text-base md:text-lg text-[var(--color-muted-foreground)] max-w-xl mx-auto mb-10 leading-relaxed">
          Atelier, service à domicile, accessoires, dépôt-vente — et un bar
          où les passionnés se retrouvent.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact#rdv"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] text-white font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
          >
            Prendre rendez-vous
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/atelier"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] hover:border-[var(--color-muted-foreground)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
          >
            Découvrir l&apos;atelier
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-muted-foreground)] animate-bounce" aria-hidden="true">
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
