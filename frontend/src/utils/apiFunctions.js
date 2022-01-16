import axios from "axios";

export async function createUser({
	username = "",
	password = "",
	email = "",
	csrf_token = ""
}) {
	try {
		if (username.length > 2 && password.length > 3 && email.length > 2) {
			const { data } = await axios.post("/api/user", {
				user_name: username,
				email,
				password,
				_csrf_token: csrf_token
			});
			return data.success || false;
		}
	} catch (e) {
		console.log(e);
	}
	return false;
}

export async function loginUser({
	username = "",
	password = "",
	csrf_token = ""
}) {
	if (username.length > 2 && password.length > 3) {
		const { data } = await axios.post("/api/auth", {
			user_name: username,
			password,
			_csrf_token: csrf_token
		});

		return data.message || false;
	}
	return false;
}
