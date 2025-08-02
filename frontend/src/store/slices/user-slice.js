import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "/fetch/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/users");

      if (!response.ok) throw new Error("Failed to fetch users!");

      const users = await response.json();

      return users;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.error = null;
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
