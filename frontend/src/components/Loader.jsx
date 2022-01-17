import { Box, Spinner } from "@chakra-ui/react";

export default function Loader() {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			maxWidth={"100vw"}
			height={"100vh"}
			overflow={"auto"}>
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="white"
				color="blue.500"
				size="xl"
			/>
		</Box>
	);
}
