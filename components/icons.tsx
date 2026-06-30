type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.6 2.5a1.6 1.6 0 0 1 1.55 1.18l.86 3.2a1.6 1.6 0 0 1-.43 1.56l-1.4 1.36a12.5 12.5 0 0 0 5.04 5.04l1.36-1.4a1.6 1.6 0 0 1 1.56-.43l3.2.86A1.6 1.6 0 0 1 21.5 17.4v2.5a1.6 1.6 0 0 1-1.75 1.6C10.3 20.74 3.26 13.7 2.5 4.25A1.6 1.6 0 0 1 4.1 2.5h2.5Z" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
