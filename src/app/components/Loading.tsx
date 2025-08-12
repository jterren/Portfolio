import Image from "next/image";

export default function Loading() {
	return (
		<div className="d-flex justify-content-center">
			<Image
				src="/slime_bounce.gif"
				alt="Bouncing Slime by Jake Terren"
				width={64}
				height={64}
				unoptimized
				style={{ imageRendering: "pixelated" }}
			/>
		</div>
	);
}
