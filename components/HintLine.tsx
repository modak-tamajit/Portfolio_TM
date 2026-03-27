interface HintLineProps {
  text: string;
  opacity?: number;
  className?: string;
}

export default function HintLine({ text, opacity = 0.5, className = '' }: HintLineProps) {
  return (
    <p
      className={`font-mono text-xs text-secondary/60 select-none ${className}`}
      style={{ opacity }}
    >
      {text}
    </p>
  );
}
