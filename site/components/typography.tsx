import { cn } from "@/lib/utils";
import React, { PropsWithChildren, ReactNode } from "react";

export const h1Style =
  "scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl mb-3";
export const H1 = ({ children }: PropsWithChildren): JSX.Element => (
  <h1 className={h1Style}>{children}</h1>
);

export const h2Style =
  "scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0";
export const H2 = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>): JSX.Element => (
  <h2 className={cn(h2Style, className)}>{children}</h2>
);

export const h3Style =
  "scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight";
export const H3 = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>): JSX.Element => (
  <h3 className={cn(h3Style, className)}>{children}</h3>
);

export const h4Style =
  "scroll-m-20 text-lg md:text-xl font-semibold tracking-tight";
export const H4 = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>): JSX.Element => (
  <h4 className={cn(h4Style, className)}>{children}</h4>
);

export const pStyle = "leading-7 [&:not(:first-child)]:mt-6 text-md md:text-lg";
export const P = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>): JSX.Element => (
  <p className={cn(pStyle, className)}>{children}</p>
);
