"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../global.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import UnderConstruction from "../components/underConstruction";
import { useState, useEffect } from "react";

export default function Home() {
	const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
		loaderUrl: "/Unity/Build/Web.loader.js",
		dataUrl: "/Unity/Build/Web.data.gz",
		frameworkUrl: "/Unity/Build/Web.framework.js.gz",
		codeUrl: "/Unity/Build/Web.wasm.gz",
	});

	const underConstruction = process.env.NEXT_PUBLIC_UNITY_ENABLED
		? false
		: true;
	const [progress, setProgress] = useState(0);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		setProgress((prev) =>
			prev !== loadingProgression ? loadingProgression : prev
		);
	}, [loadingProgression]);

	return (
		<div className="m-3 d-flex flex-column justify-content-center align-items-center">
			<h1 className="text-center">The Wilting Demo</h1>
			{underConstruction ? (
				<UnderConstruction />
			) : (
				<>
					{!isLoaded && <p>Loading... {Math.round(progress * 100)}%</p>}
					{isClient && (
						<Unity
							unityProvider={unityProvider}
							className="p-5 w-100 h-100"
							style={{ maxWidth: "90vw", maxHeight: "90vh" }}
						/>
					)}
				</>
			)}
		</div>
	);
}
