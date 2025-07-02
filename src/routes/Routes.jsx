import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PlantDetails from "../pages/PlantDetails/PlantDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPlant from "../pages/Dashboard/Seller/AddPlant";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import Edit from "./My-pages/Edit";
import ViewDetails from "./My-pages/ViewDetails";
import MyRequest from "./My-pages/MyRequest";
import Blood from "./My-pages/Blood";
import BloodRequest from "./My-pages/MyAdmin/BloodRequest";
import Conditional from "./My-pages/Conditional";
import ContentManage from "./My-pages/MyAdmin/Blogs/ContentManage";
import AddBlogs from "./My-pages/MyAdmin/Blogs/AddBlogs";
import Blogs from "./My-pages/MyAdmin/Blogs/Blogs";
import FundingPage from "./My-pages/Stripe/FundingPage";
import Search from "./My-pages/Search/Search";
import About from "./My-pages/About";
import PaymentCart from "./My-pages/Stripe/PaymentCart";
import BlogsDetails from "./My-pages/MyAdmin/Blogs/BlogsDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "blood",
        element: <Blood />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/blogsdetails/:id",
        element: <BlogsDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "funding",
        element: (
          <PrivateRoute>
            <FundingPage />
          </PrivateRoute>
        ),
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            <AddPlant />
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-request",
        element: (
          <PrivateRoute>
            <MyRequest />
          </PrivateRoute>
        ),
      },
      {
        index: true,
        element: <Conditional />,
      },

      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "viewdetails/:id",
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
      },

      // admin
      {
        path: "bloodrequest",
        element: <BloodRequest />,
      },
      {
        path: "content-manage",
        element: <ContentManage />,
      },
      {
        path: "addblogs",
        element: <AddBlogs />,
      },
      {
        path: "paymentcart",
        element: <PaymentCart />,
      },
    ],
  },
]);
