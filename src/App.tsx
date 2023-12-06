//-- import file for css with specific styles
import { RouterProvider } from "react-router-dom";
import { router } from "./routing/allRoutes";
import "./index.css";

function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
