
import WeaponDetails from './Pages/WeaponDetailsPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import Root from "./Root";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import HomePage from "./Pages/HomePage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import FakeEmailPage from "./Pages/FakeEmailPage";
import NewPasswordPage from "./Pages/NewPasswordPage";
import Dashboard from "./Pages/DashboardPage";
import Animal from "./Pages/AnimalPage";
import Calendar from "./Pages/CalendarPage";
import Map from "./Pages/MapPage";
import Profile from "./Pages/ProfilePage";
import Weapon from "./Pages/WeaponPage";
import ExempleReduxPage from "./Pages/ExempleReduxPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const initUser = {
  id: 0,
  username: "",
  email: "",
};

function App() {
  const [user, setUser] = useState<User>(initUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/token/refresh");
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
      } catch (err: any) {
        setError(err.response?.data?.message || "Ошибка авторизации");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: "/",
          element: <HomePage user={user} />,
        },
        {
          path: "/signin",
          element: <SigninPage setUser={setUser} />,
        },
        {
          path: "/signup",
          element: <SignupPage setUser={setUser} />,
        },
        {
          path: "/resetpassword",
          element: <ResetPasswordPage setUser={setUser} />,
        },
        {
          path: "/fake-email",
          element: <FakeEmailPage setUser={setUser} />,
        },
        {
          path: "/newpassword",
          element: <NewPasswordPage setUser={setUser} />,
        },
        {
          path: "/dashboard",
          element: <Dashboard setUser={setUser} />,
        },
        {
          path: "/animal",
          element: <Animal setUser={setUser} />,
        },
        {
          path: "/calendar",
          element: <Calendar setUser={setUser} />,
        },
        {
          path: "/map",
          element: <Map setUser={setUser} />,
        },
        {
          path: "/weapon",
          element: <Weapon setUser={setUser} />,
        }, {
          path: '/weapon/:id',
          element: <WeaponDetails setUser={setUser} />,
        },
        {
          path: "/exemplereduxpage",
          element: <ExempleReduxPage user={user} setUser={setUser} />,
        },
        {
          path: "/profile",
          element: <Profile user={user} setUser={setUser} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
