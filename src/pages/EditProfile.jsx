import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const EditProfile = () => {
  const [form, setForm] = useState({
    f_name: '',
    l_name: '',
    mobile: '',
    n_id: '',
    password: '',
    repeat_password: '',
  });
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const tokenData = localStorage.getItem('token_data');
      if (tokenData) {
        const user = JSON.parse(tokenData).user;
        setForm((prev) => ({
          ...prev,
          f_name: user?.f_name || '',
          l_name: user?.l_name || '',
          mobile: user?.mobile || '',
          n_id: user?.n_id || '',
        }));
      }
    } catch (e) {}
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Require mobile and password only
    if (!form.mobile) {
      setError('وارد کردن شماره موبایل الزامی است.');
      setLoading(false);
      return;
    }
    if (!form.password) {
      setError('وارد کردن رمز عبور الزامی است.');
      setLoading(false);
      return;
    }
    // Password validation
    if (form.password || form.repeat_password) {
      if (!form.password || !form.repeat_password) {
        setError('لطفاً هر دو فیلد رمز عبور را پر کنید.');
        setLoading(false);
        return;
      }
      if (form.password !== form.repeat_password) {
        setError('رمز عبور و تکرار آن یکسان نیستند.');
        setLoading(false);
        return;
      }
    }
    // Always send all fields
    const updateObj = {
      n_id: form.n_id,
      mobile: form.mobile,
      password: form.password,
      f_name: form.f_name,
      l_name: form.l_name,
    };
    try {
      // Do NOT require token for profile completion
      const response = await axios.post(
        `${config.API_BASE_URL}/auth/complete-profile/${user_id}`,
        updateObj
      );
      if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('token_data', JSON.stringify(response.data));
        navigate('/main');
      } else {
        setError('پروفایل با موفقیت تکمیل نشد.');
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || 'خطا در بروزرسانی اطلاعات. لطفاً دوباره تلاش کنید.'
      );
    } finally {
      setLoading(false);
    }
  };

  const textFieldProps = {
    fullWidth: true,
    margin: 'normal',
    size: 'small',
    variant: 'filled',
    InputProps: {
      sx: {
        direction: 'rtl',
        height: 48,
        fontSize: 16,
        fontFamily: 'Charisma, sans-serif',
        boxSizing: 'border-box',
      },
    },
    InputLabelProps: {
      sx: {
        fontFamily: 'Charisma, sans-serif',
      },
      shrink: true,
    },
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Charisma, sans-serif',
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 1.5, fontFamily: 'CharismaTF-Bold, Charisma, sans-serif', color: '#0D3148', fontWeight: 900 }}
        >
          ویرایش پروفایل
        </Typography>
        <Box
          sx={{
            width: '100%',
            background: '#f5f5f5',
            borderRadius: 3,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            mb: 2,
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          <TextField
            label="نام"
            name="f_name"
            value={form.f_name}
            onChange={handleChange}
            {...textFieldProps}
          />
          <TextField
            label="نام خانوادگی"
            name="l_name"
            value={form.l_name}
            onChange={handleChange}
            {...textFieldProps}
          />
          <TextField
            label="موبایل"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            {...textFieldProps}
          />
          <TextField
            label="شماره ملی"
            name="n_id"
            value={form.n_id}
            onChange={handleChange}
            {...textFieldProps}
          />
          <TextField
            label="رمز عبور"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            {...textFieldProps}
          />
          <TextField
            label="تکرار رمز عبور"
            name="repeat_password"
            type="password"
            value={form.repeat_password}
            onChange={handleChange}
            {...textFieldProps}
          />
        </Box>
        <Button
          type="submit"
          onClick={() => console.log('Button clicked')}
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            backgroundColor: '#D32127',
            color: '#fff',
            fontFamily: 'Charisma, sans-serif',
            fontWeight: 700,
            fontSize: 18,
            borderRadius: 8,
            '&:hover': { backgroundColor: '#b80022' },
          }}
          disabled={loading}
        >
          {loading ? 'در حال بروزرسانی...' : 'اعمال تغییرات'}
        </Button>
      </Box>
    </Container>
  );
};

export default EditProfile; 