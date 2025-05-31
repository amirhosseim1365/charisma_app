import React from 'react';
import logo from '/images/logo.png'; // Adjust path if needed
import SandClock from './SandClock'; // We'll create this component next
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Only show logo, sand clock, and loading text on login page */}
      {isLoginPage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}>
          <img src={logo} alt="Charisma Logo" style={{ height: 180, marginBottom: 32 }} />
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SandClock />
            <Typography variant="body1" align="center" sx={{ mt: 1, fontFamily: 'Charisma, sans-serif' }}>
              لطفاً منتظر بمانید...
            </Typography>
          </div>
        </div>
      )}
      {/* Children content centered below sand clock */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        paddingTop: isLoginPage ? 'calc(180px + 80px + 48px)' : 0
      }}>
        <main style={{ width: '100%' }}>{children}</main>
      </div>
    </div>
  );
};

export default Layout; 