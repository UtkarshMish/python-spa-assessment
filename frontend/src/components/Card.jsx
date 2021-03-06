import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toCapitalise } from "../utils/helperMethod";
import FormBox from "./FormBox";

export default function Card({ setLoggedIn }) {
	const pageHeadings = ["login", "register"];
	const [current, setCurrent] = useState(pageHeadings[0]);
	const [isSuccess, setIsSuccess] = useState(null);
	useEffect(() => {
		if (isSuccess === true && current === "login" && setLoggedIn) {
			setLoggedIn(true);
		}
	}, [isSuccess, current, setLoggedIn]);
	const handleFormChange = (option) => {
		setCurrent(option);
		setIsSuccess(null);
	};
	return (
		<Box
			background="white"
			minHeight={"28rem"}
			width={"28rem"}
			display={"flex"}
			borderRadius={"md"}
			alignItems={"center"}
			flexDir={"column"}
			padding={"7"}>
			<Heading
				borderBottom={"1px solid #021012"}
				width={"100%"}
				textColor={"gray.700"}
				paddingBlock={"3"}>
				{toCapitalise(current)}
			</Heading>
			<Box display={"flex"} alignSelf={"flex-start"}>
				{pageHeadings.map((head, id) => (
					<Heading
						key={id}
						size={"md"}
						margin={"3"}
						textColor={head === current ? "linkedin.500" : "GrayText"}
						paddingBottom={"2"}
						borderBottomWidth={"thick"}
						cursor={"pointer"}
						onClick={() => handleFormChange(pageHeadings[id])}
						borderBottom={head === current ? "4px" : "initial"}>
						{capitalise(head)}
					</Heading>
				))}
			</Box>
			<Box display={"flex"} alignSelf={"flex-start"} width={"100%"}>
				<FormBox
					type={current}
					isSuccess={isSuccess}
					setSuccess={setIsSuccess}
					setCurrent={setCurrent}
				/>
			</Box>
		</Box>
	);
}

function capitalise(text = "") {
	return text[0].toUpperCase() + text.slice(1);
}
