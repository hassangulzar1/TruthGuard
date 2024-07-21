"use client";
import React, { useEffect, useState } from "react";
import ThemeTogler from "./ThemeTogler";

import Logo from "./Logo";
export default function Header() {
  return (
    <>
      <header className="shadow-sm  p-2">
        <div className="container mx-auto ">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-x-6">
              {/* <Nav
                containerStyles="
               hidden  xl:flex gap-x-8 items-center"
                linkStyles=" relative hover:text-primary transition-all"
                underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
              /> */}

              <ThemeTogler />
              <div className="xl:hidden "></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
