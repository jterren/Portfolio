import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		localPatterns: [
			{
				search: "",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/Unity/Build/:path*.gz",
				headers: [
					{
						key: "Content-Encoding",
						value: "gzip",
					},
					{
						key: "Content-Type",
						value: "application/javascript",
					},
					{
						key: "Cache-Control",
						value: "no-store, no-cache, must-revalidate, proxy-revalidate",
					},
				],
			},
		];
	},
};

export default nextConfig;
