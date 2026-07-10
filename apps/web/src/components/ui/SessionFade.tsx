interface SessionFadeProps {
  count: number;
}

const MAX_DOTS = 8;

export function SessionFade({ count }: SessionFadeProps) {
  const dots = Math.min(Math.max(count, 1), MAX_DOTS);
  const items = Array.from({ length: dots }, (_, index) => index);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-end gap-1" aria-hidden="true">
        {items.map((index) => (
          <span
            key={index}
            className="h-2.5 w-2.5 rounded-full bg-primary"
            style={{ opacity: 1 - (index / dots) * 0.78 }}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {count} {count === 1 ? 'session' : 'sessions'}
      </span>
    </div>
  );
}
