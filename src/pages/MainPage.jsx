import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import { Button, Box, Paper } from '@mui/material';

const MainPage = () => {
  const navigate = useNavigate();
  let authority = 0;
  try {
    const tokenData = localStorage.getItem('token_data');
    if (tokenData) {
      const user = JSON.parse(tokenData).user;
      authority = user?.authority || 0;
    }
  } catch (e) {}

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.clear();
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const container = document.querySelector('.button-container');
    if (container) {
      container.style.paddingTop = '100px';
    }
  }, []);

  // Button definitions
  const buttons = [];
  if (authority > 0) {
    buttons.push({ label: 'مشاور سرمایه‌گذاری کاریزما', key: 'advisor' });
  }
  buttons.push({ label: 'ارزیابی اوراق بدهی', key: 'bonds' });
  buttons.push({ label: 'متقاضی تأمین مالی جمعی', key: 'crowdfunding' });
  buttons.push({ label: 'متقاضی انتشار اوراق', key: 'issuance' });
  buttons.push({ label: 'متقاضی پذیرش', key: 'admission' });
  if (authority === 4) {
    buttons.push({ label: 'مدیریت کاربران', key: 'user_mgmt' });
  }
  // Remove advisor and user_mgmt for authority 0
  if (authority === 0) {
    // Remove first and last if present
    buttons.splice(0, 1); // Remove advisor if present
    // Remove user_mgmt if present
    const idx = buttons.findIndex(b => b.key === 'user_mgmt');
    if (idx !== -1) buttons.splice(idx, 1);
  }

  return (
    <div>
      <Banner />
      <div className="button-container" style={{ padding: 16 }}>
        <Paper elevation={3} sx={{ borderRadius: 4, background: '#f5f5f5', p: 4, maxWidth: 420, margin: '0 auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {buttons.map(btn => (
              <Button
                key={btn.key}
                variant="contained"
                sx={{
                  fontFamily: 'Charisma, sans-serif',
                  fontWeight: 700,
                  fontSize: 18,
                  backgroundColor: '#E4002B',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#b80022' },
                }}
                fullWidth
                onClick={() => btn.key === 'user_mgmt' ? navigate('/user-management') : null}
              >
                {btn.label}
              </Button>
            ))}
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default MainPage; 