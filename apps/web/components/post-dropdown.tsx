import { PostResolved } from "@semicolon/api/schema";
import { Button } from "@semicolon/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@semicolon/ui/dropdown-menu";
import { Ellipsis, Flag, UserPlus } from "lucide-react";

export function PostDropdown({ username }: PostResolved) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="aspect-square size-fit rounded-full p-2"
        >
          <Ellipsis className="flex-none" size={19} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 rounded-3xl px-0 py-4 [&>*]:min-w-40 [&>*]:text-base [&>*]:font-bold">
        <Button
          variant="ghost"
          className="justify-start gap-4 rounded-none p-6 px-4"
        >
          <UserPlus size={23} />
          <div>Follow {`@${username}`}</div>
        </Button>
        <Button
          variant="ghost"
          className="justify-start gap-4 rounded-none p-6 px-4"
        >
          <Flag size={23} />
          <div>Report post</div>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
