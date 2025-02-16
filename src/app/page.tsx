"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import UnderConstruction from "./components/underConstruction";

export default function Home() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/UnityLoader.js",
    dataUrl: "/Build/Build.data",
    frameworkUrl: "/Build/Build.framework.js",
    codeUrl: "/Build/Build.wasm",
  });
  const underConstruction = process.env.NEXT_PUBLIC_UNITY_ENABLED
    ? true
    : false;
  return (
    <>
      <div className="container-sm p-3 ">
        <h1 className="text-center">The Wilting Demo</h1>
        {underConstruction ? (
          <UnderConstruction />
        ) : (
          <Unity
            unityProvider={unityProvider}
            className="border-none min-h-screen w-full"
            style={{ height: "100vh" }}
          />
        )}
      </div>
    </>
  );
}
