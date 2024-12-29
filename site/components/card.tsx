import { Attributes, ComponentProps, PropsWithChildren } from "react";

export const cardStyle =
  "flex flex-col items-center bg-slate-800 rounded-xl p-12 m-2 border-l-4 border-paleBlue";

export const Card: React.FC<PropsWithChildren<Attributes>> = ({
  children,
  key,
}): JSX.Element => (
  <div key={key} className={cardStyle}>
    {children}
  </div>
);
