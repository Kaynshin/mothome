/**
 * Composant JsonLd — injecte un script JSON-LD dans le <head>.
 * Usage : <JsonLd data={buildMotorcycleRepairSchema()} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
