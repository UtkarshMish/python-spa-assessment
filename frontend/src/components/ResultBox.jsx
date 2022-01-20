import { Box, Text } from "@chakra-ui/react";
export function ResultBox({ isSuccess, type = "register" }) {
	const failedMessage =
		type === "login" ? "User name or Password invalid" : "Failed to Register User";
	return (
		<Box marginBlock={"4"}>
			<Text
				textColor={isSuccess ? "green.700" : "red.500"}
				fontSize={"sm"}
				fontWeight={"semibold"}
				fontFamily={"sans-serif"}>
				{isSuccess ? "You have Successfully Registered" : failedMessage}
			</Text>
		</Box>
	);
}
