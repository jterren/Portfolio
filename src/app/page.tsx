"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import headShot from "./assets/Headshot.jpg";
import lsrhs from "./assets/lsrhs.jpg";
import gristMill from "./assets/wayside-inn-grist-mill.jpg";
import fsu from "./assets/fsu.jpg";
import React from "react";
import Loading from "./components/Loading";
import { CarouselItem } from "./components/carouselItem";
import "./global.css";
export const dynamic = "force-dynamic"; //Ensure any changes to quotes or bio on backend are loaded upon refresh.

export default function Home() {
	// const [pdfData, setPdfData] = React.useState<PDFLine[]>([]);
	// const [loadingPdfData, setPdfDataLoading] = React.useState<boolean>(true);
	const [bio, setBio] = React.useState<string>("");
	const [loadingBio, setBioLoading] = React.useState<boolean>(true);
	const [quote, setQuote] = React.useState<quote>({
		author: "Albert Einstein",
		text: "Try not to become a man of success, but rather try to become a man of value.",
	});
	const [loadingQuote, setQuoteLoading] = React.useState<boolean>(true);

	// const fetchPdf = React.useCallback(async () => {
	// 	await fetch(`/api/getPdf`)
	// 		.then(async (res) => {
	// 			if (!res.ok) {
	// 				throw new Error(`${res.status} - Server error occurred`);
	// 			}
	// 			return await res.json();
	// 		})
	// 		.then((body) => {
	// 			setPdfData(body.data);
	// 			setPdfDataLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.error("Error fetching pdf content:", err);
	// 		});
	// }, []);

	const fetchBio = React.useCallback(async () => {
		await fetch("/api/mongoRead?collection=posts&title=Bio")
			.then(async (res) => await res.json())
			.then((body) => {
				if (body.success && body.data.length > 0) {
					setBio(body.data[0].text);
					setBioLoading(false);
				}
			})
			.catch((err) => console.error("Error fetching bio:", err));
	}, []);

	const fetchQuote = React.useCallback(async () => {
		await fetch("/api/mongoRead?collection=quotes")
			.then(async (res) => await res.json())
			.then((body) => {
				if (body.success && body.data.length > 0) {
					const randomIndex = Math.floor(Math.random() * body.data.length);
					setQuote(body.data[randomIndex]);
					setQuoteLoading(false);
				}
			})
			.catch((err) => console.error("Error fetching quote:", err));
	}, []);

	React.useEffect(() => {
		// fetchPdf();
		fetchBio();
		fetchQuote();
	}, [fetchBio, /*fetchPdf,*/ fetchQuote]);

	return loadingQuote || /*loadingPdfData ||*/ loadingBio ? (
		<Loading />
	) : (
		<>
			<h1 className={"p-5 text-white text-center fs-sm-1"}>
				&quot;{quote.text}&quot;
				<br />- {quote.author}
			</h1>

			<div className="container-sm p-3">
				<div className="row align-items-center g-5">
					<div className="col-sm-6">
						<div
							id="dynamicCarousel"
							className="carousel slide"
							data-bs-ride="carousel"
						>
							<div className="container-sm">
								<div className="carousel-inner">
									<div className="carousel-item active">
										<CarouselItem
											img={headShot}
											altText="Jacob Terren"
											fitImg={true}
										/>
									</div>
									<div className="carousel-item">
										<CarouselItem
											img={fsu}
											altText="Framingham State University"
											fitImg={true}
										/>
									</div>
									<div className="carousel-item">
										<CarouselItem
											img={lsrhs}
											altText="Lincoln-Sudbury Regional Highschool"
											fitImg={false}
										/>
									</div>
									<div className="carousel-item">
										<CarouselItem
											img={gristMill}
											altText="Wayside Inn Grist Mill"
											fitImg={true}
										/>
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
					<div className="col-sm-6">
						<p className="fs-sm-10" style={{ whiteSpace: "pre-line" }}>
							{bio}
						</p>
					</div>
				</div>
			</div>
			<div className="container-sm justify-content-center align-items-center p-3">
				<div className="row p-3">
					<iframe
						src={process.env.NEXT_PUBLIC_CURRENT_RESUME}
						width="100%"
						style={{ padding: "1%", alignContent: "center" }}
						height="750px"
						title="PDF Viewer"
					/>
					{/* <div className="dropdown m-3">
						<CollapsibleIframe buttonLabel={"HTML Viewer"}>
							{resumeHTML(pdfData)}
						</CollapsibleIframe>
					</div> */}
				</div>
			</div>
		</>
	);
}
