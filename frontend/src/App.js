import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import Card from "./components/Card";

function App() {
	return (
		<ChakraProvider theme={theme}>
			<Box
				textAlign="center"
				fontSize="xl"
				background={"gray.700"}
				height={"100vh"}
				maxWidth={"100vw"}
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
				overflow={"auto"}>
				<Card />
			</Box>
		</ChakraProvider>
	);
}

export default App;
