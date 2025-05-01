import { useEffect } from 'react';


export function ServiceHome(setCryptos) {

	useEffect(() => {
		const ws = new WebSocket(`ws://127.0.0.1:9000/crypto/get-all?api-key=${key}&access_token=${access}`);

		ws.onopen = () => console.log("✅ WebSocket подключён");

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
			} catch (e) {
				console.error("❌ Ошибка обработки:", e);
			}
		};

		ws.onerror = (e) => console.error("❌ WebSocket ошибка:", e);
		ws.onclose = () => console.info("🔴 WebSocket закрыт");

		return () => {
			ws.close();
			console.log("🧹 Соединение WebSocket закрыто при размонтировании");
		};
	})
}
