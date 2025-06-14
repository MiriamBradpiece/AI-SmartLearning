import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setId, setName } from '../redux/loginSlice'; 
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import '@mui/material/styles';
import CategoryTabPanel from './CategoriesTabsPage'; 
import { useNavigate } from 'react-router-dom';
import { GetUser } from '../../api'; // Ensure correct import

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, name } = useSelector((state) => state.login);
    const [user, setUser] = useState(null);
    const MyAdmin = 329596076;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id || !name) {
            alert('Please fill in all fields');
            return;
        }
        try {
            // Dispatch GetUser correctly using Redux Toolkit
            const userResult = await dispatch(GetUser({ id, name })).unwrap();

            if (userResult) {
                setUser(userResult); 
                navigate(id == MyAdmin ? '/admin' : '/categories');
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