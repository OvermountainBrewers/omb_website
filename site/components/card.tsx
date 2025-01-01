import { cn } from "@/lib/utils";
import { Attributes, ComponentProps, PropsWithChildren } from "react";

export const cardStyle =
  "flex flex-col items-center bg-slate-800 rounded-xl p-12 m-2 border-l-4 border-paleBlue";

interface CardProps extends ComponentProps<"div"> {
  key: string;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  key,
  className,
}): JSX.Element => (
  <div key={key} className={cn(cardStyle, className)}>
    {children}
  </div>
);
