import { Box, Button, Heading, Link } from "@chakra-ui/react";
import React from "react";
export default function Home() {
	return (
		<Box
			background={"white"}
			width={"100%"}
			height={"inherit"}
			marginInline={2}
			display={"flex"}
			flexDirection={"column"}>
			<NavBar />
			<Box background={"whiteAlpha.700"} flex={"auto"}>
				Container
			</Box>
		</Box>
	);
}
function NavBar() {
	return (
		<Box
			display={"flex"}
			padding={2}
			borderRadius={"base"}
			justifyContent={"space-between"}>
			<Heading
				style={{ fontVariant: "all-small-caps" }}
				flex={"auto"}
				marginLeft={"5rem"}>
				Main Page
			</Heading>
			<Button as={Link} href="/logout">
				Logout
			</Button>
		</Box>
	);
}
