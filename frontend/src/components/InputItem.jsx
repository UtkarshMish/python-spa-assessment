import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { toCapitalise } from "../utils/helperMethod";

export function InputItem({
	iconSize = 20,
	inputHeight = 12,
	inputMargin = 5,
	inputBackground = "linkedin.500",
	nameValue,
	typeValue = "text",
	fontColor = "white",
	defaultValue = "",
	Icon
}) {
	return (
		<InputGroup marginBlock={inputMargin}>
			{Icon && (
				<InputLeftAddon background={inputBackground} height={inputHeight}>
					<Icon size={iconSize} style={{ color: fontColor }} />
				</InputLeftAddon>
			)}
			<Input
				required
				defaultValue={defaultValue}
				placeholder={toCapitalise(nameValue)}
				type={typeValue}
				name={nameValue}
				height={inputHeight}
			/>
		</InputGroup>
	);
}
