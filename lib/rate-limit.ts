/**
 * Rate limiter basique en mémoire.
 *
 * ⚠️  En environnement serverless (Vercel), chaque instance est isolée :
 *     ce rate limiter ne partage pas d'état entre instances.
 *     Pour du rate limiting fiable en prod, utiliser @upstash/ratelimit + Redis.
 *
 *     Pour l'instant, ce module est suffisant pour le besoin V1 (formulaire de contact).
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/** Supprime les entrées expirées pour éviter les fuites mémoire. */
function cleanup(): void {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export interface RateLimitConfig {
  /** Nombre maximum de requêtes autorisées dans la fenêtre. */
  limit: number;
  /** Durée de la fenêtre en millisecondes. */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  /** Requêtes restantes dans la fenêtre. */
  remaining: number;
  /** Timestamp (ms) auquel la fenêtre se réinitialise. */
  resetAt: number;
}

/**
 * Vérifie si la clé (ex: adresse IP) a dépassé la limite.
 *
 * @example
 * const result = checkRateLimit(ip, { limit: 5, windowMs: 60_000 });
 * if (!result.success) return new Response('Too Many Requests', { status: 429 });
 */
export function checkRateLimit(
  key: string,
  { limit, windowMs }: RateLimitConfig,
): RateLimitResult {
  // Nettoyage occasionnel (1 chance sur 100)
  if (Math.random() < 0.01) cleanup();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    // Nouvelle fenêtre
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return {
    success: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  };
}
