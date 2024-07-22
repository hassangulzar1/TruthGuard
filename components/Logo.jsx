import React from "react";
import headerLogo from "../assets/header.png";
import Image from "next/image";
const Logo = () => {
  return (
    <div style={{ display: "flex" }}>
      <h1 style={{ fontSize: "1.5rem", color: "white", marginTop: "25px" }}>
        TruthGuard
      </h1>
      <Image src={headerLogo} width={90} alt="Picture of the author" />
    </div>
  );
};

export default Logo;
