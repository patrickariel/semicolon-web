import { Slot } from "@radix-ui/react-slot";
import { Button, ButtonProps } from "@semicolon/ui/button";
import { cn } from "@semicolon/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type PostButtonProps = ButtonProps &
  (
    | {
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        href?: never;
      }
    | {
        href: string;
        onClick?: never;
      }
  ) & {
    icon: LucideIcon;
    label?: string | number;
  } & VariantProps<typeof highlightVariants> &
  VariantProps<typeof iconSizeVariants>;

const highlightVariants = cva([], {
  variants: {
    highlight: {
      blue: "hover:bg-blue-400/20 [&>*]:group-hover:stroke-blue-400 [&~*]:group-hover:text-blue-400",
      pink: "hover:bg-pink-500/20 [&>*]:group-hover:stroke-pink-500 [&~*]:group-hover:text-pink-500",
      green:
        "hover:bg-green-600/20 [&>*]:group-hover:stroke-green-600 [&~*]:group-hover:text-green-600",
      yellow:
        "hover:bg-yellow-400/20 [&>*]:group-hover:stroke-yellow-400 [&~*]:group-hover:text-yellow-400",
    },
  },
  defaultVariants: {
    highlight: "blue",
  },
});

const iconSizeVariants = cva([], {
  variants: {
    iconSize: {
      small: "size-[1.1rem]",
      big: "size-[1.3rem]",
    },
  },
  defaultVariants: {
    iconSize: "small",
  },
});

export function PostButton({
  icon: Icon,
  label,
  children,
  href,
  onClick,
  className,
  highlight,
  iconSize,
  ...props
}: PostButtonProps) {
  const Comp = href
    ? ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <Link href={href} onClick={(e) => e.stopPropagation()} {...props}>
          {children}
        </Link>
      )
    : Slot;

  return (
    <div className="group relative flex flex-row items-center">
      <Button
        variant={"ghost"}
        className={cn(
          highlightVariants({ highlight, className }),
          "flex aspect-square h-auto items-center justify-start gap-0 rounded-full p-2 after:absolute after:inset-0 after:block after:content-['']",
        )}
        asChild={href ? true : false}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
        {...props}
      >
        <Comp>
          <Icon
            className={iconSizeVariants({
              iconSize,
              className: "stroke-muted-foreground",
            })}
          />
        </Comp>
      </Button>
      {label !== undefined && (
        <p className="text-muted-foreground text-sm">{label}</p>
      )}
      {children}
    </div>
  );
}
