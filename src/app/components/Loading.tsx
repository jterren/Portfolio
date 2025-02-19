import Image from "next/image";

export default function Loading() {
  return (
    <Image
      src={"/slime_bounce.gif"}
      alt="Bouncing Slime by Jake Terren"
      width={64}
      height={64}
      unoptimized
    />
  );
}
