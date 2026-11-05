import { useEffect, useRef, type ReactNode } from "react";
import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCheckoutHref, siteConfig, track } from "@/config/site";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function BuyButton({ label, location, className }: { label: string; location: string; className?: string }) {
  const external = Boolean(siteConfig.checkoutUrl);
  return (
    <Button asChild variant="neon" size="xl" className={cn("whitespace-normal text-center", className)}>
      <a
        href={external ? siteConfig.checkoutUrl || "#oferta" : "#oferta"}
        onClick={(e) => {
          track(external ? "begin_checkout" : "select_item", { location, item_name: "GAME BOX PC" });
          if (external) {
            e.preventDefault();
            window.location.href = getCheckoutHref();
          }
        }}
      >
        <Gamepad2 />
        {label}
      </a>
    </Button>
  );
}

export function SectionTitle({ eyebrow, title, className }: { eyebrow?: string; title: ReactNode; className?: string }) {
  return (
    <Reveal className={cn("mx-auto mb-12 max-w-3xl text-center", className)}>
      {eyebrow && (
        <span className="mb-4 inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-extrabold uppercase leading-tight sm:text-5xl">{title}</h2>
    </Reveal>
  );
}
