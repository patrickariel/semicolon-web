import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NavItemProps {
  href: string;
  icon: string;
  text: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, active }) => (
  <Link href={href}>
    <div className={`flex gap-4 ${active ? "active-sidebar" : ""}`}>
      <Image src={icon} alt="" className="w-7 h-7" width={26} height={26} />
      <p className="text-xl">{text}</p>
    </div>
  </Link>
);

export default NavItem;
