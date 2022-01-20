import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MdMailOutline } from "react-icons/md";
import { RiLock2Fill, RiUser3Fill } from "react-icons/ri";
import { createUser, loginUser } from "../utils/apiFunctions";
import EmailForm from "./EmailForm";
import { InputItem } from "./InputItem";
import ModalView from "./ModalView";
import { ResultBox } from "./ResultBox";
export default function FormBox({
	type = "login",
	isSuccess,
	setSuccess,
	setCurrent
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	async function submitData(e) {
		e.preventDefault();
		const username = e.target.username?.value || "";
		const password = e.target.password?.value || "";
		const email = e.target.email?.value || "";
		const csrf_token = e.target._csrf_token?.value || "";
		const response = await (type === "login"
			? loginUser({ username, password, csrf_token })
			: createUser({ username, password, email, csrf_token }));
		if (setSuccess && type === "register") {
			setTimeout(() => {
				setSuccess(null);
				setCurrent("login");
			}, 3500);
			setSuccess(response);
		} else if (type === "login") {
			setSuccess(response);
		}
	}
	return (
		<form style={{ margin: "1rem", width: "100%" }} onSubmit={submitData}>
			<InputItem
				nameValue="_csrf_token"
				typeValue="hidden"
				defaultValue={document.getElementById("_csrf_token")?.content}
			/>
			<InputItem nameValue="username" Icon={RiUser3Fill} pattern={"\\w{3,}"} />
			<InputItem
				nameValue="password"
				typeValue="password"
				Icon={RiLock2Fill}
				pattern={"\\S{4,}"}
			/>
			{type === "register" ? (
				<InputItem nameValue="email" typeValue="email" Icon={MdMailOutline} />
			) : (
				<>
					<Button
						marginBlock={2}
						variant={"outline"}
						colorScheme={"green"}
						onClick={onOpen}>
						Forgot Password ?
					</Button>
					<ModalView isOpen={isOpen} onClose={onClose} titleText="Forgot Password ?">
						<EmailForm />
					</ModalView>
				</>
			)}
			{isSuccess != null && <ResultBox isSuccess={isSuccess} type={type} />}
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
