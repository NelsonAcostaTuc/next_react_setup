/* import { User } from '@/types/userTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUsers = createAsyncThunk<User[]>('users/getAll', async () => {
  const response = await axios.get<User[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);
  return response.data;
});
 */

/*Comentamos porque no dejaba compilar, usa tipado que no esta agregado todavia*/