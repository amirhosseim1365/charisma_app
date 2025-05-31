import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { initTelegramApp } from './utils/telegram';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import WebLogin from './pages/WebLogin';
import MainPage from './pages/MainPage';
import EditProfile from './pages/EditProfile';
import UserManagement from './pages/UserManagement';

// Create theme
const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#f50057' },
  },
});

function AuthGuard({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (
      !token &&
      location.pathname !== '/' &&
      location.pathname !== '/weblogin' &&
      !location.pathname.startsWith('/profile/')
    ) {
      localStorage.clear();
      navigate('/');
    }
  }, [location, navigate]);
  return children;
}

function App() {
  useEffect(() => {
    initTelegramApp();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthGuard>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/weblogin" element={<WebLogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile/:user_id" element={<EditProfile />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/user-management" element={<UserManagement />} />
            </Routes>
          </Layout>
        </AuthGuard>
      </Router>
    </ThemeProvider>
  );
}

export default App;
