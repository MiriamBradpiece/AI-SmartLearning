import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categorySlice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SubCategoriesList from './SubCategoriesList';
import { useNavigate } from 'react-router-dom'; // <-- fix: import useNavigate

const CategoriesTabsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- fix: get navigate function
  const { list: categories, loading, error } = useSelector(state => state.categories);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  const handleHistoryClick = () => {
    navigate('/History'); // <-- fix: use navigate from hook
  };

  const selectedCategory = categories[tabIndex];

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!categories.length) return <div>No categories found.</div>;

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      {/* History button at top right */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleHistoryClick}>
          History
        </Button>
      </Box>
      <Paper elevation={6} sx={{ background: 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)', p: 2, borderRadius: 3, mb: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Categories Tabs"
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {categories.map((cat, idx) => (
            <Tab
              label={cat.name}
              key={cat.id}
              id={`category-tab-${idx}`}
              aria-controls={`category-tabpanel-${idx}`}
            />
          ))}
        </Tabs>
      </Paper>
      {selectedCategory && (
        <SubCategoriesList categoryId={selectedCategory.id} />
      )}
    </Box>
  );
};

export default CategoriesTabsPage;