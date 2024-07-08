import { auth } from "@semicolon/auth";
import { Separator } from "@semicolon/ui/separator";
import { Toaster } from "@semicolon/ui/toaster";
import { redirect } from "next/navigation";

export default async function Layout({
  left,
  children,
  right,
}: Readonly<{
  left: React.ReactNode;
  children: React.ReactNode;
  right: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user?.registered) {
    redirect("/flow/signup");
  }

  return (
    <div className="flex min-h-screen w-full flex-row justify-center lg:container">
      <div className="sticky top-0 hidden h-screen max-w-[300px] overflow-hidden p-2 py-3 min-[500px]:block lg:w-full lg:py-7 lg:pr-3">
        {left}
      </div>
      <Separator orientation="vertical" className="h-auto min-h-screen" />
      <div className="w-full min-w-[257px] md:max-w-[650px]">{children}</div>
      <Separator orientation="vertical" className="h-auto min-h-screen" />
      <div className="hidden min-h-full w-1/4 min-w-[300px] flex-none shrink-0 flex-col justify-start p-6 pt-0 md:flex">
        {right}
      </div>
      <Toaster />
    </div>
  );
}
