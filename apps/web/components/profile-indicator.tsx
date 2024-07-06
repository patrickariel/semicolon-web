import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Button, ButtonProps } from "@semicolon/ui/button";
import { cn } from "@semicolon/ui/utils";
import { Ellipsis, User } from "lucide-react";

export function ProfileIndicator({
  className,
  username,
  name,
  image,
  ...props
}: ButtonProps & {
  username: string;
  name: string;
  image?: string | null;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex aspect-square h-auto min-h-0 min-w-full flex-row justify-center rounded-full p-0 lg:aspect-auto lg:min-h-20 lg:justify-between lg:px-3",
        className,
      )}
      {...props}
    >
      <div className="flex flex-row gap-3">
        <Avatar className="size-11">
          {image && <AvatarImage src={image} />}
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="hidden flex-col items-start lg:flex">
          <p className="text-base font-extrabold">{name}</p>
          <p className="text-muted-foreground text-base">@{username}</p>
        </div>
      </div>
      <Ellipsis className="hidden lg:block" />
    </Button>
  );
}
