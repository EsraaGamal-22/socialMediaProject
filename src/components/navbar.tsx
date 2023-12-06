import { Link, Outlet } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  //this hook will update automatically the info for the user when change the google account
  const [user] = useAuthState(auth);
  // signOut it is will log out for the current user
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <>
      <div className="navbar">
        <div className="links">
          <Link to="/">Home </Link>
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="/createPost">Create Post</Link>
          )}
        </div>

        <div className="user">
          {user && (
            <>
              <p>{user?.displayName}</p>

              <img
                src={user?.photoURL || ""}
                alt="profileImg"
                width="20"
                height="20"
              />
              <button onClick={signUserOut}>Log Out</button>
            </>
          )}
        </div>
      </div>
      {/*Where the children will be rendered*/}
      <Outlet />
    </>
  );
};
