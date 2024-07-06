interface LargeProps {
  text: string;
}

export function Large({ text }: LargeProps) {
  return <div className="text-lg font-semibold">{text}</div>;
}
