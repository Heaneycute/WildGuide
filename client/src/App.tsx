import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import Root from "./Root";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

interface User {
  id: number;
  username: string;
  email: string;
}

export const initUser: User = {
  id: 0,
  username: "",
  email: "",
};

function App() {
  const [user, setUser] = useState<User>(initUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API}/token/refresh`);

        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
      } catch (err) {
        console.error("Ошибка при авторизации:", err);
        setUser(initUser);
      } 
    };

    fetchUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} setUser={setUser} />,
      children: [
        { path: "/", element: <HomePage user={user} /> },
        { path: "/signin", element: <SigninPage setUser={setUser} /> },
        { path: "/signup", element: <SignupPage setUser={setUser} /> },
        { path: "/resetpassword", element: <ResetPasswordPage /> },
        { path: "/fake-email", element: <FakeEmailPage /> },
        { path: "/newpassword", element: <NewPasswordPage /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/animal", element: <Animal /> },
        { path: "/calendar", element: <Calendar /> },
        { path: "/map", element: <Map /> },
        { path: "/weapon", element: <Weapon /> },
        { path: "/exemplereduxpage", element: <ExempleReduxPage user={user} /> },
        { path: "/profile", element: <Profile user={user} /> },
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

