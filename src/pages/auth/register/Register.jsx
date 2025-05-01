import { Button, Checkbox, Form, Input, Card, Typography, message } from "antd";
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {RegisterService} from "../Service";
import "../Auth.css";

const { Title } = Typography;

function Register() {
	const navigate = useNavigate();

	useEffect(() => {
	  const accessToken = localStorage.getItem('access_token');
	  const refreshToken = localStorage.getItem('refresh_token');
  
	  if (accessToken && refreshToken) {
		navigate('/');
	  }
	}, [navigate]);

	return (
		<div className="div-card-form">
			<Card className="card-form">
				<Title level={3} style={{ textAlign: "center" }}>Регистрация</Title>
				<RegisterForms />
			</Card>
		</div>
	);
}

const RegisterForms = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const onFinish = (values) => { RegisterService(values, messageApi) };

	return (
		<>
			{contextHolder}
			<Form
				name="register"
				layout="vertical"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item label="Электронную почту" name="email" rules={[{ required: true, message: "Введите вашу электронную почту!" }]}>
					<Input placeholder="example@example.com" />
				</Form.Item>

				<Form.Item label="Номер телефона" name="phone_number" rules={[{ required: true, message: "Введите номер телефона!" }]}>
					<Input placeholder="+7 999 999-99-99" />
				</Form.Item>


				<Form.Item label="Имя пользователя" name="user_name" rules={[{ required: true, message: "Введите имя пользователя!" }]}>
					<Input placeholder="Username" />
				</Form.Item>


				<Form.Item label="Ваше имя" name="first_name" rules={[{ required: true, message: "Введите ваше имя!" }]}>
					<Input placeholder="Ваше имя" />
				</Form.Item>

				<Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Введите пароль!" }]}>
					<Input.Password placeholder="Введите пароль" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" block>Зарегистрироваться</Button>
				</Form.Item>
			</Form>
			<Link to='/login'>Войти</Link>
		</>
	);
};

export default Register;
