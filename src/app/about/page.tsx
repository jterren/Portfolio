import "bootstrap/dist/css/bootstrap.min.css";

export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const data: object = await fetch("/api/getResume").then((res) => res.json());
  console.log("Data:\n", data);
  return data;
}

export default async function About(props: { data: object }) {
  console.log("Recieved:\n", props.data);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <iframe
          src="/Terren_Resume.pdf"
          width="90%"
          style={{ padding: "5%", alignContent: "center" }}
          height="600px"
          title="PDF Viewer"
        />
      </div>
      {/* <script
				src="https://platform.linkedin.com/badges/js/profile.js"
				async
				defer
				type="text/javascript"
			></script>
			<div
				className="badge-base LI-profile-badge"
				data-locale="en_US"
				data-size="medium"
				data-theme="dark"
				data-type="VERTICAL"
				data-vanity="jacob-terren"
				data-version="v1"
			></div> */}
    </>
  );
}
