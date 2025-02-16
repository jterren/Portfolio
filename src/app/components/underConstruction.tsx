"use client";
import React from "react";
import Image from "next/image";

export default function UnderConstruction() {
  return (
    <div className="container-sm p-3">
      <h2 className="text-center">Under Construction</h2>
      <Image
        src="/slime_bounce.gif"
        alt="Bouncing Slime by Jake Terren"
        width={96}
        height={96}
        unoptimized
        className="d-block mx-auto"
      />
    </div>
  );
}
