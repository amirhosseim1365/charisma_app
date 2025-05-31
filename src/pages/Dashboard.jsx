import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import axios from 'axios';
import config from '../config';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}${config.ENDPOINTS.USER_PROFILE}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      }
    };

    fetchUserData();

    // Check if the app is running in Telegram
    if (window.Telegram && window.Telegram.WebApp) {
      const currentPlatform = window.Telegram.WebApp.platform;
      console.log('Current Platform:', currentPlatform);
      setPlatform(currentPlatform);
    } else {
      console.log('Telegram WebApp is not available.');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!userData) {
    return (
      <Container>
        {/* No loading text or spinner */}
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        mt: 4,
        width: platform === 'tdesktop' || platform === 'web' ? '800px' : '100%',
        height: platform === 'tdesktop' || platform === 'web' ? '400px' : 'auto',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Paper sx={{ p: 3, width: '100%' }}>
          <Typography variant="h4" gutterBottom align="center">
            به روبات مشاور سرمایه‌گذاری کاریزما خوش آمدید...
          </Typography>
          <Typography variant="h4" gutterBottom>
            Welcome, {userData.first_name}!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Running on: {platform}
          </Typography>
          <Box sx={{ 
            width: '100%',
            margin: '0 auto',
            padding: 2,
          }}>
            <Typography variant="h6" gutterBottom>
              Your Profile Information
            </Typography>
            <Typography>National ID: {userData.n_id}</Typography>
            <Typography>Mobile: {userData.mobile}</Typography>
            <Typography>Views: {userData.views}</Typography>
            <Typography>Last Login: {userData.last_login}</Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/profile/${userData.id}`)}
              sx={{ mr: 2 }}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard; 