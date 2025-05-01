import axios from 'axios';

async function GetCurrentUser(mes) {
	const token = localStorage.getItem('access_token');
	console.log(token);
	await axios.get("http://127.0.0.1:9000/user/current-user", {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	})
		.then(response => {
			if (response.status === 200) {
				localStorage.setItem("user_name", response.data.user_name);
				localStorage.setItem("first_name", response.data.first_name);
				localStorage.setItem("email", response.data.email);
				localStorage.setItem("phone_number", response.data.phone_number);
				localStorage.setItem("req_count", response.data.req_count);
				localStorage.setItem("id", response.data.id);
			}
		})
		.catch(error => {
			console.log(error);
			mes(error.response?.data?.detail || "Ошибка сервера, попробуйте позже.", 'error');
		});
}

async function CreateNewAPIKeyService(messageApi) {
	const mes = (text, type) => messageApi.open({ type, content: text, className: 'custom-class', style: { marginTop: '20vh' } });
	const token = localStorage.getItem("access_token");
	if (!token) {
		mes("Вы не авторизованы.", 'error');
		return;
	}

	await axios.get("http://127.0.0.1:9000/api-key/create-new-api-key", {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	})
		.then(response => {
			if (response.status === 200) {
				localStorage.setItem("api-key", response.data.api_key);
				mes("API-ключ успешно создан", 'success');
				return response.data.api_key;
			}
		})
		.catch(error => {
			mes(error.response?.data?.detail || "Ошибка сервера, попробуйте позже.", 'error');
		});
}

async function DeleteAPIKeyService(messageApi) {
	const mes = (text, type) => messageApi.open({ type, content: text, className: 'custom-class', style: { marginTop: '20vh' } });
	const token = localStorage.getItem("access_token");
	if (!token) {
		mes("Вы не авторизованы.", 'error');
		return;
	}

	await axios.delete("http://127.0.0.1:9000/api-key/delete-api-key", {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	})
		.then(response => {
			if (response.status === 200) {
				mes("API-ключ успешно уделан", 'success');
				localStorage.removeItem("api-key");
				return true;
			}
		})
		.catch(error => {
			mes(error.response?.data?.detail || "Ошибка сервера, попробуйте позже.", 'error');
		});
}

export { CreateNewAPIKeyService, DeleteAPIKeyService, GetCurrentUser };
