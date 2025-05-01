import { Button, Form, Input, Card, Typography, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginService } from "../Service";
import "../Auth.css";

const { Title } = Typography;

function Login() {
	const navigate = useNavigate();

	useEffect(() => {
		const accessToken = localStorage.getItem("access_token");
		const refreshToken = localStorage.getItem("refresh_token");

		if (accessToken && refreshToken) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<div className="div-card-form">
			<Card className="card-form">
				<Title level={3} style={{ textAlign: "center" }}>Войти</Title>
				<LoginForm />
			</Card>
		</div>
	);
}

const LoginForm = () => {
	const onFinish = (values) => {
		const { identifier, password } = values;
		let payload = { password };

		if (/^\S+@\S+\.\S+$/.test(identifier)) {
			payload.email = identifier;
		} else if (/^\+?\d{10,15}$/.test(identifier)) {
			payload.phone_number = identifier;
		} else {
			payload.user_name = identifier;
		}

		LoginService(payload);
	};

	return (
		<>
			<Form name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
				<Form.Item label="Электронная почта, имя пользователя или телефон" name="identifier" 
							rules={[{ required: true, message: "Введите ваш email, имя пользователя или телефон!" }]}>
					<Input placeholder="+1234567890 | example@example.com | username" />
				</Form.Item>

				<Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Введите пароль!" }]}>
					<Input.Password placeholder="Введите пароль" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" block>Войти</Button>
				</Form.Item>
			</Form>
			<Link to='/register'>Зарегаться</Link>
		</>
	);
};

export default Login;
