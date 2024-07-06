interface MutedProps {
  text: string;
}

export function Muted({ text }: MutedProps) {
  return <p className="text-sm text-muted-foreground">{text}</p>;
}
