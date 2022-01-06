import axios from "axios";

export async function createUser({ username = "", password = "", email = "" }) {
	try {
		if (username.length > 2 && password.length > 3 && email.length > 2) {
			const { data } = await axios.post("/api/user", { username, password, email });

			return data.message || false;
		}
	} catch (e) {
		console.log(e);
	}
	return false;
}

export async function loginUser({ username = "", password = "" }) {
	if (username.length > 2 && password.length > 3) {
		const { data } = await axios.post("/api/auth", { username, password });

		return data.message || false;
	}
	return false;
}
