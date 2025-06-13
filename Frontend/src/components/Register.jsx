import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetId, SetUserName, SetPhonNumber } from '../redux/RegisterSlice';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';


import '@mui/material/styles';

import { fetchPost } from '../../api';

// פונקציה לשליחת הנתונים לשרת
const RegisterUser = async (id, userName, phoneNumber) => {
    const query = new URLSearchParams({
        id,
        username: userName,
        phoneNumber
    }).toString();


const res = await fetchPost(`${API}User/register?${query}`, {});
return res;
};

const Register = () => {
    const dispatch = useDispatch();
    const { id, userName, phoneNumber } = useSelector((state) => state.register);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // בדיקה בסיסית
        if (!id || !userName || !phoneNumber) {
            alert('Please fill in all fields.');
            return;
        }
        try {
            await RegisterUser(id, userName, phoneNumber);
            alert('You have successfully registered!');
        } catch (error) {
            alert('An error occurred during registration');
        }
    };

    return (
        <Box className="container" sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="ID"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={id}
                        onChange={(e) => dispatch(SetId(e.target.value))}
                    />
                    <TextField
                        label="Username"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={userName}
                        onChange={(e) => dispatch(SetUserName(e.target.value))}
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={phoneNumber}
                        onChange={(e) => dispatch(SetPhonNumber(e.target.value))}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        className="button"
                        fullWidth
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;