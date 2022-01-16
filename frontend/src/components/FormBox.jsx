import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { MdMailOutline } from "react-icons/md";
import { RiLock2Fill, RiUser3Fill } from "react-icons/ri";
import { createUser, loginUser } from "../utils/apiFunctions";
import { InputItem } from "./InputItem";
import { ResultBox } from "./ResultBox";
export default function FormBox({
	type = "login",
	isSuccess,
	setSuccess,
	setCurrent
}) {
	async function submitData(e) {
		e.preventDefault();
		const username = e.target.username?.value || "";
		const password = e.target.password?.value || "";
		const email = e.target.email?.value || "";
		const csrf_token = e.target._csrf_token?.value || "";
		const response = await (type === "login"
			? loginUser({ username, password, csrf_token })
			: createUser({ username, password, email, csrf_token }));
		if (setSuccess) {
			setSuccess(response);
			setTimeout(() => {
				setSuccess(null);
			}, 3500);

			if (response === true && type === "register") {
				setCurrent("login");
			}
		}
	}
	return (
		<form style={{ margin: "1rem", width: "100%" }} onSubmit={submitData}>
			<InputItem
				nameValue="_csrf_token"
				typeValue="hidden"
				defaultValue={document.getElementById("_csrf_token")?.content}
			/>
			<InputItem nameValue="username" Icon={RiUser3Fill} />
			<InputItem nameValue="password" typeValue="password" Icon={RiLock2Fill} />
			{type === "register" && (
				<InputItem nameValue="email" typeValue="email" Icon={MdMailOutline} />
			)}
			{isSuccess != null && <ResultBox isSuccess={isSuccess} />}
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
