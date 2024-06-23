import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export function NavItem({ href, icon: Icon, label }: NavItemProps) {
  return (
    <Link href={href} className="flex items-center gap-4">
      <Icon className="size-6 flex-none" />
      <p className="hidden align-middle text-lg lg:block">{label}</p>
    </Link>
  );
}
