interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="inline-block border border-amber-500/25 bg-amber-500/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-500/85">
      {name}
    </span>
  );
}
