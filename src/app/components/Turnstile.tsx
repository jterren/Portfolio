"use client";
import { useEffect } from "react";

declare global {
	interface Window {
		turnstile?: {
			render: (
				container: string | HTMLElement,
				options: {
					sitekey: string;
					size?: "compact" | "normal";
					callback: (token: string) => void;
				}
			) => string;
			execute: (widgetId: string) => void;
		};
	}
}

const Turnstile = () => {
	useEffect(() => {
		const loadTurnstile = () => {
			if (window.turnstile) {
				const widgetId = window.turnstile.render("#turnstile-container", {
					sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
					size: "compact",
					callback: () => {},
				});
				window.turnstile.execute(widgetId);
			}
		};

		if (window.turnstile) {
			loadTurnstile();
		} else {
			window.addEventListener("turnstile-loaded", loadTurnstile);
		}

		return () => {
			window.removeEventListener("turnstile-loaded", loadTurnstile);
		};
	}, []);

	return (
		<div
			id="turnstile-container"
			style={{ visibility: "hidden", position: "absolute" }}
		></div>
	);
};

export default Turnstile;
