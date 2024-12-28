export default function Main({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      // 72px is the height of the navbar
      // 73px is the height of the footer
      // These need to be added directly in the string below so tailwind doesn't remove them during treeshaking
      className={`flex flex-col p-4 lg:p-24 max-w-[1200px] mx-auto min-h-[calc(100vh-72px-73px)] ${
        className ?? ""
      }`}
    >
      {children}
    </main>
  );
}
