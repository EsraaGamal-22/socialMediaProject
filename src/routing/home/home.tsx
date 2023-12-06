import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";
export type Post = {
  id: string;
  userId: string;
  username: string;
  title: string;
  description: string;
};
export const Home = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  // get the collection from db
  const postsRef = collection(db, "posts");
  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <div>{postsList?.map((post) => <Post post={post} />)} </div>
    </>
  );
};
