import { client } from "@/sanity/lib/client";

export const fetchPosts = async () => {
    try {
      const response = await client.fetch(
        `*[_type == "post"] | order(_createdAt desc) {
          _id,
          _createdAt,
          content, 
          likes,
        author->{ 
          _id,
          name,
          image,
          username, 
          email,
          isVerified
        },
          comments,
          bookmarks,
          images
        }`
      );
 
      return response;
    } catch (error) {
    }
  };
 
  export const fetchUsers = async () => {
    try {
      const response = await client.fetch(
        `*[_type == "user"]{
          _id,
          name,
          image,
          username,
          email,
          isVerified
        } | order(created asc)`
      );
      return response
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };