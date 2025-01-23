"use client";

import { useEffect } from "react";

const BootstrapClient = () => {
	useEffect(() => {
		//@ts-expect-error bootstrap import
		import("bootstrap/dist/js/bootstrap.bundle.min.js");
	}, []);

	return null;
};

export default BootstrapClient;
