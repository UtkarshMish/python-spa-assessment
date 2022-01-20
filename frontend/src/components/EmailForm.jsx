import { Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { forgotPassword } from "../utils/apiFunctions";
import { InputItem } from "./InputItem";

export default function EmailForm() {
	const [showNewPassword, setShowNewPassword] = useState(null);
	const [showMessage, setShowMessage] = useState(false);
	const [email, setEmail] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [password, setPassword] = useState("");
	async function checkIfUserExist() {
		if (email && email.length > 2 && mobileNumber && mobileNumber.length === 10) {
			const responseData = { email, mobileNumber };
			if (showNewPassword) {
				responseData.password = password;
			}
			const response = await forgotPassword(responseData);
			setShowNewPassword(response);
			setShowMessage(response === true ? "success" : "failed");
			setTimeout(() => {
				setShowMessage(null);
			}, 2000);
		}
	}
	return (
		<form
			style={{
				display: "flex",
				flexDirection: "column"
			}}>
			<InputItem
				typeValue="email"
				nameValue={"email"}
				value={email}
				changeHandler={setEmail}
			/>
			<InputItem
				typeValue="number"
				nameValue={"number"}
				value={mobileNumber}
				changeHandler={setMobileNumber}
			/>
			{showNewPassword != null && (
				<InputItem
					typeValue="password"
					nameValue={"password"}
					value={password}
					changeHandler={setPassword}
				/>
			)}
			{showMessage && (
				<Text
					fontWeight={"bold"}
					textAlign={"center"}
					textColor={showMessage === "success" ? "green.300" : "red.300"}
					marginBlock={2}>
					{showMessage}
				</Text>
			)}
			<Button onClick={checkIfUserExist}>Submit</Button>
		</form>
	);
}
