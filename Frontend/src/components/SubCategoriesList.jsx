

// export default SubCategoriesList;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import {setSelectedSubCategoryId, setNote } from '../redux/subCategories';
import { setPromptData } from '../redux/PromptSlice';
import {fetchSubCategories} from '../../api'
const SubCategoriesList = ({ categoryId, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: subCategories, loading, error, selectedId, note } = useSelector(
    (state) => state.subCategories
  );

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSubCategories(categoryId));
    }
  }, [categoryId, dispatch]);

  const handleClick = (id) => {
    dispatch(setSelectedSubCategoryId(id));
  };

  const handleNoteChange = (e) => {
    dispatch(setNote(e.target.value));
  };

  const handleSubmit = () => {
    if (!selectedId || !note) {
      alert("Please select a sub-category and enter free text!");
      return;
    }
    dispatch(setPromptData({
      userId,
      categoryId,
      subCategoryId: selectedId,
      promptText: note,
    }));
    navigate("/prompt-result");
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
      <CircularProgress size={60} />
    </Box>
  );
  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
      <Typography color="error" variant="h5">{error}</Typography>
    </Box>
  );
  if (!subCategories.length) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
      <Typography variant="h5">No sub-categories found.</Typography>
    </Box>
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" mt={4}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Sub-categories:
      </Typography>
      <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        {subCategories.map((sub) => (
          <Button
            key={sub.id}
            variant={selectedId === sub.id ? "contained" : "outlined"}
            color={selectedId === sub.id ? "primary" : "inherit"}
            size="small"
            onClick={() => handleClick(sub.id)}
            sx={{
              minWidth: 80,
              fontSize: 16,
              fontWeight: 500,
              borderRadius: 999,
              px: 2,
              py: 1,
              m: 0.5
            }}
          >
            {sub.name}
          </Button>
        ))}
      </Stack>
      <TextField
        label="Note / Free text"
        variant="outlined"
        value={note}
        onChange={handleNoteChange}
        sx={{ mt: 3, width: 300 }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: 120 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SubCategoriesList;