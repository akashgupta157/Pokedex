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
    element: (
      <>
        <Header />
        <div className="bg-[#e6e5f6]">
          <Home />
        </div>
      </>
    ),
  },
  {
    path: "/detail/:pokemon/:id",
    element: (
      <>
        <Header />
        <Detail />
      </>
    ),
  },
]);
createRoot(document.getElementById("root")).render(
  <PokeProvider>
    <RouterProvider router={router} />
  </PokeProvider>
);
