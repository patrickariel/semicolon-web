import { SideBar } from "@/components/side-bar";
import { auth } from "@semicolon/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (
    !(session?.user?.registered && session.user.name && session.user.username)
  ) {
    redirect("/flow/signup");
  }

  const { username, name, image } = session.user;

  return <SideBar {...{ username, name, image }} />;
}
