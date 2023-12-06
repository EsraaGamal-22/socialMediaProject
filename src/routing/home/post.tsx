import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Post as Tpost } from "./home";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

type Props = {
  post: Tpost;
};
type Like = {
  userId: string;
  likeId: string;
};
export const Post = (props: Props) => {
  const post = props.post;
  // state to represent the number of likes by using the id for user for each post
  const [likes, setLikes] = useState<Like[] | null>(null);

  //-- get the data of user
  const [user] = useAuthState(auth);

  //-- get specify collection from db to add data into it
  const likesRef = collection(db, "likes");

  //-- get the document which liked only from collection [want the field in db which named postId===current post id "value"]
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  //-- get the specified liked docs
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  //-- add data into collection in database inside the firebase
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      // to automatically update the number of likes
      user &&
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
    } catch (err) {
      console.log(err);
    }
  };
  //-- remove document from collection inside the firebase ----------------------------------------------
  const removeLike = async () => {
    // try {
    //   const data = await getDocs(likesDoc);
    //   const docId = data.docs.filter((doc) => {
    //     if (doc.data().postId === post.id) {
    //       return doc.id;
    //     }
    //   });
    //   const docRef = doc(db, "likes", docId[0].id);
    //   await deleteDoc(docRef);
    // } catch (err) {
    //   console.log(err);
    // }

    try {
      const linkToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(linkToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      // update the status for like
      user &&
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
    } catch (err) {
      console.log();
    }
  };
  //-- to know that the current user is liked a post or not
  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  //-- calling this only when the component is amounting
  useEffect(() => {
    getLikes();
  }, []);
  return (
    <>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@ {post.username}</p>
        {/** if the user has like the post will show unlink icon else show like icon */}

        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>

        {likes && <p>Likes:{likes.length}</p>}
      </div>
    </>
  );
};
