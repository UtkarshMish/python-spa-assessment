import { Box, Text } from "@chakra-ui/react";
export function ResultBox({ isSuccess }) {
	return (
		<Box marginBlock={"4"}>
			<Text
				textColor={isSuccess ? "green.700" : "red.500"}
				fontSize={"sm"}
				fontWeight={"semibold"}
				fontFamily={"sans-serif"}>
				{isSuccess ? "You have Successfully Registered" : "Failed to Register User"}
			</Text>
		</Box>
	);
}
