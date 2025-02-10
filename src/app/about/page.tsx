import "bootstrap/dist/css/bootstrap.min.css";
// import { resumeHTML } from "../components/resume";
import CollapsibleIframe from "../components/collapsibleFrame";
import Image from "next/image";
import headShot from "../assets/Headshot.jpg";
import lsrhs from "../assets/lsrhs.jpg";
import gristMill from "../assets/wayside-inn-grist-mill.jpg";
import fsu from "../assets/fsu.jpg";
import "../global.css";

export default async function About() {
  // const pdfData = await fetch( //Re-enable when resumeHTML is finished
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/getPdf?${new URLSearchParams({
  //     fileName: process.env.CURRENT_RESUME || "",
  //   })}`
  // );

  return (
    <>
      <h1 className={"p-5 text-white text-center fs-sm-1"}>
        &quot;Try not to become a man of success, but rather try to become a man
        of value&quot;
        <br />- Albert Einstein
      </h1>
      <div className="container-sm p-3">
        <div className="row align-items-center g-5">
          <div className="col-sm-6">
            <Image src={headShot} alt={"Test image"} className="img-fluid" />
          </div>

          <div className="col-sm-6 text-center">
            {/* prettier-ignore */}
            <p className="fs-sm-10">
              For the last 3 years I have worked for Eurogarages America (EGA) as a Full Stack Developer I and was promoted to II after 2 years. 
            I was responsible for greenfield development and updating/supporting EGA&apos;s (EGA) SmartRewards application. I mostly work on the 
            back-end. However I obviously have front-end experience. For Smartrewards version 6 I worked with ResultStack, 
            Forter and Chase Merchant services to integrate credit/debit payments.
            <br/> <br/>
              Supporting the high ROI projects is very important, however my passion is in architecting and developing greenfield projects. 
            I found I learn the most when creating something from the ground up. Working hand in hand with my team and stakeholders I had 
            the opportunity to build exciting new applications at EGA.
            <br/> <br/>
              In my free time I enjoy tinkering around in Unity and UE5 in hopes to create a video game that I can bring to the market.
          </p>
          </div>
        </div>
      </div>
      <div className="container-sm justify-content-center align-items-center p-3">
        <div className="row">
          <h2>Resume</h2>
          <div className="dropdown m-3">
            <CollapsibleIframe buttonLabel={"PDF Viewer"}>
              <iframe
                src={process.env.CURRENT_RESUME}
                width="100%"
                style={{ padding: "1%", alignContent: "center" }}
                height="750px"
                title="PDF Viewer"
              />
            </CollapsibleIframe>
          </div>
          {/* {resumeHTML((await pdfData.json()).message)} //Currently busted, is it worth the work?*/}
        </div>
      </div>
      <div className="row p-3">
        <div
          id="dynamicCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="container-sm">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="align-items-center">
                  <Image
                    src={gristMill}
                    id="carouselItem"
                    className="d-block w-100"
                    alt="Wayside Inn Grist Mill"
                  />
                </div>
              </div>

              <div className="carousel-item">
                <div className="align-items-center">
                  <Image
                    src={lsrhs}
                    id="carouselItem"
                    className="d-block w-100"
                    alt="Lincoln-Sudbury Regional Highschool"
                  />
                </div>
              </div>

              <div className="carousel-item">
                <div className="align-items-center">
                  <Image
                    src={fsu}
                    id="carouselItem"
                    className="d-block w-100"
                    alt="Framingham State University"
                  />
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              id="carouselButton"
              type="button"
              data-bs-target="#dynamicCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              id="carouselButton"
              type="button"
              data-bs-target="#dynamicCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* <script //Pretty sure LinkedIn is blocking this.
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
