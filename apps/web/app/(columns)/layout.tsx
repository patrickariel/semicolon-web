import { BottomBar } from "@/components/bottom-bar";
import { SideBar } from "@/components/side-bar";
import { Separator } from "@semicolon/ui/separator";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto flex min-h-screen w-screen min-w-[280px] flex-col px-0 md:pr-8 lg:px-8">
      <div className="flex min-h-full w-full flex-row justify-center">
        <SideBar />
        <Separator orientation="vertical" className="h-auto min-h-screen" />
        {children}
      </div>
      <BottomBar />
    </div>
  );
}
