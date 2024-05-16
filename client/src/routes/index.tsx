import AllSpaces from "@/components/space/AllSpaces";
import ErrorPage from "@/error-page";
import EditProfile from "@/pages/EditProfile";
import Explore from "@/pages/Explore";
import Feed from "@/pages/Feed";
import LogIn from "@/pages/LogIn";
import LogOut from "@/pages/LogOut";
import PostDetails from "@/pages/PostDetails";

import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import Space from "@/pages/Space";
import Submit from "@/pages/Submit";
import AccountLayout from "@/routes/AccountLayout";
import Root from "@/routes/Root";
import SecondaryLayout from "@/routes/SecondaryLayout";
import { createBrowserRouter } from "react-router-dom";

export enum RoutesEnum {
  HOME = "/",
  ABOUT = "/about",
  PROFILE = "/profile",
  REGISTER = "/register",
  LOGIN = "/login",
  EXPLORE = "/explore",
  POSTDETAILS = "/s/:spaceName/:postID/:postSlug",
}

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
//         <Route path="/" element={<p>home page</p>} />
//         <Route path="/about" element={<p>about page</p>} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/profile/edit" element={<p>edit profile</p>} />
//       </Route>

//       <Route element={<AccountLayout />}>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<LogIn />} />
//       </Route>
//     </>
//   )
// );

const router = createBrowserRouter([
  {
    path: RoutesEnum.HOME,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: RoutesEnum.HOME, element: <Feed /> },
      { path: RoutesEnum.EXPLORE, element: <Explore /> },
      { path: "/about", element: <p>about page</p> },
      { path: "/profile", element: <Profile /> },
      { path: "/profile/edit", element: <EditProfile /> },
      { path: "/s/:spaceName", element: <Space /> },
      { path: "/s/:spaceName/submit", element: <Submit /> },
      { path: RoutesEnum.POSTDETAILS, element: <PostDetails /> },
    ],
  },
  {
    // layout route for account routes
    element: <AccountLayout />,
    children: [
      { path: RoutesEnum.REGISTER, element: <Register /> },
      { path: RoutesEnum.LOGIN, element: <LogIn /> },
    ],
  },
  {
    element: <SecondaryLayout />,

    children: [{ path: "/spaces", element: <AllSpaces /> }],
  },
  { path: "/logout", element: <LogOut /> },
]);

export default router;
