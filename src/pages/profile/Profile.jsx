import React, { useEffect, useState } from 'react';
import { Button, Card, message, Statistic, Col, Row, Typography } from 'antd';
import { useNavigate } from "react-router-dom";

import { CreateNewAPIKeyService, DeleteAPIKeyService, GetCurrentUser } from './Service';

const { Title } = Typography;

export default function Profile() {
	const [messageApi, contextHolder] = message.useMessage();
	const [apiKey, setApiKey] = useState(localStorage.getItem("api-key"));
	const user_name = localStorage.getItem('user_name');
	const first_name = localStorage.getItem('first_name');
	const email = localStorage.getItem('email');
	const phone_number = localStorage.getItem('phone_number');
	const req_coin = localStorage.getItem('req_count');
	const id = localStorage.getItem('id');

	const navigate = useNavigate();

	const mes = (text, type) => messageApi.open({ type, content: text, className: 'custom-class', style: { marginTop: '20vh' } });

	useEffect(() => {
		if (!localStorage.getItem("access_token")) {
			navigate("/login");
			return;
		}
		const fetchUser = async () => {
			await GetCurrentUser(mes);
		};
		fetchUser();
	}, [navigate]);


	const handleCreateAPIKey = async () => {
		try {
			const newKey = await CreateNewAPIKeyService(messageApi);
			if (newKey) {
				setApiKey(newKey);
				localStorage.setItem("api-key", newKey);
			}
		} catch (_) {
			mes("Ошибка при создании API-ключа.", 'error');
		}
	};

	const handleDeleteAPIKey = async () => {
		try {
			const success = await DeleteAPIKeyService(messageApi);
			if (success) {
				setApiKey(null);
				localStorage.removeItem("api-key");
			}
		} catch (_) {
			mes("Ошибка при удалении API-ключа.", 'error');
		}
	};
	if (!localStorage.getItem("access_token")) {
		return null;
	}
	return (
		<>
			{contextHolder}
			<Row gutter={16} justify="center">
				<Col span={24} md={12}>
					<Card>
						<Title level={3}>Профиль пользователя</Title>

						<Statistic title="Имя пользователя" value={user_name} />
						<Statistic title="Электронная почта" value={email} />
						<Statistic title="Номер телефона" value={phone_number} />
						<Statistic title="Имя" value={first_name} />
						<Statistic title="Кол. запросов" value={req_coin} />
						<Statistic title="Ваш ID" value={id} />

						{apiKey && (
							<Statistic title="Ваш API-ключ" className='text-break fs-4' value={apiKey} />
						)}

						<div className='d-flex gap-4'>
							{apiKey ? (
								<Button onClick={handleDeleteAPIKey}>Удалить API-ключ</Button>
							) : (
								<Button onClick={handleCreateAPIKey}>Создать новый API-ключ</Button>
							)}
							<Button onClick={() => navigate("/logout")}>Выйти</Button>
						</div>
					</Card>
				</Col>
			</Row>
		</>
	);
}
