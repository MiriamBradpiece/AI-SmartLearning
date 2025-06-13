import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { clearPromptData } from '../redux/PromptSlice';

const PromptResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // קבלת הנתונים מ-slice-ים שונים
  const { categoryId, subCategoryId, promptText } = useSelector((state) => state.prompt) || {};
  const userId = useSelector((state) => state.login.id);

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId || !categoryId || !subCategoryId || !promptText) {
      setError("Missing data");
      setLoading(false);
      return;
    }
    const fetchResult = async () => {
      try {
        const payload = {
          UserId: Number(userId),
          CategoryId: Number(categoryId),
          SubCategoryId: Number(subCategoryId),
          PromptText: promptText
        };
        console.log("payload:", payload);

        const res = await fetch("https://localhost:7173/api/Prompt/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const txt = await res.text();
          setError("Error: " + txt);
        } else {
          const data = await res.json();
          setResponse(data);
        }
      } catch (e) {
        setError("Network or server error");
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [userId, categoryId, subCategoryId, promptText]);

  const handleBack = () => {
    dispatch(clearPromptData());
    navigate(-1);
  };

  if (loading) return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Box>
  );

  if (error) return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography color="error">{error}</Typography>
      <Button sx={{ mt: 3 }} variant="outlined" onClick={handleBack}>
        Back
      </Button>
    </Box>
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" gutterBottom>
        Server Response
      </Typography>
      <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2, minWidth: 300 }}>
        <Typography>
          {response ? JSON.stringify(response, null, 2) : "No response data."}
        </Typography>
      </Box>
      <Button sx={{ mt: 3 }} variant="outlined" onClick={handleBack}>
        Back
      </Button>
    </Box>
  );
};

export default PromptResult;