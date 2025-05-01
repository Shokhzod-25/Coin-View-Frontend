export default function Header() {
	const accessToken = localStorage.getItem('access_token');
	const refreshToken = localStorage.getItem('refresh_token');
	const isAuthenticated = accessToken && refreshToken;
	return (
		<header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
			<div className="col-md-3 mb-2 mb-md-0">
				<a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
					<span>LOGO</span>
				</a>
			</div>

			<div className="col-md-3 text-end">
				{!isAuthenticated && (
					<>
						<a href="/login" className="btn btn-outline-primary me-2">Войти</a>
						<a href="/register" className="btn btn-outline-primary">Зарегистрироваться</a>
					</>
				)}
				{isAuthenticated && (
					<a href="/profile" className="btn btn-outline-primary">Профиль</a>
				)}
			</div>
		</header>
	)
}
