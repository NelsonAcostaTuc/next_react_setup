import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllUsers } from '../actions/userActions';
import { User, UserState } from '@/types/userTypes';

const initialState: UserState = {
  allUsers: [],
  loading: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.allUsers = state.allUsers.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.allUsers = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Cannot load all users';
      });
  },
});

export const { clearError, deleteUser } = userSlice.actions;

export default userSlice.reducer;
