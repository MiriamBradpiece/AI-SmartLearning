import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setId, setName } from '../redux/loginSlice'; // ודא שהנתיב נכון
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import '@mui/material/styles';
import { fetchGet } from '../../api';
import CategoryTabPanel from './CategoriesTabsPage'; // ודא שהנתיב נכון
import { useNavigate } from 'react-router-dom';

const GetUser = async (id, name) => {
  try {
    const user = await fetchGet(`https://localhost:7173/api/User/login?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`);
    return user;
  } catch (error) {
    if (error.message.includes('404')) {
      return null;
    }
    throw error;
  }
};

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, name } = useSelector((state) => state.login);
    const [user, setUser] = useState(null);
    //const MyAdmin = import.meta.env.VITE_MY_ADMIN;
     const MyAdmin=329596076;
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!id || !name) {
        alert('Please fill in all fields');
        return;
      }
      try {
        const userResult = await GetUser(id, name);
        if (userResult) {
          setUser(userResult); 
         if( id==MyAdmin){
            navigate('/admin');
         }
          else{
            
            navigate('/categories');
          }
        } else {
          alert('Not found in the system');
        }
      } catch (error) {
        alert('An error occurred during login');
        console.error(error);
      }
    };

    if (user) {
      return <CategoryTabPanel />;
    }

    return (
        <Box className="container" sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                   Welcome to our smart learning platform
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="ID"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={id}
                        onChange={(e) => dispatch(setId(e.target.value))}
                    />
                    <TextField
                        label="Username"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => dispatch(setName(e.target.value))}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        className="button"
                        fullWidth
                    >
                        Log In
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LogIn;