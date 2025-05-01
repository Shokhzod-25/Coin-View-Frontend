import React, { useEffect, useState } from 'react';
import { Table, Spin, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	return <ListCoin />;
}

function ListCoin() {
	const [cryptos, setCryptos] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const access = localStorage.getItem("access_token");
		const key = localStorage.getItem("api-key");

		if (!access) {
			console.warn("❌ Не авторизован. Перенаправляю на /login");
			navigate("/login");
			return;
		}

		// Проверка наличия API-ключа
		if (!key) {
			console.warn("🚫 Нет API ключа. Перенаправляю на /profile");
			navigate("/profile");
			return;
		}

		// Всё ок — подключаемся к WebSocket
		const ws = new WebSocket(`ws://127.0.0.1:9000/crypto/get-all?api-key=${key}&access_token=${access}`);

		ws.onopen = () => {
			console.log("✅ WebSocket подключён");
		};

		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);

				if (!Array.isArray(data)) throw new Error("❌ Данные не массив");

				const filtered = data.filter(coin => coin.s.includes('USDT'));

				const formatted = filtered.map(coin => ({
					...coin,
					s: coin.s.replace('USDT', ''),
					priceChangePercent: coin.P + '%',
					totalVolume: coin.q,
				}));

				setCryptos(formatted);
				setLoading(false);
			} catch (e) {
				console.error("❌ Ошибка обработки данных:", e);
			}
		};

		ws.onerror = (e) => console.error("❌ WebSocket ошибка:", e);
		ws.onclose = () => console.info("🔴 WebSocket закрыт");

		return () => {
			ws.close();
			console.log("🧹 WebSocket соединение закрыто");
		};
	}, [navigate]);

	const columns = [
		{
			title: 'Название',
			dataIndex: 's',
			sorter: (a, b) => a.s.localeCompare(b.s),
			render: (text) => <strong>{text}</strong>,
		},
		{
			title: 'Цена (USDT)',
			dataIndex: 'c',
			sorter: (a, b) => parseFloat(a.c) - parseFloat(b.c),
			render: (text) => <span>{parseFloat(text).toFixed(4)} USDT</span>,
		},
		{
			title: 'Изм. за 24ч',
			dataIndex: 'priceChangePercent',
			render: (text) => (
				<Tag color={text.includes('-') ? 'volcano' : 'green'}>
					{parseFloat(text).toFixed(4)} %
				</Tag>
			),
			sorter: (a, b) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent),
		},
		{
			title: 'Объём торгов (всего)',
			dataIndex: 'totalVolume',
			render: (text) => <span>{parseFloat(text).toFixed(4)} USDT</span>,
			sorter: (a, b) => parseFloat(a.totalVolume) - parseFloat(b.totalVolume),
		},
	];

	const handleRowClick = (symbol) => {
		navigate(`/crypto/${symbol}`);
	};

	return (
		<>
			{loading ? (
				<div className="text-center">
					<Spin size="large" className="mb-3" />
					<p>⏳ Подключение к серверу...</p>
				</div>
			) : (
				<Table
					dataSource={cryptos}
					columns={columns}
					bordered
					rowKey="s"
					pagination={{ position: ['bottomCenter'] }}
					onRow={(record) => ({
						onClick: () => handleRowClick(record.s),
					})}
				/>
			)}
		</>
	);
}
