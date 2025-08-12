"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../global.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import UnderConstruction from "../components/underConstruction";

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

	return (
		<>
			<div className="m-3 d-flex flex-column justify-content-center align-items-center">
				<h1 className="text-center">The Wilting - Alpha</h1>
				{underConstruction ? (
					<UnderConstruction />
				) : (
					<>
						{!isLoaded && (
							<p>Loading... {Math.round(loadingProgression * 100)}%</p>
						)}
						<Unity
							unityProvider={unityProvider}
							className="p-3 w-100 h-100"
							style={{ maxWidth: "90vw", maxHeight: "90vh" }}
						/>

						{/*prettier-ignore*/}
						<pre>{`- Attack: L/R Mouse Buttons\t\t- Movement: W,A,S,D\t\t- Sprint: Shift\t\t- Pause: Esc`}</pre>
					</>
				)}
			</div>
		</>
	);
}
