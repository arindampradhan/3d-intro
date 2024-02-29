// css
import "./index.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Projects from "./pages/projects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "projects",
    element: <Projects />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
