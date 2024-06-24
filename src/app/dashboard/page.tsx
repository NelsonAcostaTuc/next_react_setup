'use client';
import { getAllUsers } from '@/redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

export default function Page() {
  const dispatch = useAppDispatch();
  const { allUsers, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);

  return <h1>Hello, Dashboard Page!</h1>;
}
