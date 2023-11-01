'use client'
import { createContext, useContext, useEffect } from 'react';
import { IContextType, INewUser} from '@/types';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setIsLoading, setUser } from '../redux/features/authSlice';
import { selector, AppDispatch } from '../redux/store';
import { getCurrentUser } from '../appwrite/api';
import { useRouter } from 'next/navigation';

export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};

const AuthContext = createContext<any>({
  user: INITIAL_USER,
  isLoading: false,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = selector(
    (state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router= useRouter()


  const checkAuthUser = async () => {
    dispatch(setIsLoading(true));
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        dispatch(setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        }));
        dispatch(setIsAuthenticated(true));;
      }
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      router.push("/sign-in");
    }

    checkAuthUser();
  },[]);
  
  const value = {
    user,
    isAuthenticated,
    isLoading,
    setIsAuthenticated: (auth: boolean) =>dispatch(setIsAuthenticated(auth)),
    setIsLoading: (state: boolean) =>dispatch(setIsLoading(state)),
    checkAuthUser,
    setUser: (newUser: INewUser) => dispatch(setUser(newUser))
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
