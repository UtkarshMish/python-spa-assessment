import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillMobile } from "react-icons/ai";
import { checkMobileNumber, setMobileNumber } from "../utils/apiFunctions";
import { InputItem } from "./InputItem";
import Loader from "./Loader";
export default function MobileForm() {
	const [mobileCheck, setMobileCheck] = useState(null);
	useEffect(() => {
		const checkMobApi = async () => {
			const response = await checkMobileNumber();
			setMobileCheck(response);
		};
		checkMobApi();
	});
	const handleSubmit = async function (e) {
		e.preventDefault();
		const mobile = e.target.mobile.value;
		if (mobile && String(mobile).length === 10) {
			const resp = await setMobileNumber({ mobile });
			setMobileCheck(resp);
		}
	};
	if (mobileCheck === null) {
		return <Loader />;
	} else
		return mobileCheck === false ? (
			<Box width={"fit-content"} margin={"auto"}>
				<form onSubmit={handleSubmit} method="POST">
					<InputItem
						Icon={AiFillMobile}
						nameValue={"mobile"}
						pattern={"^\\d\\d{9}"}
						typeValue="number"
					/>
					<Button type="submit" colorScheme={"green"}>
						Submit
					</Button>
				</form>
			</Box>
		) : (
			<Text> All good</Text>
		);
}
