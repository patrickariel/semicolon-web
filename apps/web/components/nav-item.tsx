import { Button } from "@semicolon/ui/button";
import { cn } from "@semicolon/ui/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavItemProps {
  icon?: LucideIcon;
  label?: string;
}

export function NavItem({
  href,
  icon: Icon,
  label,
  children,
  className,
}: Parameters<typeof Link>[0] & NavItemProps) {
  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "aspect-square h-auto shrink justify-center rounded-full p-1 lg:aspect-auto lg:min-h-14 lg:w-fit lg:justify-start lg:px-4 lg:py-2",
        className,
      )}
    >
      <Link href={href} className="flex items-center gap-4">
        {Icon && <Icon className="size-7 flex-none" />}
        {label && (
          <p className="hidden align-middle text-xl lg:block">{label}</p>
        )}
        {children}
      </Link>
    </Button>
  );
}
