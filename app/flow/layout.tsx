import { Separator } from "@/components/ui/separator";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen flex flex-col items-center lg:flex-row gap-4 sm:gap-6 xl:gap-11 w-full px-2 sm:container justify-center py-12">
      <div className="flex lg:hidden flex-row gap-4">
        <h1 className="text-3xl xl:text-8xl font-bold">semicolon</h1>
        <h1 className="text-3xl xl:text-8xl text-sky-300 font-extrabold">;</h1>
      </div>
      <Separator className="block sm:hidden w-1/2" />
      <div className="w-full lg:w-1/2 flex flex-row justify-center lg:justify-end">
        {children}
      </div>
      <div className="w-1/2 flex-row justify-center xl:justify-start items-center gap-14 hidden lg:flex">
        <div className="flex flex-col gap-9 justify-center items-center">
          <div className="flex flex-row gap-6">
            <h1 className="text-7xl xl:text-8xl font-bold">semicolon</h1>
            <h1 className="text-7xl xl:text-8xl text-sky-300 font-extrabold">
              ;
            </h1>
          </div>
          <h3 className="text-2xl text-muted-foreground">
            Where conversation happens.
          </h3>
        </div>
      </div>
    </section>
  );
}
