interface ListProps {
  items: string[];
}

export function List({ items }: ListProps) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}
