import { BottomBar } from "@/components/bottom-bar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <BottomBar className="min-[500px]:hidden" />
    </>
  );
}
