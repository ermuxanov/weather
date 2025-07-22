import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL, API_KEY } from "../../config/config";
import axios from "axios";

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city) => {
  const response = await axios.get(`${URL}/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
  return response.data;
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
