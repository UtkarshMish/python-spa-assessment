import React, { StrictMode } from "react";
import reactDom from "react-dom";
import App from "./App";

reactDom.hydrate(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("root")
);
