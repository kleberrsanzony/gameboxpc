import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  Gamepad2, Zap, Joystick, Monitor, Menu, X, ChevronLeft, ChevronRight, Play, Check, Minus,
  FolderOpen, Sparkles, Library, Palette, Heart, Search, Settings, Home, Star, MessageCircle, ShieldCheck,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteConfig, track } from "@/config/site";
import { BuyButton, Reveal, SectionTitle } from "./shared";
import heroBox from "@/assets/hero_box.png.asset.json";
import feedBox from "@/assets/feed_a.png.asset.json";
import arcade from "@/assets/arcade_hall.jpg";
import controllers from "@/assets/controllers.jpg";
import setup from "@/assets/setup_mockup.jpg";

const NAV = [
  ["Como funciona", "#demo"],
  ["Benefícios", "#beneficios"],
  ["Categorias", "#categorias"],
  ["Oferta", "#oferta"],
  ["FAQ", "#faq"],
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 glass border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-extrabold">
          <Gamepad2 className="size-6 text-primary" />
          GAME BOX <span className="text-neon">PC</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="text-sm text-muted-foreground transition-colors hover:text-primary">{l}</a>
          ))}
          <Button asChild variant="neon" size="sm" className="animate-none"><a href="#oferta">Quero o meu</a></Button>
        </nav>
        <button className="md:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 px-4 pb-4 md:hidden" aria-label="Mobile">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-foreground hover:bg-muted">{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 10, y: ((e.clientY - r.top) / r.height - 0.5) * -10 });
  };
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-16 lg:min-h-screen lg:pt-28">
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="absolute size-1 rounded-full bg-primary animate-particle" style={{ left: `${(i * 37) % 100}%`, bottom: `${(i * 13) % 40}%`, animationDelay: `${i * 0.4}s` }} />
      ))}
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
        <div className="animate-rise text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Gamepad2 className="size-4" /> Sua central gamer retrô
          </span>
          <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[1.02] sm:text-6xl xl:text-7xl">
            Os clássicos que marcaram sua infância. <span className="text-neon">Agora no seu PC.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0">
            Reviva a nostalgia dos videogames com uma central gamer feita para organizar seus jogos favoritos em um só lugar. Uma experiência moderna para quem nunca deixou de ser gamer.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <div className="flex flex-col items-center gap-2 lg:items-start">
              <BuyButton label="Quero meu Game Box PC" location="hero" />
              <span className="text-xs text-muted-foreground">Conheça a oferta e veja como começar.</span>
            </div>
            <Button asChild variant="glass" size="xl"><a href="#demo">Veja como funciona</a></Button>
          </div>
        </div>
        <div className="relative animate-rise [animation-delay:200ms]" onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ perspective: 1200 }}>
          <div className="absolute -inset-10 rounded-full bg-neon opacity-30 blur-3xl" />
          <div className="animate-float">
            <img
              src={heroBox.url}
              alt="Arte promocional da embalagem GAME BOX PC com iluminação neon"
              width={1447}
              height={1087}
              fetchPriority="high"
              className="relative rounded-2xl shadow-neon transition-transform duration-300"
              style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
            />
          </div>
          <div className="mx-auto mt-2 h-6 w-3/4 rounded-full bg-primary/30 blur-2xl" />
        </div>
      </div>
    </section>
  );
}

function BenefitBar() {
  const items = [
    [Gamepad2, "Central de jogos organizada"],
    [Zap, "Acesso rápido aos seus favoritos"],
    [Joystick, "Experiência retrô"],
    [Monitor, "Desenvolvido para PC"],
  ] as const;
  return (
    <section className="mx-auto max-w-7xl px-4" aria-label="Diferenciais">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map(([Icon, t], i) => (
          <Reveal key={t} delay={i * 80} className="neon-border glass flex items-center gap-3 rounded-2xl p-4 sm:p-5">
            <Icon className="size-7 shrink-0 text-primary" />
            <span className="text-sm font-semibold sm:text-base">{t}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Nostalgia() {
  const eras = [
    ["Anos 80", "A era dos arcades", "Fichas, fliperamas e recordes disputados."],
    ["8-bit", "Os primeiros consoles", "O videogame chega à sala de casa."],
    ["16-bit", "A era de ouro", "Cores, trilhas e mundos inesquecíveis."],
    ["Evolução", "Novas gerações", "Gráficos 3D e jogos cada vez maiores."],
    ["Hoje", "Seus clássicos no PC", "Uma nova forma de organizar sua coleção."],
  ];
  return (
    <section className="relative mt-24 overflow-hidden py-24">
      <img src={arcade} alt="" aria-hidden loading="lazy" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 scanlines bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Nostalgia" title={<>A infância passou. <span className="text-neon">A vontade de jogar, não.</span></>} />
        <Reveal className="mx-auto max-w-2xl space-y-4 text-center text-lg text-muted-foreground">
          <p>Você se lembra daquela sensação de ligar o videogame, escolher seu jogo favorito e esquecer do tempo? Algumas experiências simplesmente nunca saem da memória.</p>
          <p>O GAME BOX PC foi pensado para quem quer reencontrar essa paixão, agora em uma central organizada e com uma apresentação moderna.</p>
        </Reveal>
        <ol className="relative mt-16 grid gap-4 md:grid-cols-5">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-neon md:block" />
          {eras.map(([tag, t, d], i) => (
            <Reveal key={tag} delay={i * 120} className="relative">
              <li className="glass h-full rounded-2xl p-5">
                <span className="mb-3 inline-block rounded-md bg-neon px-2 py-1 font-display text-xs font-bold uppercase">{tag}</span>
                <h3 className="font-bold">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const SCREENS = [
  { icon: Home, title: "Menu inicial", desc: "Uma tela de entrada visual para começar a jogar." },
  { icon: Library, title: "Biblioteca", desc: "Seus jogos reunidos em um só lugar." },
  { icon: FolderOpen, title: "Categorias", desc: "Navegue por estilos de jogo." },
  { icon: Search, title: "Busca", desc: "Encontre um título rapidamente." },
  { icon: Settings, title: "Configurações", desc: "Ajustes disponíveis na interface." },
];

function Demo() {
  const [i, setI] = useState(0);
  const go = (n: number) => {
    const next = (n + SCREENS.length) % SCREENS.length;
    setI(next);
    track("select_item", { location: "demo", item_name: SCREENS[next].title });
  };
  const S = SCREENS[i];
  return (
    <section id="demo" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Interface" title={<>Um universo de jogos. <span className="text-neon">Uma única central.</span></>} />
        <Reveal className="glass neon-border overflow-hidden rounded-3xl shadow-card">
          <div className="grid md:grid-cols-[220px_1fr]">
            <div className="flex gap-1 overflow-x-auto border-b border-border p-3 md:flex-col md:border-b-0 md:border-r" role="tablist">
              {SCREENS.map((s, n) => (
                <button key={s.title} role="tab" aria-selected={n === i} onClick={() => go(n)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${n === i ? "bg-neon font-semibold" : "text-muted-foreground hover:bg-muted"}`}>
                  <s.icon className="size-4" /> {s.title}
                </button>
              ))}
            </div>
            <div className="relative p-4 sm:p-6">
              <div className="relative overflow-hidden rounded-2xl">
                <img src={setup} alt="Demonstração ilustrativa de uma central de jogos em um monitor" loading="lazy" width={1600} height={912} className="aspect-video w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">Demonstração ilustrativa</span>
                <div className="absolute inset-x-3 bottom-3 glass flex items-center gap-3 rounded-xl p-3 sm:inset-x-6 sm:bottom-6 sm:p-4">
                  <S.icon className="size-8 shrink-0 text-primary" />
                  <div><p className="font-display font-bold">{S.title}</p><p className="text-sm text-muted-foreground">{S.desc}</p></div>
                </div>
                <button aria-label="Tela anterior" onClick={() => go(i - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full glass p-2"><ChevronLeft /></button>
                <button aria-label="Próxima tela" onClick={() => go(i + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full glass p-2"><ChevronRight /></button>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 flex justify-center"><BuyButton label="Quero conhecer o Game Box PC" location="demo" /></div>
      </div>
    </section>
  );
}

function Benefits() {
  const b = [
    [FolderOpen, "Tudo organizado", "Seus jogos e categorias em uma experiência centralizada."],
    [Sparkles, "Nostalgia à primeira vista", "Uma interface que valoriza o universo dos videogames clássicos."],
    [Library, "Sua biblioteca gamer", "Um ambiente para encontrar seus jogos com praticidade."],
    [Palette, "Uma experiência visual moderna", "Design pensado para unir estilo retrô e tecnologia atual."],
    [Heart, "Feito para apaixonados por jogos", "Uma central desenvolvida com foco na experiência do jogador."],
  ] as const;
  return (
    <section id="beneficios" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Benefícios" title={<>Menos complicação. <span className="text-neon">Mais tempo jogando.</span></>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {b.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 80} className={`neon-border glass group rounded-3xl p-7 transition-transform hover:-translate-y-1 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
              <div className="mb-5 inline-flex rounded-2xl bg-neon p-3 shadow-neon"><Icon className="size-6" /></div>
              <h3 className="text-xl font-bold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const CATS = [
  ["Plataforma", "Pule, corra e explore fases inesquecíveis.", "from-primary/50"],
  ["Corrida", "Velocidade, curvas e disputa até a linha de chegada.", "from-accent/50"],
  ["Luta", "Combos, rivais e duelos lendários.", "from-secondary/60"],
  ["Aventura", "Mundos para explorar e segredos para descobrir.", "from-success/40"],
  ["Arcade", "Partidas rápidas e a caça pelo recorde.", "from-primary/40"],
] as const;

function PixelArt({ seed }: { seed: number }) {
  const cells = Array.from({ length: 64 }, (_, n) => ((n * 7 + seed * 13) % 5 === 0 || (n * seed) % 11 === 1));
  return (
    <div className="grid grid-cols-8 gap-1 opacity-80">
      {cells.map((on, n) => <span key={n} className={`aspect-square rounded-[2px] ${on ? (n % 3 ? "bg-primary" : "bg-accent") : "bg-foreground/5"}`} />)}
    </div>
  );
}

function Categories() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 300, behavior: "smooth" });
  return (
    <section id="categorias" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Categorias" title={<>Qual é o seu <span className="text-neon">estilo de jogo?</span></>} />
        <div className="relative">
          <div ref={ref} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none]">
            {CATS.map(([t, d, g], i) => (
              <article key={t} onClick={() => track("select_item", { location: "categorias", item_category: t })}
                className={`neon-border group relative w-72 shrink-0 snap-start overflow-hidden rounded-3xl bg-gradient-to-br ${g} to-card p-6 transition-transform duration-500 hover:scale-[1.03]`}>
                <div className="transition-transform duration-500 group-hover:scale-110"><PixelArt seed={i + 2} /></div>
                <h3 className="mt-6 text-2xl font-extrabold uppercase">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-3">
            <button aria-label="Anterior" onClick={() => scroll(-1)} className="rounded-full glass p-3"><ChevronLeft /></button>
            <button aria-label="Próximo" onClick={() => scroll(1)} className="rounded-full glass p-3"><ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Compare() {
  const before = ["Jogos espalhados em diferentes pastas.", "Biblioteca difícil de navegar.", "Experiência visual pouco organizada."];
  const after = ["Uma central visual.", "Organização por jogos e categorias.", "Acesso aos recursos disponíveis pela interface.", "Experiência de navegação mais agradável."];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle title={<>Sua experiência gamer <span className="text-neon">merece um upgrade.</span></>} />
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="glass rounded-3xl p-8 opacity-90">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">Antes</p>
            <ul className="mt-6 space-y-4">{before.map((t) => <li key={t} className="flex gap-3 text-muted-foreground"><Minus className="mt-0.5 size-5 shrink-0 text-destructive" />{t}</li>)}</ul>
          </Reveal>
          <Reveal delay={120} className="neon-border glass rounded-3xl p-8 shadow-neon">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-neon">Com Game Box PC</p>
            <ul className="mt-6 space-y-4">{after.map((t) => <li key={t} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-success" />{t}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Video() {
  const [playing, setPlaying] = useState(false);
  const has = Boolean(siteConfig.videoEmbedUrl);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle eyebrow="Vídeo" title={<>Veja o Game Box PC <span className="text-neon">em ação</span></>} />
        <Reveal className="neon-border relative aspect-video overflow-hidden rounded-3xl shadow-card">
          {playing && has ? (
            <iframe src={`${siteConfig.videoEmbedUrl}?autoplay=1`} title="Vídeo do GAME BOX PC" allow="autoplay; encrypted-media; fullscreen" allowFullScreen className="h-full w-full" />
          ) : (
            <>
              <img src={controllers} alt="Controles clássicos iluminados em neon" loading="lazy" width={1600} height={912} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-background/40" />
              <button
                onClick={() => { if (has) { setPlaying(true); track("video_play"); } }}
                disabled={!has}
                aria-label={has ? "Reproduzir vídeo" : "Vídeo em breve"}
                className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neon shadow-neon animate-glow disabled:cursor-default sm:size-24"
              >
                <Play className="size-8 fill-current" />
              </button>
              {!has && <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">Imagem ilustrativa · vídeo em breve</span>}
            </>
          )}
        </Reveal>
        <p className="mt-4 text-center text-muted-foreground">Conheça a interface e veja a experiência na prática.</p>
      </div>
    </section>
  );
}

function Offer() {
  const c = siteConfig;
  const details = [
    ["Licença", c.licenseType], ["Requisitos mínimos", c.minRequirements], ["Entrega", c.delivery], ["Suporte", c.support], ["Garantia", c.guarantee],
  ].filter(([, v]) => v);
  return (
    <section id="oferta" className="relative scroll-mt-20 overflow-hidden py-24">
      <div className="absolute left-1/2 top-1/3 size-[600px] -translate-x-1/2 rounded-full bg-neon opacity-25 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionTitle eyebrow="Oferta" title={<>Sua próxima jornada gamer <span className="text-neon">começa aqui.</span></>} />
        <Reveal className="neon-border glass grid overflow-hidden rounded-[2rem] shadow-neon md:grid-cols-2">
          <div className="relative p-6">
            <img src={feedBox.url} alt="Embalagem GAME BOX PC" loading="lazy" width={1080} height={1350} className="mx-auto max-h-[480px] rounded-2xl object-contain animate-float" />
          </div>
          <div className="flex flex-col justify-center gap-5 p-8">
            <h3 className="text-4xl font-extrabold">GAME BOX <span className="text-neon">PC</span></h3>
            {c.confirmedFeatures.length > 0 && (
              <ul className="space-y-2">{c.confirmedFeatures.map((f) => <li key={f} className="flex gap-2"><Check className="size-5 text-success" />{f}</li>)}</ul>
            )}
            {details.length > 0 && (
              <dl className="grid gap-2 text-sm">{details.map(([k, v]) => <div key={k}><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>)}</dl>
            )}
            {c.price && <p className="font-display text-5xl font-extrabold">{c.price}</p>}
            {c.paymentMethods.length > 0 && <p className="text-sm text-muted-foreground">Pagamento: {c.paymentMethods.join(" · ")}</p>}
            {c.checkoutUrl ? (
              <>
                <BuyButton label="Sim, eu quero meu Game Box PC!" location="offer" className="w-full" />
                <p className="flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="size-4 text-success" /> Veja os detalhes da compra e finalize com segurança.</p>
              </>
            ) : (
              <div className="rounded-2xl glass p-5 text-center">
                <p className="font-display font-bold">Vendas abrindo em breve</p>
                <p className="mt-1 text-sm text-muted-foreground">Os detalhes da oferta serão publicados aqui.</p>
                {c.whatsappNumber && (
                  <Button asChild variant="glass" className="mt-4"><a href={`https://wa.me/${c.whatsappNumber}`} target="_blank" rel="noreferrer">Falar no WhatsApp</a></Button>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = siteConfig.testimonials;
  if (!t.length) return null;
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle title={<>Quem joga, <span className="text-neon">entende a experiência.</span></>} />
        <div className="grid gap-5 md:grid-cols-3">
          {t.map((x) => (
            <Reveal key={x.name} className="glass rounded-3xl p-6">
              {x.rating && <div className="flex gap-1 text-primary">{Array.from({ length: x.rating }).map((_, n) => <Star key={n} className="size-4 fill-current" />)}</div>}
              <p className="mt-3">“{x.text}”</p>
              <p className="mt-4 font-semibold">{x.name}{x.verified && <span className="ml-2 text-xs text-success">Compra verificada</span>}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle eyebrow="FAQ" title="Perguntas frequentes" />
        <Accordion type="single" collapsible className="space-y-3">
          {siteConfig.faq.map((f, n) => (
            <AccordionItem key={f.q} value={`q${n}`} className="glass rounded-2xl border-none px-5">
              <AccordionTrigger className="text-left font-display font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a || "Informação em breve. Se precisar de ajuda agora, fale com nosso atendimento."}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28">
      <img src={arcade} alt="" aria-hidden loading="lazy" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <Reveal className="text-center lg:text-left">
          <h2 className="text-4xl font-extrabold uppercase leading-tight sm:text-6xl">A diversão <span className="text-neon">não ficou no passado.</span></h2>
          <p className="mt-6 text-lg text-muted-foreground">Seu universo gamer merece um lugar especial. Conheça o GAME BOX PC e leve a nostalgia para uma nova experiência no computador.</p>
          <div className="mt-8"><BuyButton label="Garantir meu Game Box PC" location="final" /></div>
        </Reveal>
        <Reveal delay={150} className="relative">
          <div className="absolute -inset-8 rounded-full bg-neon opacity-30 blur-3xl" />
          <img src={heroBox.url} alt="Embalagem GAME BOX PC" loading="lazy" width={1447} height={1087} className="relative rounded-2xl shadow-neon animate-float" />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const c = siteConfig;
  const links = [["Política de privacidade", c.privacyUrl], ["Termos de uso", c.termsUrl], ["Suporte", c.supportEmail && `mailto:${c.supportEmail}`]].filter(([, h]) => h);
  return (
    <footer className="border-t border-border pb-28 pt-10 md:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
        <p className="font-display font-bold text-foreground">GAME BOX <span className="text-neon">PC</span></p>
        {links.length > 0 && <nav className="flex gap-5">{links.map(([l, h]) => <a key={l} href={h} className="hover:text-primary">{l}</a>)}</nav>}
        <p className="max-w-md text-xs">Produto independente, sem afiliação com fabricantes de consoles ou editoras de jogos. Imagens de demonstração são ilustrativas.</p>
      </div>
    </footer>
  );
}

function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 glass border-x-0 border-b-0 p-3 md:hidden">
      <BuyButton label="Quero meu Game Box PC" location="sticky_mobile" className="h-12 w-full text-sm" />
    </div>
  );
}

function WhatsApp() {
  if (!siteConfig.whatsappNumber) return null;
  return (
    <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"
      onClick={() => track("whatsapp_click")}
      className="fixed bottom-24 right-4 z-40 rounded-full bg-success p-4 text-primary-foreground shadow-neon md:bottom-6">
      <MessageCircle />
    </a>
  );
}

export function Landing() {
  useEffect(() => { track("view_item", { item_name: "GAME BOX PC" }); }, []);
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <BenefitBar />
        <Nostalgia />
        <Demo />
        <Benefits />
        <Categories />
        <Compare />
        <Video />
        <Offer />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
      <WhatsApp />
    </div>
  );
}
