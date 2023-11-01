"use client"
import React from "react";
import { useDispatch} from "react-redux";
import{ useEffect } from 'react';
import { getCurrentUser } from "../appwrite/api";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AppDispatch } from "../redux/store";
import { setIsAuthenticated, setIsLoading, setUser } from "../redux/features/authSlice";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  
useEffect(() => {
  checkAuthUser();
}, [])
const dispatch = useDispatch<AppDispatch>();

const checkAuthUser = async () => {
  dispatch(setIsLoading(true));
  try {
    const currentAccount = await getCurrentUser();
    if (currentAccount) {
      setUser({
        id: currentAccount.$id,
        name: currentAccount.name,
        username: currentAccount.username,
        email: currentAccount.email,
        imageUrl: currentAccount.imageUrl,
        bio: currentAccount.bio,
      });
      dispatch(setIsAuthenticated(true));;

      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    dispatch(setIsLoading(false));
  }
};
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
