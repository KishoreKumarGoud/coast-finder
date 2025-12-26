import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import StateBeachesPage from './pages/StateBeachesPage'
import BeachInfoPage from './pages/BeachInfoPage'
import NotFoundPage from './pages/NotFoundPage'
import ChatWidget from './components/ChatWidget'

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/beaches/:state" element={<StateBeachesPage />} />
                <Route path="/beaches/:state/:beach" element={<BeachInfoPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ChatWidget />
        </>
    )
}
