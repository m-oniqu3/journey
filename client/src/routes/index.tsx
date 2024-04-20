import ErrorPage from "@/error-page";
import EditProfile from "@/pages/EditProfile";
import LogIn from "@/pages/LogIn";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import AccountLayout from "@/routes/AccountLayout";
import Root from "@/routes/Root";
import { createBrowserRouter } from "react-router-dom";

export enum RoutesEnum {
  HOME = "/",
  ABOUT = "/about",
  PROFILE = "/profile",
  REGISTER = "/register",
  LOGIN = "/login",
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
      { path: RoutesEnum.HOME, element: <p>home page</p> },
      { path: "/about", element: <p>about page</p> },
      { path: "/profile", element: <Profile /> },
      { path: "/profile/edit", element: <EditProfile /> },
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
]);

export default router;
