import { BottomBar } from "@/components/bottom-bar";
import { SideBar } from "@/components/side-bar";
import { auth } from "@semicolon/auth";
import { Separator } from "@semicolon/ui/separator";
import { Toaster } from "@semicolon/ui/toaster";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
  center,
  right,
}: Readonly<{
  children: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}>) {
  const session = await auth();

  if (
    !session ||
    !session.user ||
    !(session.user.registered && session.user.name && session.user.username)
  ) {
    redirect("/flow/signup");
  }

  const { username, name, image } = session.user;

  return (
    <div className="container mx-auto flex min-h-screen w-screen min-w-[280px] flex-col px-0 md:pr-8 lg:px-8">
      <div className="flex min-h-full w-full flex-row justify-center">
        <SideBar {...{ username, name, image }} />
        <Separator orientation="vertical" className="h-auto min-h-screen" />
        <div className="w-full min-w-[257px] md:max-w-[650px]">
          {center}
          {children}
        </div>
        <Separator orientation="vertical" className="h-auto min-h-screen" />
        <div className="hidden min-h-full w-1/4 min-w-[300px] flex-none shrink-0 flex-col justify-start pl-[30px] pt-0 md:flex">
          {right}
        </div>
      </div>
      <BottomBar />
      <Toaster />
    </div>
  );
}
