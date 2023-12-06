import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
type CreatePost = {
  title: string;
  description: string;
};
export const Form = () => {
  // get the data of user
  const [user] = useAuthState(auth);
  // navigate to homepage
  const navigate = useNavigate();
  {
    /**validate the values from form using yup */
  }
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePost>({
    resolver: yupResolver(schema),
  });
  // get specify collection from db to add data into it
  const postsRef = collection(db, "posts");
  const onCreatePost: SubmitHandler<CreatePost> = async (data) => {
    // add data into collection in database inside the firebase
    await addDoc(postsRef, {
      // title: data.title,
      // description: data.description,
      // another way to fill the another fields for object
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    // after add user will navigate to homepage
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title......" {...register("title")} />
      <p className="errorMessage">{errors.title?.message}</p>
      <textarea placeholder="Description......" {...register("description")} />
      <p className="errorMessage">{errors.description?.message}</p>
      <input type="submit" className="submitForm" />
    </form>
  );
};
