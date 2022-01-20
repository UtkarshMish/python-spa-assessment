import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from "@chakra-ui/react";
import React from "react";

export default function ModalView({ isOpen, onClose, titleText, children }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textColor={"Background"}>{titleText}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{children}</ModalBody>

				<ModalFooter>
					<Button colorScheme="red" mr={3} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
