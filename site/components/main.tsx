export default function Main({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`flex flex-col p-4 lg:p-24 max-w-[1200px] mx-auto min-h-[calc(100vh-72px-72px)] ${
        className ?? ""
      }`}
    >
      {children}
    </main>
  );
}
