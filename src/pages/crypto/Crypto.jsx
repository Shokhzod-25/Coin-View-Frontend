import { Chart } from "react-google-charts";
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Statistic, Spin } from 'antd';

export default function CryptoDetail() {
	const { symbol } = useParams();
	const [cryptoData, setCryptoData] = useState(null);
	const [chartData, setChartData] = useState([["Время", "Цена"]]);
	const chartRef = useRef(null);
	const apiKey = localStorage.getItem('api-key')
	const access_token = localStorage.getItem('access_token')

	const [cursor, setCursor] = useState({ x: 0, y: 0, time: "", price: 0, visible: false });

	useEffect(() => {
		const ws = new WebSocket(`ws://127.0.0.1:9000/crypto/${symbol.toLowerCase()}usdt?api-key=${apiKey}&access_token=${access_token}`);
		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				setCryptoData(data);

				setChartData((prevData) => [
					...prevData,
					[new Date().getTime(), parseFloat(data.c)]
				]);
			} catch (error) {
				console.error('Ошибка при обработке данных:', error);
			}
		};

		return () => ws.close();
	}, [symbol]);

	const handleMouseMove = (event) => {
		if (!chartRef.current || chartData.length <= 1) return;

		const chartElement = chartRef.current.getBoundingClientRect();
		const mouseX = event.clientX - chartElement.left;
		const mouseY = event.clientY - chartElement.top;

		const chartWidth = chartElement.width;
		const minTime = 0;
		const maxTime = chartData.length - 1;

		const timeIndex = Math.floor((mouseX / chartWidth) * (maxTime - minTime) + minTime);
		const closestIndex = Math.max(1, Math.min(timeIndex, chartData.length - 1));

		setCursor({
			x: mouseX,
			y: mouseY,
			time: new Date(chartData[closestIndex][0]).toLocaleTimeString(),
			price: chartData[closestIndex][1],
			visible: true,
		});
	};

	const handleMouseLeave = () => {
		setCursor((prev) => ({ ...prev, visible: false }));
	};

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Детали {symbol.toUpperCase()}</h1>

			{chartData ? (<div style={{ position: 'relative', width: '100%' }}>
				<div ref={chartRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
					<Chart
						chartType="LineChart"
						data={chartData}
						height="500px"
						options={{
							series: { 0: { color: 'green' } },
							vAxis: {
								textPosition: 'none',
							},
							hAxis: {
								textPosition: 'none',
							},
							chartArea: {
								width: '100%',
								height: '100%',
							},
						}}
					/>

					{cursor.visible && (
						<>
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: cursor.x - 1,
									width: '2px',
									height: '100%',
									backgroundColor: 'green',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									left: cursor.x + 20,
									top: cursor.y + 20,
									backgroundColor: 'white',
									padding: '5px 10px',
									borderRadius: '5px',
									border: '1px solid black',
									zIndex: '10000',
									boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
								}}
							>
								<p><strong>Время:</strong> {cursor.time}</p>
								<p><strong>Цена:</strong> {cursor.price} USDT</p>
							</div>
						</>
					)}
				</div>
			</div>
			) : <div className="text-center">
				<Spin size="large" />
				<p>⏳ Загрузка данных...</p>
			</div>
			}

			< div style={{ padding: '20px' }}>
				{cryptoData ? (
					<Row>
						<Col span={12}>
							<Statistic title="Текущая цена"
								value={`${parseFloat(cryptoData.c).toFixed(4)} USDT`}
							/>
						</Col>
						<Col span={12}>
							<Statistic title="Макс. цена за 24ч"
								value={`${parseFloat(cryptoData.h).toFixed(4)} USDT`}
							/>
						</Col>
						<Col span={12}>
							<Statistic title="Мин. цена за 24ч"
								value={`${parseFloat(cryptoData.l).toFixed(4)} USDT`}
							/>
						</Col>
						<Col span={12}>
							<Statistic title="Объем торгов"
								value={`${parseFloat(cryptoData.q).toFixed(4)} USDT`}
							/>
						</Col>
						<Col span={12}>
							<Statistic title="Изменение за 24ч"
								value={`${parseFloat(cryptoData.P).toFixed(4)} %`}
								valueStyle={{ color: parseFloat(cryptoData.P) < 0 ? 'red' : 'green' }}
							/>
						</Col>
					</Row>
				) : (
					<div className="text-center">
						<Spin size="large" className="mb-3" />
						<p>⏳ Загрузка данных...</p>
					</div>
				)}
			</div >
		</>
	);
}
