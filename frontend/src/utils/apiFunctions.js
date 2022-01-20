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

		return data.auth || false;
	}
	return false;
}

export async function checkUserInSession() {
	const { data } = await axios.post("/api/auth");
	if (data && data.auth) {
		return data.auth;
	} else {
		return false;
	}
}

export async function forgotPassword({ email, mobileNumber, password = null }) {
	try {
		const requestData = { email, mobileNumber };
		if (password && String(password).length > 2) {
			requestData.newPassword = password;
		}
		const { data } = await axios.post("/api/forgot-password", requestData);
		if (data && data.message) {
			return data.message;
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
}
export async function checkMobileNumber() {
	try {
		const { data } = await axios.post("/api/mobile-number");
		if (data && data.message) {
			return data.message;
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
}
export async function setMobileNumber({ mobile }) {
	try {
		const { data } = await axios.post("/api/mobile-number", { mobile });
		if (data && data.success) {
			return data.success;
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
}
