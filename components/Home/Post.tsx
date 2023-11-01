'use client'
import { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Image from 'next/image'; // Import Image from Next.js
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { urlForImage } from '@/sanity/lib/image';
import { IoEllipsisHorizontalOutline, IoHeartOutline, IoHeart, IoChatbubbleEllipses, IoBookmarkOutline } from 'react-icons/io5';

const Post = ({
  author,
  postText,
  images,
  timestamp,
  likes,
  comments,
  profile,
  post,
  handleClick,
}:any) => {
  const [numLikes, setNumLikes] = useState(likes?.length || 0);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const postId = post._id;

  const colorScheme = 'light'; // You can set your own color scheme here
  const isLiked = (likes:any, profileId:any) => {
    return likes?.some((like:any) => like._ref === profileId);
  };

  const isPostLiked = isLiked(likes, profile._id);

  const [liked, setLiked] = useState(isPostLiked);

  const handleLike = async () => {
    setLiked(!liked);
    // You can implement the toggleLike function according to your project's API
    // await toggleLike(postId, profile._id);
    setNumLikes(numLikes + 1);
  };

  const handleCommenting = () => {
    setCommentText('');
    setShowComment(false);
    // You can implement the handleComment function according to your project's API
    // handleComment(postId, profile._id, commentText);
  };

  const renderImages = () => {
    // If there is only one image, render it on the left.
    if (images && images.length === 1) {
      const image = images[0];
      return (
        <div className="flex gap-10">
          <Image
            src={urlForImage(image).width(250).url()}
            width={150}
            height={200}
            alt='post image'
            className="rounded-3xl"
            onLoad={() => {
              setImageLoaded(true);
              setLoading(false);
            }}
          />
          <p className="text-base font-poppins-regular mb-auto w-200">{postText}</p>
        </div>
      );
    }

    // If there are multiple images, render them in a horizontal ScrollView.
    if (images && images.length > 1) {
      return (
        <>
          {loading && (
            <div className="placeholder w-180 h-230">
              <div className="animate-spin h-16 w-16 border-t-2 border-blue-500 border-t-blue-500 rounded-full mx-auto"></div>
            </div>
          )}
          <p className="text-base font-poppins-regular">{postText}</p>
          <div className="flex overflow-x-auto gap-10 w-full h-250 mb-10">
            {images.map((image:any) => (
              <Image
                key={image.asset._ref}
                src={urlForImage(image).width(300).url()}
                width={180}
                height={230}
                alt='post image'
                className="rounded-3xl"
                onLoad={() => {
                  setImageLoaded(true);
                  setLoading(false);
                }}
              />
            ))}
          </div>
        </>
      );
    }

    // If there are no images, render just the text.
    return <p className="text-base font-poppins-regular">{postText}</p>;
  };

  return (
    <div className="p-10 mb-15 bg-gray-800">
      <div className="flex items-center mb-10">
        <button
          onClick={() => router.push(`/user/${author.email}`)}
          className="focus:outline-none"
          
        >
          {author?.image && (
            <Image
              src={urlForImage(author.image).width(80).url()}
              width={50}
              height={50}
              alt={author.name+'image'}
              className="rounded-full mr-10"
            />
          )}
        </button>
        <div className="flex-1">
          <div className="flex items-center space-x-6">
            <p className="text-xl font-poppins-bold">{author?.name}</p>
          </div>
          <p className="text-gray-600 font-poppins-regular">@{author?.username}</p>
        </div>
        <p className="text-sm text-gray-400 font-poppins-thin">
          {formatDistanceToNow(parseISO(timestamp))}
        </p>
        <div onClick={() => handleClick(post)}>
          <IoEllipsisHorizontalOutline className="text-gray-500 text-lg" />
        </div>
      </div>
      <div className="mb-10">{renderImages()}</div>
      <div className="flex mb-10">
      <div onClick={handleLike}>
          <p className="likeButton text-blue-500 mr-10 text-lg">
            {liked ? <IoHeart className="text-red-500" /> : <IoHeartOutline />}
          </p>
        </div>
        <div onClick={() => setShowComment(!showComment)}>
          <p className="commentButton text-blue-500">
            <IoChatbubbleEllipses className="text-gray-500 text-lg" />
          </p>
        </div>
        <div className="bookmarkButton ml-auto">
          <IoBookmarkOutline className="text-lg" />
        </div>
      </div>
      <div className="flex justify-between mb-10">
        <p className="font-poppins-regular">
          {numLikes} likes & {comments?.length} comments
        </p>
      </div>
      {showComment && (
        <div>
          <div onClick={() => setShowComment(false)}>
            <IoEllipsisHorizontalOutline className="text-lg" />
          </div>
          <textarea
            className="text-base border p-2 border-white rounded-md"
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="icon" onClick={handleCommenting}>
            <IoEllipsisHorizontalOutline className="text-white" style={{ fontSize: '12px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
