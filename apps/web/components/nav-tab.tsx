import { cn } from "@semicolon/ui/utils";
import Link from "next/link";

export function NavTabItem({
  children,
  href,
  className,
  active = false,
  ...props
}: Parameters<typeof Link>[0] & { active?: boolean }) {
  return (
    <Link
      href={href}
      className="hover:bg-accent hover:text-accent-foreground relative flex h-14 flex-auto flex-col items-center justify-center px-8 text-base font-bold transition-colors"
      {...props}
    >
      <p>{children}</p>
      {active && (
        <div className="absolute inset-x-0 bottom-0 mx-auto block h-1 w-2/3 rounded-full bg-sky-400" />
      )}
    </Link>
  );
}

export function NavTab({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex justify-stretch", className)} {...props}>
      {children}
    </div>
  );
}
