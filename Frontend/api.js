
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define a constant for the API base URL
const API_BASE_URL = "https://localhost:7173/api";

// Register a user
export const RegisterUser = createAsyncThunk(
  'register/RegisterUser',
  async ({ id, userName, phoneNumber }, thunkAPI) => {
    try {
      const query = new URLSearchParams({ id, username: userName, phoneNumber }).toString();
      const url = `${API_BASE_URL}/User/register?${query}`;
      const data = {}; // Modify if needed

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to register user');
    }
  }
);

// Get user details
export const GetUser = createAsyncThunk(
  'login/GetUser',
  async ({ id, name }, thunkAPI) => {
    try {
      const url = `${API_BASE_URL}/User/login?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch user');
    }
  }
);

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    const response = await fetch(`${API_BASE_URL}/Category`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  }
);

// Fetch user prompts history
export const fetchPrompts = createAsyncThunk(
  'history/fetchPrompts',
  async (userId, thunkAPI) => {
    const response = await fetch(`${API_BASE_URL}/Prompt/get-history?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch prompts');
    }
    return await response.json();
  }
);

// Fetch subcategories based on category ID
export const fetchSubCategories = createAsyncThunk(
  'subCategories/fetchSubCategories',
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/Category/get-subCategory?categoryId=${categoryId}`);
      if (!res.ok) throw new Error('Failed to fetch sub categories');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch all prompts (admin access)
export const fetchPromptsAdmin = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Prompt/get-all-prompts`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error loading prompts");
  }
};