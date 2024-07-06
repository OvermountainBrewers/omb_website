interface LeadProps {
  text: string;
}

export function Lead({ text }: LeadProps) {
  return <p className="text-xl text-muted-foreground">{text}</p>;
}
