import React, { useState } from 'react';
import logo from '/images/logo2.png'; // Use logo2.png
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  // Get user info from localStorage
  let fName = '';
  let lName = '';
  let position = '';
  let userId = '';
  try {
    const tokenData = localStorage.getItem('token_data');
    if (tokenData) {
      const user = JSON.parse(tokenData).user;
      fName = user?.f_name || '';
      lName = user?.l_name || '';
      position = user?.position || '';
      userId = user?.id || '';
    }
  } catch (e) {}

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    handleMenuClose();
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 60,
        background: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        zIndex: 100,
        padding: '0 24px',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, cursor: 'pointer' }}
        onClick={handleMenuOpen}
      >
        <PersonIcon style={{ fontSize: 32, color: '#1a2233' }} />
        <span style={{ fontWeight: 600, color: '#1a2233', fontSize: 16 }}>
          {fName} {lName} {position ? `(${position})` : ''}
        </span>
      </div>
      <img src={logo} alt="Logo" style={{ height: 36 }} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          style: {
            borderRadius: 8,
            width: 'auto',
            minWidth: 0,
          },
          elevation: 2,
        }}
        MenuListProps={{
          style: {
            padding: 0,
          },
        }}
      >
        <MenuItem
          onClick={handleEditProfile}
          sx={{
            fontFamily: 'Charisma, sans-serif',
            color: '#fff',
            backgroundColor: '#E4002B',
            borderRadius: 8,
            padding: '4px 16px',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 16,
            minWidth: 0,
            width: 'auto',
            margin: 0,
            '&:hover': {
              backgroundColor: '#b80022',
            },
          }}
        >
          ویرایش پروفایل
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Banner; 