/**
 * Leboncoin stock fetcher — Dépôt-vente MOT'HOME.
 *
 * Récupère via Firecrawl la liste des 9 dernières annonces motos publiées
 * par MOT'HOME sur Leboncoin (recherche pré-filtrée Haute-Savoie). Utilisé
 * par app/depot-vente/page.tsx avec ISR (revalidate=604800, 1 semaine).
 *
 * Source de vérité = URL de recherche pré-filtrée Leboncoin :
 * https://www.leboncoin.fr/recherche?category=3&text=Mot%27Home&locations=dn_74
 *
 * Resilience : si Firecrawl échoue (API down, Datadome captcha, parsing
 * cassé, validation Zod KO), on retourne FALLBACK_MOTOS — les 9 dernières
 * connues hardcodées. Le site ne casse jamais.
 *
 * Optimisation credits : on commence par scraper la recherche (1 call),
 * on compare le set d'IDs avec ce qui est en mémoire ; si identique,
 * on retourne directement le cache courant sans re-scraper les détails.
 * Quand stock change : 1 call recherche + 9 calls détails = 10 calls.
 */

import { z } from "zod";

export const LEBONCOIN_SEARCH_URL =
  "https://www.leboncoin.fr/recherche?category=3&text=Mot%27Home&locations=dn_74&owner_type=pro&sort=time&order=desc";

const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v2/scrape";
const MAX_MOTOS = 9;
const MIN_MOTOS = 3;
// Pool de candidats à fetcher depuis la recherche. Plus grand que
// MAX_MOTOS car on filtre ensuite par mention MOT'HOME (la recherche
// LBC peut inclure des annonces voisines hors vendeur).
const CANDIDATE_POOL = 15;

// ---------------------------------------------------------------------------
// Schema (Zod)
// ---------------------------------------------------------------------------

export const MotoSchema = z.object({
  id: z.string().regex(/^\d+$/),
  marque: z.string().min(1),
  modele: z.string().min(1),
  annee: z.number().int().min(1900).max(2100),
  km: z.string().regex(/\d/),
  prix: z.string().regex(/€/),
  cylindree: z.string().optional(),
  photo: z
    .string()
    .url()
    .refine((u) => u.startsWith("https://img.leboncoin.fr/")),
  lbcUrl: z
    .string()
    .url()
    .refine((u) => u.startsWith("https://www.leboncoin.fr/ad/motos/")),
  ville: z.string().optional(),
  /** Date de publication ISO (YYYY-MM-DD) — extraite du markdown LBC. */
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  disponible: z.literal(true).default(true),
});

export type Moto = z.infer<typeof MotoSchema>;

const MotosSchema = z.array(MotoSchema).min(MIN_MOTOS).max(MAX_MOTOS);

// ---------------------------------------------------------------------------
// Fallback hardcodé : 9 dernières annonces MOT'HOME au 2026-05-18.
// Sert quand Firecrawl est indisponible OU quand FIRECRAWL_API_KEY absente.
// ---------------------------------------------------------------------------

// Ordre = publication date DESC (le plus récent en premier).
export const FALLBACK_MOTOS: readonly Moto[] = [
  // Aprilia Caponord 3191396957 retirée — annonce publiée par "lascap"
  // (autre vendeur pro), pas par MOT'HOME. La description mentionne
  // "En dépôt vente chez MOT'HOME" comme info historique mais le profil
  // pro vendeur dans le footer LBC n'est pas MOT'HOME.
  // Faux positif exclu via isMothomeAd() (heading "## MOT'HOME" absent).
  {
    id: "3188337073",
    marque: "Piaggio",
    modele: "MP3 530 HPE Exclusive",
    annee: 2023,
    km: "7 000 km",
    prix: "8 500 €",
    cylindree: "530 cc",
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/59/b4/7d/59b47d289bd3d9313ec7653ef4bc9beff877bc29.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3188337073",
    ville: "Thonon-les-Bains",
    publishedAt: "2026-04-29",
    disponible: true,
  },
  {
    id: "3188246799",
    marque: "Yamaha",
    modele: "MT-09",
    annee: 2013,
    km: "32 665 km",
    prix: "5 000 €",
    cylindree: "850 cc",
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/3d/b5/2d/3db52db32cd8e1167006305cdd0b67d20229ee16.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3188246799",
    ville: "Thonon-les-Bains",
    publishedAt: "2026-04-29",
    disponible: true,
  },
  {
    id: "3188229988",
    marque: "Honda",
    modele: "VFR 750",
    annee: 1998,
    km: "14 000 km",
    prix: "3 500 €",
    cylindree: "750 cc",
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/2c/27/db/2c27db9baaf3faf57e3682ed352d373fd5112240.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3188229988",
    ville: "Thonon-les-Bains",
    publishedAt: "2026-04-29",
    disponible: true,
  },
  {
    id: "3136329734",
    marque: "Moto Guzzi",
    modele: "V7 Stone",
    annee: 2013,
    km: "15 483 km",
    prix: "4 000 €",
    cylindree: "750 cc",
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/fc/fa/2e/fcfa2e36a5db650c2c47d062f5e1d8512da6bd6b.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3136329734",
    ville: "Thonon-les-Bains",
    publishedAt: "2026-04-25",
    disponible: true,
  },
  {
    id: "3136020613",
    marque: "Yamaha",
    modele: "FZ6",
    annee: 2006,
    km: "35 000 km",
    prix: "3 100 €",
    cylindree: "600 cc",
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/13/46/ac/1346ac043a2b4770e073b45babd671ede36545c2.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3136020613",
    ville: "Thonon-les-Bains",
    publishedAt: "2026-04-13",
    disponible: true,
  },
  // Vespa 3182078736 retirée — annonce particulier qui mentionne Mot'Home
  // (révision faite chez Mot'home), pas une annonce publiée par MOT'HOME.
  // Faux positif identifié et exclu via isMothomeAd().
  {
    id: "3167498520",
    marque: "Peugeot",
    modele: "Métropolis 400",
    annee: 2013,
    km: "23 264 km",
    prix: "3 000 €",
    cylindree: "400 cc",
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/10/0b/11/100b1173d7dbc7077e3caf7fd0f6396fa35339b8.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3167498520",
    ville: "Thonon-les-Bains",
    publishedAt: "2026-03-24",
    disponible: true,
  },
  {
    id: "3166907502",
    marque: "BMW",
    modele: "F 850 GS Rally",
    annee: 2018,
    km: "53 086 km",
    prix: "7 500 €",
    cylindree: "850 cc",
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/26/8f/4d/268f4d1cdea210c5f4210493b9e9cbc9de9c4383.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3166907502",
    ville: "Thonon-les-Bains",
    publishedAt: "2026-03-23",
    disponible: true,
  },
  {
    id: "3166786946",
    marque: "Honda",
    modele: "VT 600 Shadow",
    annee: 1998,
    km: "15 167 km",
    prix: "3 200 €",
    cylindree: "600 cc",
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/4c/41/2c/4c412ccb8ac9a692e34a6f2fc553f35cfe8e4ae7.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3166786946",
    ville: "Thonon-les-Bains",
    publishedAt: "2026-03-23",
    disponible: true,
  },
  {
    id: "3043684933",
    marque: "Kawasaki",
    modele: "Z 900",
    annee: 2021,
    km: "1 495 km",
    prix: "8 000 €",
    cylindree: "900 cc",
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/d7/7f/96/d77f96c2f2afc30a05fe5220611dca8897d08ec3.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3043684933",
    ville: "Thonon-les-Bains",
    publishedAt: "2026-03-23",
    disponible: true,
  },
];

// ---------------------------------------------------------------------------
// Firecrawl helpers
// ---------------------------------------------------------------------------

interface FirecrawlScrapeResponse {
  success: boolean;
  data?: {
    markdown?: string;
  };
}

async function firecrawlScrape(url: string): Promise<string | null> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(FIRECRAWL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"],
      onlyMainContent: true,
    }),
  });

  if (!response.ok) {
    console.error(
      `[leboncoin-stock] Firecrawl ${response.status} on ${url}`,
    );
    return null;
  }

  const json = (await response.json()) as FirecrawlScrapeResponse;
  return json.data?.markdown ?? null;
}

// ---------------------------------------------------------------------------
// Parsers
// ---------------------------------------------------------------------------

/**
 * Extrait la liste d'IDs annonces depuis la page de recherche LBC,
 * dans l'ordre d'affichage (les plus récents en premier selon le tri
 * par défaut Leboncoin).
 */
function parseSearchIds(markdown: string): string[] {
  const matches = markdown.matchAll(/\/ad\/motos\/(\d+)/g);
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const m of matches) {
    const id = m[1];
    if (!seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
  }
  return ids;
}

/**
 * Convertit "29/04/2026" (format LBC) en "2026-04-29" (ISO).
 * Retourne null si la chaîne n'est pas au bon format.
 */
function parseFrenchDate(ddmmyyyy: string): string | null {
  const m = ddmmyyyy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

/**
 * Filtre vendeur strict : annonce publiée PAR MOT'HOME (pas juste un
 * particulier qui mentionne le garage dans sa description).
 *
 * Heuristique = présence d'au moins UNE de ces formules typiques :
 *   1. Footer pro "## MOT'HOME"
 *   2. Formule en description "Mot'Home vous propose"
 *   3. Variante "En dépôt vente chez MOT'HOME"
 *
 * Cas exclus volontairement (faux positifs observés) :
 *   - "révision faite chez Mot'home" (particulier qui cite le garage)
 *   - "Suivi chez Mot'Home" (particulier qui décrit l'historique)
 *
 * Filtre complémentaire : "Vendeur professionnel" doit apparaître
 * (critère "Annonces pro" demandé par le client).
 *
 * SIREN officiel MOT'HOME = 888246212 (présent dans rawHtml mais pas
 * toujours dans le markdown extrait — pas utilisé comme filtre primaire
 * sur demande du client).
 */
function isMothomeAd(markdown: string): boolean {
  // Seul marker fiable = heading "## MOT'HOME" présent dans le footer
  // profil pro Leboncoin de chaque vraie annonce publiée PAR MOT'HOME.
  //
  // Cas écartés (faux positifs observés) :
  //   - "Mot'Home vous propose..." en description : peut être copy-paste
  //     par un autre vendeur (ex: revente d'une moto passée par MOT'HOME).
  //   - "En dépôt vente chez MOT'HOME" : idem, info historique.
  //   - "Vendeur professionnel" seul : autres pros existent (lascap, etc.).
  //
  // Le heading "## MOT'HOME" n'apparaît QUE dans le footer profil pro
  // du vendeur dont l'annonce est publiée — pas dans les sections
  // "annonces similaires" ni dans des copy-paste de description.
  if (!/^##\s*MOT['\s]?HOME\b/im.test(markdown)) return false;

  // Sanity check pro
  return /vendeur professionnel/i.test(markdown);
}

/** Parse une page d'annonce Leboncoin et extrait les données structurées. */
function parseAdMarkdown(markdown: string, id: string): Moto | null {
  // FILTRE VENDEUR : skip si pas une annonce MOT'HOME
  if (!isMothomeAd(markdown)) return null;

  // Titre H1 (marque modèle)
  const titleMatch = markdown.match(/^# (.+)$/m);
  if (!titleMatch) return null;
  const fullTitle = titleMatch[1].trim();

  // Année + km depuis la ligne "· Ville · 2018 · 35000 km..."
  const metaMatch = markdown.match(
    /·\s*\[?([^\]·\n]+)\]?(?:\([^)]*\))?\s*·\s*(\d{4})\s*·\s*(\d[\d\s]*)\s*km/,
  );

  // Prix : ligne qui contient juste "X XXX €" (1ère occurrence)
  const priceMatch = markdown.match(/^(\d[\d\s]*\s*€)$/m);

  // Photo : 1ère image LBC img cdn
  const photoMatch = markdown.match(
    /https:\/\/img\.leboncoin\.fr\/api\/v1\/[^\s)]+rule=ad-large/,
  );

  // Cylindrée (depuis "Finition Constructeur" ou cubic_capacity)
  const cylMatch = markdown.match(/cubic_capacity:(\d+)/);

  // Date de publication : LBC l'affiche au format "DD/MM/YYYY" quelque part
  // dans le markdown (ex: "29/04/2026 à 13 heures 5019:50"). On prend la
  // première occurrence trouvée — c'est celle de l'annonce, pas une date
  // de moto ou autre référence parasite.
  const dateMatch = markdown.match(/(\d{2}\/\d{2}\/202[0-9])/);
  const publishedAt = dateMatch ? parseFrenchDate(dateMatch[1]) : null;

  // Marque + modèle parse à partir du titre (heuristique simple,
  // fallback = split sur 1er espace)
  const parts = fullTitle.split(/\s+/);
  const marque = parts[0] ?? "";
  const modele = parts.slice(1).join(" ").trim() || fullTitle;

  if (!metaMatch || !priceMatch || !photoMatch || !publishedAt) return null;

  const candidate = {
    id,
    marque,
    modele,
    annee: parseInt(metaMatch[2], 10),
    km: `${metaMatch[3].replace(/\s+/g, " ").trim()} km`,
    prix: priceMatch[1].replace(/\s+/g, " ").trim(),
    cylindree: cylMatch ? `${cylMatch[1]} cc` : undefined,
    photo: photoMatch[0],
    lbcUrl: `https://www.leboncoin.fr/ad/motos/${id}`,
    ville: metaMatch[1].trim(),
    publishedAt,
    disponible: true as const,
  };

  const parsed = MotoSchema.safeParse(candidate);
  return parsed.success ? parsed.data : null;
}

/**
 * Trie les motos par date de publication descendante.
 * Tri secondaire (en cas d'égalité de date) : ID descendant (plus grand
 * ID = créé plus récemment côté DB Leboncoin).
 */
function sortByPublishedDesc(motos: Moto[]): Moto[] {
  return [...motos].sort((a, b) => {
    if (a.publishedAt !== b.publishedAt) {
      return a.publishedAt < b.publishedAt ? 1 : -1;
    }
    return a.id < b.id ? 1 : -1;
  });
}

// ---------------------------------------------------------------------------
// Cache des IDs courants (in-process, survit pendant la durée ISR)
// ---------------------------------------------------------------------------

let cachedIds: string[] | null = null;
let cachedMotos: readonly Moto[] | null = null;

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Récupère les 9 dernières annonces MOT'HOME via Firecrawl.
 * Renvoie FALLBACK_MOTOS si Firecrawl indisponible / erreur / validation KO.
 *
 * Diff intelligent : si la liste d'IDs n'a pas changé depuis le dernier
 * appel, on retourne directement le cache courant sans re-scraper les
 * détails (économise 9 calls Firecrawl).
 */
export async function fetchTopMotos(): Promise<readonly Moto[]> {
  try {
    const searchMd = await firecrawlScrape(LEBONCOIN_SEARCH_URL);
    if (!searchMd) {
      console.warn("[leboncoin-stock] no search markdown, fallback");
      return FALLBACK_MOTOS;
    }

    const allIds = parseSearchIds(searchMd);
    const candidateIds = allIds.slice(0, CANDIDATE_POOL);

    if (candidateIds.length < MIN_MOTOS) {
      console.warn(
        `[leboncoin-stock] only ${candidateIds.length} candidate IDs, fallback`,
      );
      return FALLBACK_MOTOS;
    }

    // Diff sur set d'IDs candidats : si identique au cache, skip re-scrape
    if (
      cachedIds &&
      cachedMotos &&
      arraysEqual(cachedIds, candidateIds)
    ) {
      return cachedMotos;
    }

    // Fetch détails de tous les candidats (en parallèle)
    const adMds = await Promise.all(
      candidateIds.map((id) =>
        firecrawlScrape(`https://www.leboncoin.fr/ad/motos/${id}`),
      ),
    );

    // Parse + filtre MOT'HOME via parseAdMarkdown (return null si pas MOT'HOME)
    const motos: Moto[] = [];
    for (let i = 0; i < candidateIds.length; i++) {
      const md = adMds[i];
      if (!md) continue;
      const moto = parseAdMarkdown(md, candidateIds[i]);
      if (moto) motos.push(moto);
    }

    if (motos.length < MIN_MOTOS) {
      console.warn(
        `[leboncoin-stock] only ${motos.length} MOT'HOME ads in pool, fallback`,
      );
      return FALLBACK_MOTOS;
    }

    // Tri par date desc puis cap à MAX_MOTOS
    const sorted = sortByPublishedDesc(motos).slice(0, MAX_MOTOS);
    const validated = MotosSchema.safeParse(sorted);
    if (!validated.success) {
      console.warn(
        "[leboncoin-stock] validation failed, fallback:",
        validated.error.issues.slice(0, 2),
      );
      return FALLBACK_MOTOS;
    }

    cachedIds = candidateIds;
    cachedMotos = validated.data;
    return validated.data;
  } catch (error) {
    console.error("[leboncoin-stock] unexpected error:", error);
    return FALLBACK_MOTOS;
  }
}
