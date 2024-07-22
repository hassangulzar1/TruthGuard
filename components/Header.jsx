"use client";
import React from "react";

import Logo from "./Logo";
export default function Header() {
  return (
    <>
      <header className="shadow-sm  p-2" style={{ backgroundColor: "#1F2937" }}>
        <div className="container mx-auto ">
          <div className="flex justify-between items-center">
            <Logo />
          </div>
        </div>
      </header>
    </>
  );
}
