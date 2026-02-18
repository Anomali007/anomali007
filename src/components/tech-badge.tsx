interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="inline-block rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-text-secondary">
      {name}
    </span>
  );
}
