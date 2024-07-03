import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Button } from "@semicolon/ui/button";
import { Card, CardContent } from "@semicolon/ui/card";
import { BadgeCheck } from "lucide-react";
import React from "react";

// root/apps/web/components/search-results-user.tsx

export function SearchResultUser({ searchTerm }) {
  const filteredSuggestions = suggestions.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-6 pt-4">
          {filteredSuggestions.map((user) => (
            <div key={user.username} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0">
                  <Avatar className="size-11">
                    <AvatarImage width={300} height={300} src={user.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col pl-2">
                    <span className="flex flex-row items-center gap-2 text-base font-bold">
                      <p className="truncate">{user.name}</p>
                      <BadgeCheck className="size-5 flex-none stroke-sky-400" />
                    </span>
                    <p className="text-muted-foreground truncate text-sm">
                      @{user.username}
                    </p>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="cursor-pointer rounded-full font-bold text-black"
                >
                  Follow
                </Button>
              </div>
              <p className="text-muted-foreground pl-2 text-sm">{user.bio}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
