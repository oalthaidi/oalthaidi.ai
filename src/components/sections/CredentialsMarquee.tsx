interface CredentialsMarqueeProps {
  items: readonly string[];
  label: string;
}

/**
 * Endless strip of credentials. The list is rendered twice for a seamless
 * loop; the copy is hidden from screen readers.
 */
export function CredentialsMarquee({ items, label }: CredentialsMarqueeProps) {
  return (
    <section className="marquee" id="credentials" aria-label={label}>
      <ul className="marquee__track">
        {items.map((item) => (
          <li key={item} className="marquee__item">
            {item}
          </li>
        ))}
        {items.map((item) => (
          <li key={`copy-${item}`} className="marquee__item" aria-hidden="true">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
