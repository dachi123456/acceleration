import { Outlet, RouteObject } from "react-router-dom";
import NavBar from "../components/NavBar";
import HomePage from "../pages/HomePage";
import HistoryPage from "../pages/HistoryPage";

const router: RouteObject[] = [
    {
      element: (
          <div>
            <NavBar />
            <Outlet />
          </div>
      ),
      path: "/",
      children: [
        {
          element: <HomePage />,
          index: true,
        },
        {
          element: <HistoryPage />,
          path: "history",
        },
     
      ],
    },
  ];
  


export default router