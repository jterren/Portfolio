import "bootstrap/dist/css/bootstrap.min.css";
import { resumeHTML } from "../components/resume";
import CollapsibleIframe from "../components/collapsibleFrame";

export default async function About() {
  const pdfData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getPdf?${new URLSearchParams({
      fileName: process.env.CURRENT_RESUME || "",
    })}`
  );

  return (
    <>
      <div className="container-sm justify-content-center align-items-center">
        <div className="dropdown">
          <CollapsibleIframe buttonLabel={"PDF Viewer"}>
            <iframe
              src={process.env.CURRENT_RESUME}
              width="100%"
              style={{ padding: "5%", alignContent: "center" }}
              height="600px"
              title="PDF Viewer"
            />
          </CollapsibleIframe>
        </div>
        {resumeHTML((await pdfData.json()).message)}
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
