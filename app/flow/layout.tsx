import { Separator } from "@/components/ui/separator";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen flex gap-5 w-full container justify-center">
      <div className="w-full lg:w-1/2 my-auto">{children}</div>
      <Separator
        orientation="vertical"
        className="h-5/6 self-center hidden lg:block"
      />
      <div className="w-1/2 flex-col gap-14 justify-center items-center hidden lg:flex">
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
    </section>
  );
}
