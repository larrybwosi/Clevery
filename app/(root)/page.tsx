"use client"
import { Loader, PostCard, UserCard } from "@/components/shared";
import { getCurrentUser } from "@/lib/appwrite/api";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";
import { setIsAuthenticated, setIsLoading, setUser } from "@/lib/redux/features/authSlice";
import { AppDispatch, selector } from "@/lib/redux/store";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const { user, isAuthenticated, isLoading } = selector(
    (state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  
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
      console.log("no cookie fallback");
    }

    if(!user.name){
      checkAuthUser();
    }
  },[]);

  
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
