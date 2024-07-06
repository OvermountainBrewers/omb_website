import { PropsWithChildren } from "react";

export const BlockQuote = ({ children }: PropsWithChildren): JSX.Element => (
  <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
);
