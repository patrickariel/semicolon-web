import { myPostsAtom } from "@/lib/atom";
import { trpc } from "@/lib/trpc-client";
import { PostResolved } from "@semicolon/api/schema";
import { Button } from "@semicolon/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@semicolon/ui/dropdown-menu";
import { useSetAtom } from "jotai";
import { Ellipsis, Flag, Trash2, UserPlus } from "lucide-react";

export function PostDropdown({
  username,
  id,
  isOwner = false,
  content: _content,
  ...props
}: Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "content"> &
  PostResolved & { isOwner?: boolean }) {
  const setMyPosts = useSetAtom(myPostsAtom);
  const utils = trpc.useUtils();
  const deletePost = trpc.post.delete.useMutation({
    onSuccess: async (_data, { id }) => {
      setMyPosts((myPosts) => myPosts.filter((post) => post.id !== id));
      await utils.post.search.refetch();
      await utils.post.replies.refetch();
      await utils.user.posts.refetch({ username });
      await utils.user.replies.refetch({ username });
    },
  });

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
      <DropdownMenuContent
        className="flex flex-col gap-0 rounded-3xl px-0 py-2 [&>*]:min-w-44 [&>*]:text-sm [&>*]:font-black"
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {isOwner ? (
          <DropdownMenuItem
            className="focus:bg-destructive/20 cursor-pointer justify-start gap-4 rounded-none px-4 py-4"
            onSelect={() => deletePost.mutate({ id })}
          >
            <Trash2 size={20} className="stroke-destructive" />
            <div className="text-destructive">Delete</div>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem
              className="cursor-pointer justify-start gap-4 rounded-none px-4 py-4"
              onSelect={() => deletePost.mutate({ id })}
            >
              <UserPlus size={20} />
              <div>Follow {`@${username}`}</div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer justify-start gap-4 rounded-none px-4 py-4"
              onSelect={() => deletePost.mutate({ id })}
            >
              <Flag size={20} />
              <div>Report post</div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
