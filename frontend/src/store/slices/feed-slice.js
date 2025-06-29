import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "/fetch/cars",
  async (limit, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/cars?limit=${limit || 2}`
      );

      if (!response.ok) throw new Error("Could not fetch data");

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "/fetch/car",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cars/${id}`);

      if (!response.ok) {
        const error = new Error("Failed to fetch the car");
        error.status = 404;
        throw error;
      }

      const responseData = await response.json();
      return responseData.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedCar: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchCarById.rejected, (state, action) => {
      state.error = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCarById.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchCarById.fulfilled, (state, action) => {
      state.selectedCar = action.payload;
      state.error = null;
      state.isLoading = false;
    });
  },
});

export default feedSlice.reducer;
