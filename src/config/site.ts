/**
 * GAME BOX PC — configuração comercial central.
 * Preencha os campos abaixo. Campos vazios ("") NÃO aparecem na página pública.
 */
export const siteConfig = {
  /** URL única de checkout usada por TODOS os botões de compra. */
  checkoutUrl: "",
  /** Preço real, ex.: "R$ 97,00". Vazio = oculto. */
  price: "",
  /** Meios de pagamento aceitos, ex.: ["Pix", "Cartão de crédito"]. */
  paymentMethods: [] as string[],
  /** Funcionalidades confirmadas do software. */
  confirmedFeatures: [] as string[],
  licenseType: "",
  minRequirements: "",
  delivery: "",
  support: "",
  guarantee: "",
  /** WhatsApp com DDI, apenas números, ex.: "5581999999999". Vazio = botão oculto. */
  whatsappNumber: "",
  /** URL de vídeo para incorporar (YouTube embed, ex.: https://www.youtube.com/embed/ID). */
  videoEmbedUrl: "",
  /** Links legais. */
  privacyUrl: "",
  termsUrl: "",
  supportEmail: "",
  /** Avaliações reais. Se vazio, a seção fica oculta. */
  testimonials: [] as { name: string; text: string; rating?: number; verified?: boolean }[],
  /** Respostas do FAQ. Resposta vazia = "Informação em breve". */
  faq: [
    { q: "O que é o GAME BOX PC?", a: "Uma central gamer para computador que organiza e facilita o acesso aos seus jogos clássicos favoritos em uma interface moderna e visual." },
    { q: "Como funciona a central de jogos?", a: "" },
    { q: "Quais tipos de jogos e plataformas são compatíveis?", a: "" },
    { q: "O GAME BOX PC já acompanha jogos?", a: "" },
    { q: "Quais são os requisitos mínimos?", a: "" },
    { q: "Preciso de internet?", a: "" },
    { q: "Posso utilizar um controle?", a: "" },
    { q: "Como recebo o produto após a compra?", a: "" },
    { q: "Existe suporte técnico?", a: "" },
    { q: "Qual é a política de reembolso?", a: "" },
  ],
};

/** Mantém parâmetros UTM da visita ao enviar para o checkout. */
export function getCheckoutHref(): string {
  if (!siteConfig.checkoutUrl) return "#oferta";
  if (typeof window === "undefined") return siteConfig.checkoutUrl;
  try {
    const url = new URL(siteConfig.checkoutUrl);
    new URLSearchParams(window.location.search).forEach((v, k) => {
      if (k.startsWith("utm_") || k === "gclid" || k === "fbclid") url.searchParams.set(k, v);
    });
    return url.toString();
  } catch {
    return siteConfig.checkoutUrl;
  }
}

type Win = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void; dataLayer?: unknown[] };

/** Envia eventos para GA4 / Meta Pixel se estiverem instalados. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  w.gtag?.("event", event, params);
  if (event === "begin_checkout") w.fbq?.("track", "InitiateCheckout", params);
  else if (event === "view_item") w.fbq?.("track", "ViewContent", params);
  else w.fbq?.("trackCustom", event, params);
  w.dataLayer?.push({ event, ...params });
}
