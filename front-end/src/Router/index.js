import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login.js";
import ChooseClient from "../Pages/ChooseClient.js";
import EnterInfos from "../Pages/EnterInfos.js";
import NotFond from "../Pages/NotFond.js";
import Layout from "../Layouts/Layout.js";
import AddClient from "../Pages/AddClient.js";
import AddService from "../Pages/AddService.js";
import Home from "../Pages/Home.js";
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/choose-client",
        element: <ChooseClient />,
      },
      {
        path: "/add-client",
        element: <AddClient />,
      },
      {
        path: "/add-service",
        element: <AddService />,
      },
      {
        path: "/enter-infos",
        element: <EnterInfos />,
      },
      {
        path: "*",
        element: <NotFond />,
      },
    ],
  },
]);
