interface HintLineProps {
  text: string;
  opacity?: number;
  className?: string;
}

export default function HintLine({ text, opacity = 0.15, className = '' }: HintLineProps) {
  return (
    <p
      className={`font-mono text-[9px] text-secondary/40 select-none ${className}`}
      style={{ opacity }}
    >
      {text}
    </p>
  );
}
