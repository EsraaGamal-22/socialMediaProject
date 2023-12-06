import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
// using it to pass the values of result "promise from sign in with popup" of user
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signUpWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    // will navigate into homepage after get the promise
    navigate("/");
  };
  return (
    <>
      <div>
        <p>Sign In With Google To Continue</p>
        <button onClick={signUpWithGoogle}>Sign In With Google</button>
      </div>
    </>
  );
};
