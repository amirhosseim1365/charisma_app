import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Alert } from '@mui/material';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { isTelegramWebApp } from '../utils/telegram';
import config from '../config';

// Helper to parse Telegram initData string and send all fields
function parseInitData(initData) {
  const params = new URLSearchParams(initData);
  const obj = {};
  for (const [key, value] of params.entries()) {
    // Keep user as JSON string, others as is
    obj[key] = value;
  }
  return obj;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  console.log('Login component rendered. Current path:', location.pathname);

  useEffect(() => {
    console.log('Login useEffect running. Current path:', location.pathname);
    // Only run login logic if on / or /login
    if (location.pathname !== '/' && location.pathname !== '/login') {
      setLoading(false);
      return;
    }
    const tryLogin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            await axios.get(`${config.API_BASE_URL}${config.ENDPOINTS.USER_PROFILE}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Navigating to /main');
            navigate('/main');
            console.log('Navigated to /main');
            return;
          } catch (err) {
            localStorage.clear();
          }
        }
        const telegram = isTelegramWebApp();
        if (!telegram) {
          console.log('Navigating to /weblogin');
          navigate('/weblogin');
          console.log('Navigated to /weblogin');
          return;
        }
        const initData = WebApp.initData;
        if (!initData) {
          setError('Telegram initData not found.');
          setLoading(false);
          return;
        }
        const response = await axios.post(
          `${config.API_BASE_URL}${config.ENDPOINTS.LOGIN}`,
          { initData }
        );
        if (response.data && response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('token_data', JSON.stringify(response.data));
          console.log('Navigating to /main');
          navigate('/main');
          console.log('Navigated to /main');
        } else if (response.data && response.data.needs_profile_completion) {
          console.log('Navigating to /profile/' + response.data.user.id);
          navigate(`/profile/${response.data.user.id}`);
          console.log('Navigated to /profile/' + response.data.user.id);
        } else {
          setError('Login failed. No token received.');
        }
      } catch (err) {
        setError('Login failed. Please try again.');
        console.error('Login error:', err);
      } finally {
        setLoading(false);
      }
    };
    tryLogin();
  }, [location.pathname, navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo is rendered by Layout */}
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Login; 