import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import Header from "./Components/Header";
import { PokeProvider } from "./misc/PokeContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail/:pokemon/:id",
    element: <Detail />,
  },
]);
createRoot(document.getElementById("root")).render(
  <PokeProvider>
    <Header />
    <RouterProvider router={router} />
  </PokeProvider>
);
