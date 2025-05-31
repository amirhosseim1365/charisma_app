import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/users/departments`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/users/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSelectedUser(response.data);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('خطا در دریافت اطلاعات کاربر');
    }
  };

  const handleEditClick = (userId) => {
    fetchUserDetails(userId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleInputChange = (field) => (event) => {
    setSelectedUser({
      ...selectedUser,
      [field]: event.target.value
    });
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/api/v1/users/users/management`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data) {
        setUsers(response.data);
      } else {
        setError('داده‌ای دریافت نشد');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`خطا در دریافت اطلاعات: ${error.response.status}`);
        if (error.response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          navigate('/login');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError('خطا در ارتباط با سرور');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('خطا در دریافت اطلاعات');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/main');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ mb: 1.5, fontFamily: 'IranYekan', color: '#0D3148', fontWeight: 'bold' }}
        >
          مدیریت کاربران
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton 
            sx={{ 
              backgroundColor: '#E4002B',
              color: 'white',
              '&:hover': { backgroundColor: '#b80022' }
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton 
            sx={{ 
              backgroundColor: '#E4002B',
              color: 'white',
              '&:hover': { backgroundColor: '#b80022' }
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button 
            variant="contained" 
            onClick={handleBack}
            sx={{ 
              backgroundColor: '#E4002B',
              '&:hover': {
                backgroundColor: '#b80022',
              },
              fontFamily: 'IranYekan',
              fontWeight: 'bold'
            }}
          >
            بازگشت
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2, fontFamily: 'IranYekan' }}>
          {error}
        </Alert>
      )}
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                fontFamily: 'IranYekan', 
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#f5f5f5'
              }}>نام</TableCell>
              <TableCell sx={{ 
                fontFamily: 'IranYekan', 
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#f5f5f5'
              }}>نام خانوادگی</TableCell>
              <TableCell sx={{ 
                fontFamily: 'IranYekan', 
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#f5f5f5'
              }}>کد پرسنلی</TableCell>
              <TableCell sx={{ 
                fontFamily: 'IranYekan', 
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#f5f5f5'
              }}>سمت</TableCell>
              <TableCell sx={{ 
                fontFamily: 'IranYekan', 
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#f5f5f5'
              }}>دپارتمان</TableCell>
              <TableCell sx={{ 
                fontFamily: 'IranYekan', 
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#f5f5f5'
              }}>سطح دسترسی</TableCell>
              <TableCell sx={{ 
                fontFamily: 'IranYekan', 
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#f5f5f5'
              }}>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ fontFamily: 'IranYekan' }}>در حال بارگذاری...</TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ fontFamily: 'IranYekan' }}>هیچ کاربری یافت نشد</TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow 
                  key={user.id}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
                    '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
                    height: '48px'
                  }}
                >
                  <TableCell sx={{ fontFamily: 'IranYekan', textAlign: 'center' }}>{user.f_name}</TableCell>
                  <TableCell sx={{ fontFamily: 'IranYekan', textAlign: 'center' }}>{user.l_name}</TableCell>
                  <TableCell sx={{ fontFamily: 'IranYekan', textAlign: 'center' }}>{user.personel_id || '-'}</TableCell>
                  <TableCell sx={{ fontFamily: 'IranYekan', textAlign: 'center' }}>{user.position || '-'}</TableCell>
                  <TableCell sx={{ fontFamily: 'IranYekan', textAlign: 'center' }}>{user.department || '-'}</TableCell>
                  <TableCell sx={{ fontFamily: 'IranYekan', textAlign: 'center' }}>{user.authority}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleEditClick(user.id)}
                      sx={{ 
                        borderColor: '#E4002B',
                        color: '#E4002B',
                        '&:hover': {
                          borderColor: '#b80022',
                          backgroundColor: 'rgba(232, 0, 43, 0.04)',
                        },
                        fontFamily: 'IranYekan',
                        fontWeight: 'bold'
                      }}
                    >
                      ویرایش
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: 'IranYekan', fontWeight: 'bold' }}>
          ویرایش اطلاعات کاربر
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 2 }}>
              <TextField
                label="نام"
                value={selectedUser.f_name}
                onChange={handleInputChange('f_name')}
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
              <TextField
                label="نام خانوادگی"
                value={selectedUser.l_name}
                onChange={handleInputChange('l_name')}
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
              <TextField
                label="کد ملی"
                value={selectedUser.n_id}
                onChange={handleInputChange('n_id')}
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
              <TextField
                label="موبایل"
                value={selectedUser.mobile}
                onChange={handleInputChange('mobile')}
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
              <TextField
                label="سطح دسترسی"
                type="number"
                value={selectedUser.authority}
                onChange={handleInputChange('authority')}
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
              <FormControl fullWidth>
                <InputLabel sx={{ fontFamily: 'IranYekan' }}>دپارتمان</InputLabel>
                <Select
                  value={selectedUser.dep_id || ''}
                  onChange={handleInputChange('dep_id')}
                  label="دپارتمان"
                  sx={{ fontFamily: 'IranYekan' }}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id} sx={{ fontFamily: 'IranYekan' }}>
                      {dept.department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="سمت"
                value={selectedUser.position}
                onChange={handleInputChange('position')}
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
              <TextField
                label="کد پرسنلی"
                type="number"
                value={selectedUser.personel_id}
                onChange={handleInputChange('personel_id')}
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
              <TextField
                label="نام کاربری تلگرام"
                value={selectedUser.telegram_username}
                disabled
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
              <TextField
                label="شناسه تلگرام"
                type="number"
                value={selectedUser.telegram_id}
                disabled
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
              <TextField
                label="تعداد کل رسمیو"
                type="number"
                value={selectedUser.rasmio_count_total}
                onChange={handleInputChange('rasmio_count_total')}
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
              <TextField
                label="کلید API"
                value={selectedUser.api_key}
                onChange={handleInputChange('api_key')}
                fullWidth
                sx={{ fontFamily: 'IranYekan' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog}
            sx={{ 
              fontFamily: 'IranYekan',
              color: '#E4002B'
            }}
          >
            انصراف
          </Button>
          <Button 
            variant="contained"
            sx={{ 
              backgroundColor: '#E4002B',
              '&:hover': {
                backgroundColor: '#b80022',
              },
              fontFamily: 'IranYekan',
              fontWeight: 'bold'
            }}
          >
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement; 