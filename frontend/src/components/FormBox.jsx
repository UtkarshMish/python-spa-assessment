import {
	Box,
	Button,
	Input,
	InputGroup,
	InputLeftAddon,
	Text
} from "@chakra-ui/react";
import React from "react";
import { MdMailOutline } from "react-icons/md";
import { RiLock2Fill, RiUser3Fill } from "react-icons/ri";
import { createUser, loginUser } from "../utils/apiFunctions";
export default function FormBox({
	type = "login",
	isSuccess,
	setSuccess,
	setCurrent
}) {
	const iconSize = 20;
	const inputHeight = 12;
	const inputMargin = 5;
	const inputBackground = "linkedin.500";
	async function submitData(e) {
		e.preventDefault();
		const username = e.target.username?.value || "";
		const password = e.target.password?.value || "";
		const email = e.target.email?.value || "";
		const response = await (type === "login"
			? loginUser({ username, password })
			: createUser({ username, password, email }));
		if (setSuccess && type === "register") {
			setCurrent("login");
			setSuccess(response);
			setTimeout(() => {
				setSuccess(null);
			}, 3500);
		}
	}
	return (
		<form style={{ margin: "1rem", width: "100%" }} onSubmit={submitData}>
			<InputGroup marginBlock={inputMargin}>
				<InputLeftAddon background={inputBackground} height={inputHeight}>
					<RiUser3Fill size={iconSize} style={{ color: "white" }} />
				</InputLeftAddon>
				<Input
					placeholder="Username"
					type={"text"}
					name="username"
					height={inputHeight}
				/>
			</InputGroup>
			<InputGroup marginBlock={inputMargin}>
				<InputLeftAddon background={inputBackground} height={inputHeight}>
					<RiLock2Fill size={iconSize} style={{ color: "white" }} />
				</InputLeftAddon>
				<Input
					placeholder="Password"
					type={"password"}
					name="password"
					height={inputHeight}
				/>
			</InputGroup>
			{type === "register" && (
				<InputGroup marginBlock={inputMargin}>
					<InputLeftAddon background={inputBackground} height={inputHeight}>
						<MdMailOutline size={iconSize} style={{ color: "white" }} />
					</InputLeftAddon>
					<Input
						placeholder="Email"
						type={"email"}
						name="email"
						height={inputHeight}
					/>
				</InputGroup>
			)}
			{isSuccess != null && (
				<Box marginBlock={"4"}>
					<Text
						textColor={isSuccess ? "green.700" : "red.500"}
						fontSize={"sm"}
						fontWeight={"semibold"}
						fontFamily={"sans-serif"}>
						{isSuccess
							? "You have Successfully Registered"
							: "Failed to Register User"}
					</Text>
				</Box>
			)}
			<Box>
				<Button
					type="submit"
					textColor={"white"}
					colorScheme={"linkedin"}
					width={"100%"}>
					{type === "login" ? "Login" : "Register"}
				</Button>
			</Box>
		</form>
	);
}
