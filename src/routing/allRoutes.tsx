import { createBrowserRouter } from "react-router-dom";

import { Login } from "./login";
import { Navbar } from "../components/navbar";
import { Home } from "./home/home";
import { CreatePost } from "./create-post/create-post";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,

    children: [
      {
        //That tells the router to match and render this route when the user is at the parent route's exact path,
        // so there are no other child routes to render in the <Outlet>.
        index: true,
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/createPost",
        element: <CreatePost />,
      },
    ],
  },
]);
