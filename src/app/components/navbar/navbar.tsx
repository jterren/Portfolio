"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import slimePng from "../../assets/slime_bounce.png";
import slimeGif from "../../assets/slime_bounce.gif";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const links: LinkElement[] = [
    { text: "About", route: "about" },
    { text: "Contact", route: "contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <Link href="/" className="navbar-brand">
            <Image
              src={isHovered ? slimeGif : slimePng}
              alt={"Bouncing Slime by Jake Terren"}
              width={64}
              height={64}
              unoptimized
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ position: "relative", top: "-15px" }}
            />
          </Link>
          <ul className="navbar-nav">{getLinks(links)}</ul>
        </div>
      </div>
    </nav>
  );
}

const getLinks = (links: LinkElement[]) => {
  return links.map((el, index) => {
    return (
      <li key={index} className="nav-item">
        <Link
          className="nav-link active"
          aria-current="page"
          href={`/${el.route}`}
        >
          {el.text}
        </Link>
      </li>
    );
  });
};
