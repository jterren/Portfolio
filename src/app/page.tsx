"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import headShot from "./assets/Headshot.jpg";
import lsrhs from "./assets/lsrhs.jpeg";
import gristMill from "./assets/wayside-inn-grist-mill.jpg";
import fsu from "./assets/fsu.jpg";

export default function Home() {
	return (
		<>
			<h1 className={"p-5 text-white text-center"}>
				Welcome, please take your shoes off.
			</h1>
			{/*First container*/}
			<div className="container-sm p-3">
				{/*First row*/}
				<div className="row align-items-center g-5">
					<div className="col-sm-6 text-center">
						<Image
							src={headShot}
							alt={"Test image"}
							layout="responsive"
							className="Image-fluid"
						/>
					</div>

					<div className="col-sm-6 text-center">
						{/* prettier-ignore */}
						<p>
              For the last 3 years I have worked for Eurogarages America (EGA) as a Full Stack Developer I and was promoted to II after 2 years. 
            was responsible for greenfield development and updating/supporting EGA&apos;s (EGA) SmartRewards application. I mostly work on the 
            back-end, however I obviously have front-end experience. For Smartrewards version 6; I worked with ResultStack, 
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
				{/*First row end*/}

				{/*Second row*/}
				<div className="row">
					<div id="carousel_a" className="carousel slide">
						<div className="carousel-inner">
							<div className="carousel-item active">
								<Image src={lsrhs} className="d-block w-100" alt="..." />
							</div>
							<div className="carousel-item">
								<Image src={gristMill} className="d-block w-100" alt="..." />
							</div>
							<div className="carousel-item">
								<Image src={fsu} className="d-block w-100" alt="..." />
							</div>
						</div>
						<button
							className="carousel-control-prev"
							type="button"
							data-bs-target="#carousel_a"
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
							type="button"
							data-bs-target="#carousel_a"
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
				{/*Second row end*/}
			</div>
			{/*First container end*/}
		</>
	);
}
