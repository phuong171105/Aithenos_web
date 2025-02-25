import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/homepage";
import { NotFoundPage } from "./pages/404";
import UploadImage from "./pages/features/upload-image";
import ScanImage from "./pages/features/scan-image";
import Menu from "./pages/features/menu";
import Discover from "./pages/features/discover";
import OverviewOToCanhQuat from "./pages/tutorial-product/o-to-canh-quat/overview";
import OverviewOngHeoTietKiem from "./pages/tutorial-product/ong-heo-tiet-kiem/overview";
import OverviewXeBongBay from "./pages/tutorial-product/xe-bong-bay/overview";
import OverviewThungRac from "./pages/tutorial-product/thung-rac/overview";
import OverviewQuatCamTay from "./pages/tutorial-product/quat-cam-tay/overview";
import OverviewThuyenTuCheo from "./pages/tutorial-product/thuyen-tu-cheo/overview";

const queryClient = new QueryClient();

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/upload-image",
        element: <UploadImage />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/scan-image",
        element: <ScanImage />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/product",
        element: <Outlet />,
        children: [
          {
            path: "o-to-canh-quat",
            element: <Outlet />,
            children: [
              {
                path: "overview",
                element: <OverviewOToCanhQuat/>,
              }
            ],
          },
          {
            path: "ong-heo-tiet-kiem",
            element: <Outlet />,
            children: [
              {
                path: "overview",
                element: <OverviewOngHeoTietKiem />,
              },
            ],
          },
          {
            path: "xe-bong-bay",
            element: <Outlet />,
            children: [
              {
                path: "overview",
                element: <OverviewXeBongBay />,
              },
            ],
          },
          {
            path: "thung-rac",
            element: <Outlet />,
            children: [
              {
                path: "overview",
                element: <OverviewThungRac />,
              },
            ],
          },
          {
            path: "quat-cam-tay",
            element: <Outlet />,
            children: [
              {
                path: "overview",
                element: <OverviewQuatCamTay />,
              },
            ],
          },
          {
            path: "thuyen-tu-cheo",
            element: <Outlet />,
            children: [
              {
                path: "overview",
                element: <OverviewThuyenTuCheo />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
