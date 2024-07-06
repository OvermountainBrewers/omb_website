interface SmallProps {
  text: string;
}

export function Small({ text }: SmallProps) {
  return <small className="text-sm font-medium leading-none">{text}</small>;
}
