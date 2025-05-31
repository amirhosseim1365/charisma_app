import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import config from '../config';

const TELEGRAM_BOT_LINK = 'https://t.me/ciadv_bot?startapp'; // Update with your bot username

const WebLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/auth/login-web`,
        { username, password }
      );
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError('ورود ناموفق بود. لطفاً نام کاربری و رمز عبور را بررسی کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleTelegramLogin = () => {
    window.open(TELEGRAM_BOT_LINK, '_blank');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          ورود به کاریزما
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
          اگر قبلاً ثبت‌نام نکرده‌اید، ابتدا باید از طریق تلگرام ثبت‌نام کنید.<br />
          اگر قبلاً ثبت‌نام کرده‌اید، می‌توانید وارد شوید.
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            label="نام کاربری"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            dir="rtl"
          />
          <TextField
            label="رمز عبور"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            dir="rtl"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'ورود'}
          </Button>
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleTelegramLogin}
        >
          ورود با تلگرام
        </Button>
      </Box>
    </Container>
  );
};

export default WebLogin; 