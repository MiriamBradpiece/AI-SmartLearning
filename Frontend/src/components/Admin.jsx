import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const AllPrompts = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://localhost:7173/api/Prompt/get-all-prompts")
      .then(res => {
        if (!res.ok) return res.text().then(txt => { throw new Error(txt) });
        return res.json();
      })
      .then(data => {
        setPrompts(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message || "Error loading prompts");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        All Prompts
      </Typography>
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      {(!loading && !error && prompts.length === 0) && (
        <Typography mt={2}>No prompts found in the system.</Typography>
      )}
      <Stack spacing={2} mt={2}>
        {prompts.map((prompt) => (
          <Paper key={prompt.id} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Prompt: {prompt.prompt1}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User ID: {prompt.userId} | Category ID: {prompt.categoryId} | SubCategory ID: {prompt.subCategoryId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created At: {new Date(prompt.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>Response:</strong> {prompt.response}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </div>
  );
};

export default AllPrompts;