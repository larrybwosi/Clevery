import { Models } from "appwrite"; 
import Image from 'next/image'
import Link from 'next/link'

import { PostStats } from "@/components/shared"; 
import { selector } from "@/lib/redux/store";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  
  const { user} = selector((state) => state.auth);

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link href={`/posts/${post.$id}`} className="grid-post_link">
            <Image
              src={post.imageUrl}
              width={350}
              height={350}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <Image
                  src={post.creator.imageUrl ||"/assets/icons/profile-placeholder.svg"}
                  alt="creator"
                  width={300}
                  height={300}
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
