interface HintLineProps {
  text: string;
  opacity?: number;
  className?: string;
}

export default function HintLine({ text, opacity = 0.3, className = '' }: HintLineProps) {
  return (
    <p
      className={`font-mono text-[10px] text-secondary select-none ${className}`}
      style={{ opacity }}
    >
      {text}
    </p>
  );
}
