"use client"
import Image from 'next/image'
import Link from 'next/link'
import {useRouter,usePathname} from 'next/navigation'

import { INavLink } from "@/types"; 
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { INITIAL_USER, useUserContext } from "@/lib/context/AuthContext";
import { sidebarLinks } from '@/lib/constants';
import { AppDispatch, selector } from '@/lib/redux/store';
import { setIsAuthenticated, setIsLoading, setUser } from '@/lib/redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from '@/lib/appwrite/api';

const LeftSidebar = () => {
  const router = useRouter();
  const pathname  = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isAuthenticated, isLoading } = selector(
    (state) => state.auth);

  const { mutate: signOut } = useSignOutAccount();

  
  const checkAuthUser = async () => {
    dispatch(setIsLoading(true));
    try {
      const currentAccount = await getCurrentUser();
      console.log('started the process  '+currentAccount)
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

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      router.push("/sign-up");
    }
    if(!isAuthenticated){
      checkAuthUser()
    }
   checkAuthUser();
  },[]);

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    dispatch(setIsAuthenticated(false));
    dispatch(setUser(INITIAL_USER));
    router.push("/sign-in");
  };


  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={150}
            height={36}
          />
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link href={`/profile/${user.id}`} className="flex gap-3 items-center">
            <Image
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              width={100}
              height={100}
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <Link
                  href={link.route}
                  className="flex gap-4 items-center p-4">
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={20}
                    height={20}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        onClick={handleSignOut}
        variant="ghost"
        className="shad-button_ghost"
      >
        <Image src="/assets/icons/logout.svg" 
         alt="logout"  width={20} height={20}
        />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
