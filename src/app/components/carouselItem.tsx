import * as React from "react";
import Image from "next/image";

interface props extends carouselItem {
	fitImg: boolean;
}

export const CarouselItem = ({ img, altText, fitImg }: props) => {
	return (
		<div className="align-items-center">
			<Image
				src={img}
				id="carouselItem"
				alt={altText}
				className="d-block w-100"
				style={fitImg ? { aspectRatio: "1", objectFit: "cover" } : {}}
			/>
		</div>
	);
};
