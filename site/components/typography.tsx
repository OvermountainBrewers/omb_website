import { cn } from "@/lib/utils";
import React, { PropsWithChildren, ReactNode } from "react";

export const H1 = ({ children }: PropsWithChildren): JSX.Element => (
  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">
    {children}
  </h1>
);

export const H2 = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>): JSX.Element => (
  <h2
    className={cn(
      "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      className,
    )}
  >
    {children}
  </h2>
);

export const H3 = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>): JSX.Element => (
  <h3
    className={cn(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      className,
    )}
  >
    {children}
  </h3>
);

export const H4 = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>): JSX.Element => (
  <h4
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      className,
    )}
  >
    {children}
  </h4>
);

export const P = ({ children }: PropsWithChildren): JSX.Element => (
  <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
);
