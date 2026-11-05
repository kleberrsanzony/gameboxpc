import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

const title = "GAME BOX PC — Os clássicos da sua infância, agora no seu PC";
const description =
  "Central gamer retrô para PC: organize seus jogos clássicos favoritos em uma interface moderna, visual e nostálgica.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "GAME BOX PC",
          applicationCategory: "GameApplication",
          operatingSystem: "Windows",
          description,
        }),
      },
    ],
  }),
  component: Landing,
});
