import Link from "next/link";
import React from "react";

const FeedHeader = () => (
  <div className="flex justify-center gap-[150px] pt-[20px] border-b-2 border-line">
    <Link
      href="#"
      className="px-2.5 pb-3.5 text-base font-bold border-b-4 border-link"
    >
      For You
    </Link>
    <Link href="#" className="px-2.5 pb-3.5 text-base font-bold text-username">
      Following
    </Link>
  </div>
);

export default FeedHeader;
