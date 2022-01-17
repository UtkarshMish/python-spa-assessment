import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Home from "./components/Home";
import Loader from "./components/Loader";
import { checkUserInSession } from "./utils/apiFunctions";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	useEffect(() => {
		const checkAuth = async () => {
			const response = await checkUserInSession();
			setIsLoggedIn(response);
		};

		checkAuth();
	}, []);
	const MainItem = isLoggedIn ? Home : Card;
	return (
		<ChakraProvider theme={theme}>
			{isLoggedIn === null ? (
				<Loader />
			) : (
				<Box
					textAlign="center"
					fontSize="xl"
					background="gray.700"
					height="100vh"
					maxWidth="100vw"
					display="flex"
					justifyContent="center"
					alignItems="center"
					overflow="auto">
					<MainItem setLoggedIn={setIsLoggedIn} />
				</Box>
			)}
		</ChakraProvider>
	);
}

export default App;
