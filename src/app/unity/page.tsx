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
		<>
			<div className="m-3 d-flex flex-column justify-content-center align-items-center">
				<h1 className="text-center">The Wilting - Alpha</h1>
				<a
					href="https://github.com/users/jterren/projects/2/views/6"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub Roadmap
				</a>
				{underConstruction ? (
					<UnderConstruction />
				) : (
					<>
						<h3>Controls</h3>
						{/*prettier-ignore*/}
						<pre>
						Left/Right Mouse Buttons: Combat - W, A, S, D: Movement - Shift: Sprint - Esc: Pause Menu
						</pre>
						{!isLoaded && <p>Loading... {Math.round(progress * 100)}%</p>}
						{isClient && (
							<Unity
								unityProvider={unityProvider}
								className="p-3 w-100 h-100"
								style={{ maxWidth: "90vw", maxHeight: "90vh" }}
							/>
						)}
					</>
				)}
			</div>
		</>
	);
}
