import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import { login } from './services/auth';

const tg = window.Telegram?.WebApp;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Telegram mavjudligini tekshirish
        if (!tg) {
          setIsTelegram(false);
          return;
        }

        if (tg.expand) {
          tg.expand();
        }

        // Minimal Telegram user tekshiruvi
        if (!tg.initDataUnsafe?.user) {
          setIsTelegram(false);
          return;
        }

        setIsTelegram(true);

        // Local token tekshiruvi
        const token = localStorage.getItem('accessToken');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          try {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
            return;
          } catch {
            localStorage.clear();
          }
        }

        // InitData bilan login
        if (!tg.initData) {
          throw new Error('InitData not found');
        }

        const data = await login(tg.initData);
        setUser(data.user);
        setIsAuthenticated(true);

      } catch (err) {
        console.error('Auth error:', err);
        setError('Login failed. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
        color: '#64748b'
      }}>
        Loading...
      </div>
    );
  }

  if (!isTelegram) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2>Access Restricted</h2>
        <p>
          Ushbu ilovaga faqat Telegram orqali kirish mumkin. <br />
          <a href="https://t.me/spino_kids_bot">@spino_kids_bot</a>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: '#ef4444'
      }}>
        {error}
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route
          path="/profile"
          element={
            isAuthenticated
              ? <Profile user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route path="*" element={<Navigate to="/profile" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
