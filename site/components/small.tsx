import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface SmallProps {
  children: React.ReactNode;
  className?: string;
}

export function Small({ children, className }: SmallProps) {
  return (
    <small className={cn(`text-sm font-medium leading-none`, className)}>
      {children}
    </small>
  );
}
