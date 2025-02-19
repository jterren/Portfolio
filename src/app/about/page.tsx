"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import CollapsibleIframe from "../components/collapsibleFrame";
import Image from "next/image";
import headShot from "../assets/Headshot.jpg";
import lsrhs from "../assets/lsrhs.jpg";
import gristMill from "../assets/wayside-inn-grist-mill.jpg";
import fsu from "../assets/fsu.jpg";
import "../global.css";
import resumeHTML from "../components/resume";
import React from "react";
import Loading from "../components/Loading";
export const dynamic = "force-dynamic";

export default function About() {
  const [pdfData, setPdfData] = React.useState<PDFLine[]>([]);
  const [loadingPdfData, setPdfDataLoading] = React.useState<boolean>(true);
  const [bio, setBio] = React.useState<string>("");
  const [loadingBio, setBioLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    fetch(`/api/getPdf`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} - Server error occurred`);
        }
        return response.json();
      })
      .then((body) => {
        setPdfData(body.data);
        setPdfDataLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pdf content:", err);
      });

    fetch("/api/mongoRead?collection=posts&title=Bio", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setBio(data.data[0].body);
          setBioLoading(false);
        }
      })
      .catch((err) => console.error("Error fetching bio:", err));
  }, []);

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

          <div className="col-sm-6">
            {/* prettier-ignore */}
            {!loadingBio ? (
              <p className="fs-sm-10" style={{ whiteSpace: "pre-line" }}>
                {bio}
              </p>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
      <div className="container-sm justify-content-center align-items-center p-3">
        <div className="row p-3">
          <h2>Resume</h2>
          <div className="dropdown m-3">
            <CollapsibleIframe buttonLabel={"PDF Viewer"}>
              <iframe
                src={process.env.NEXT_PUBLIC_CURRENT_RESUME}
                width="100%"
                style={{ padding: "1%", alignContent: "center" }}
                height="750px"
                title="PDF Viewer"
              />
            </CollapsibleIframe>
          </div>
          <div className="dropdown m-3">
            <CollapsibleIframe buttonLabel={"View HTML"}>
              {!loadingPdfData ? resumeHTML(pdfData) : <Loading />}
            </CollapsibleIframe>
          </div>
        </div>
      </div>
      <div className="row p-5">
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
    </>
  );
}
