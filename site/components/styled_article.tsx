import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function StyledArticle({
  children,
  className,
  ...articleProps
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>) {
  return (
    <article
      className={cn("container prose prose-lg dark:prose-invert", className)}
      {...articleProps}
    >
      {children}
    </article>
  );
}
