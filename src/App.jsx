import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ConfigProvider } from "antd";

import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import UtilsPage from './components/Utils'

import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import CryptoDetail from './pages/crypto/Crypto'

import Login from './pages/auth/login/Login'
import { Logout } from './pages/auth/Service';
import Register from './pages/auth/register/Register'
import './App.css'

function App() {
	return (
		<ConfigProvider>
			<BrowserRouter>
				<div className="container">
					<Header className="header-content" />
					<main className="main-content">
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path="/crypto/:symbol" element={<CryptoDetail />} />
							<Route path='/login' element={<Login />} />
							<Route path='/logout' element={<Logout />} />
							<Route path='/register' element={<Register />} />
							<Route path='/profile' element={<Profile />} />
							<Route path='/utils' element={<UtilsPage />} />
							<Route path='/*' element={<NotFound />} />
						</Routes>
					</main>
					<Footer className="footer-content" />
				</div>
			</BrowserRouter>
		</ConfigProvider>
	)
}

export default App
