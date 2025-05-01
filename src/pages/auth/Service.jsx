import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function AuthService(url, values) {
	axios
		.post(url, values)
		.then((response) => {
			if (response.status === 200) {
				localStorage.setItem("access_token", response.data.access_token);
				localStorage.setItem("refresh_token", response.data.refresh_token);
				if (response.data.api_key) {
					localStorage.setItem("api-key", response.data.api_key);
				}
				setTimeout(() => { window.location.href = "/profile" }, 1000);
			}
		})
		.catch((error) => {
			if (error) {
				console.error(error);
			} else {
				console.error("Ошибка сервера попробуйте пожалуйста позже.", 'error');
			}
		})
}

function RegisterService(values) {
	AuthService("http://127.0.0.1:9000/auth/register", values)
}

function LoginService(values) {
	AuthService("http://127.0.0.1:9000/auth/login", values)
}

function Logout() {
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("api-key");
		navigate("/login");
	}, [navigate]);

	return null;
}
export { RegisterService, LoginService, Logout };
