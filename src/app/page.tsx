import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

export default function Home() {
  return (
    <>
      <div className="p-3 flex justify-center items-center min-h-screen bg-black">
        <iframe
          src={`${process.env.GAME_PATH}`}
          width="100%"
          height="100%"
          className="border-none min-h-screen w-full"
          style={{ height: "100vh" }}
        />
      </div>
    </>
  );
}
