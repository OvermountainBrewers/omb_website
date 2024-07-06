import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface LargeProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

export function Large({ text, className }: LargeProps) {
  return <div className={cn("text-lg font-semibold", className)}>{text}</div>;
}
