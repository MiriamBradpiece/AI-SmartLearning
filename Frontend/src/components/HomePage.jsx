import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const topics = [
  { name: "English", emoji: "🇬🇧" },
  { name: "History", emoji: "🏺" },
  { name: "Sports", emoji: "🏅" },
  { name: "Geography", emoji: "🗺️" },
  { name: "And more...", emoji: "✨" }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(120deg, #dbeafe 0%, #b2f7ef 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, mb: 3, maxWidth: 600, textAlign: 'center', borderRadius: 4 }}>
        <Typography variant="h2" fontWeight="bold" color="primary" gutterBottom>
          <span role="img" aria-label="AI">🤖</span> Welcome to AI Study Hub
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          Personalized, smart learning for every subject!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Our AI-powered platform helps you master a variety of topics at your own pace:
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          {topics.map((topic) => (
            <Grid item key={topic.name}>
              <Paper elevation={2} sx={{ py: 1.5, px: 3, borderRadius: 3, minWidth: 120 }}>
                <Typography variant="h6" fontWeight="bold">
                  <span role="img" aria-label={topic.name}>{topic.emoji}</span> {topic.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/register')}
          sx={{ mt: 2, px: 5, fontWeight: 'bold' }}
        >
          Get Started
        </Button>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        Powered by advanced AI. Learn smarter, not harder!
      </Typography>
    </Box>
  );
};

export default HomePage;