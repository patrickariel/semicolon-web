import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <div className={`min-w-[230px] ${className}`}>
    <Link href="#">
      <h2 className="font-bold text-[28px] py-[30px]">semicolon;</h2>
    </Link>
  </div>
);

export default Logo;
