import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { getCompanies } from "../../services/companyApi";
/* ---------- localStorage ---------- */
const getLocalData = () => {
  const data = localStorage.getItem("companies");
  return data ? JSON.parse(data) : [];
};

const saveLocalData = (data) => {
  localStorage.setItem("companies", JSON.stringify(data));
};

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    const data = await getCompanies();

    return [...data, ...data, ...data];
  }
);

/* ---------- SLICE ---------- */
const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    data: getLocalData(),
    loading: false,
  },
  reducers: {
    deleteCompany: (state, action) => {
      state.data = state.data.filter(
        (c) => c.id !== action.payload
      );
      saveLocalData(state.data);
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        saveLocalData(action.payload);
      })
      .addCase(fetchCompanies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { deleteCompany } = companiesSlice.actions;
export default companiesSlice.reducer;