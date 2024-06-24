import { BottomBar } from "@/components/bottom-bar";
import { SearchBar } from "@/components/search-bar";
import { SideBar } from "@/components/side-bar";
import { Suggestions } from "@/components/suggestions";
import { Trends } from "@/components/trends";
import { Separator } from "@/components/ui/separator";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto flex min-h-screen w-screen min-w-[280px] flex-col px-0 md:pr-8 lg:px-8">
      <div className="flex min-h-full w-full flex-row justify-center">
        <div className="hidden max-w-[270px] px-4 py-3 min-[400px]:block md:px-8 lg:w-full lg:py-7">
          <SideBar />
        </div>
        <Separator orientation="vertical" className="h-auto min-h-screen" />
        {children}
        <Separator orientation="vertical" className="h-auto min-h-screen" />
        <div className="hidden w-1/4 min-w-[300px] flex-none shrink-0 flex-col md:flex">
          <div className="flex flex-col gap-5 py-[30px] pl-[30px]">
            <SearchBar />
            <Suggestions />
            <div className="flex flex-col rounded-[16px] bg-secondary">
              <Trends />
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
