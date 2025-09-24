import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center">
      <Image
        src={"/bookeasy.png"}
        alt="book easy logo"
        width={40}
        height={30}
      />
      <h1 className="text-brand-black font-bold text-xl md:text-3xl">
        BookEasy
      </h1>
    </Link>
  );
};
