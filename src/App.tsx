import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BuildPage from './pages/BuildPage';
import GamePage from './pages/GamePage';
import PricingPage from './pages/PricingPage';

function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={
                <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
                    <Header />
                    <LandingPage />
                </div>
            } />
            <Route path="/login" element={
                <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
                    <LoginPage />
                </div>
            } />
            <Route path="/pricing" element={
                <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
                    <Header />
                    <PricingPage />
                </div>
            } />

            {/* Protected routes — no global header (sidebar handles nav) */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
            } />
            <Route path="/build" element={
                <ProtectedRoute>
                    <BuildPage />
                </ProtectedRoute>
            } />
            <Route path="/game/:id" element={
                <ProtectedRoute>
                    <GamePage />
                </ProtectedRoute>
            } />

            {/* 404 */}
            <Route path="*" element={
                <div style={{
                    minHeight: '100vh', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'var(--color-bg)', textAlign: 'center', gap: '16px',
                }}>
                    <span style={{ fontSize: '80px' }}>🎮</span>
                    <h1 style={{ fontSize: '48px', margin: 0, fontFamily: 'Space Grotesk', letterSpacing: '-0.04em' }}>404</h1>
                    <p style={{ color: 'var(--color-text-2)', margin: 0 }}>Page not found</p>
                    <a href="/" className="btn-primary" style={{ marginTop: '16px' }}>Go home</a>
                </div>
            } />
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;
