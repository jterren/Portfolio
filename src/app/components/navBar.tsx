"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function Navbar() {
	const [isHovered, setIsHovered] = useState(false);
	const links: LinkElement[] = [{ text: "The Wilting Demo", route: "unity" }];

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link href="/" className="navbar-brand">
					<Image
						src={isHovered ? "/slime_bounce.gif" : "/slime_bounce.png"}
						alt="Bouncing Slime by Jake Terren"
						width={64}
						height={64}
						unoptimized
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						style={{ position: "relative", top: "-15px" }}
					/>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
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
