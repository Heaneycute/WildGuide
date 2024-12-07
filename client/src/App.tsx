import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Root from './Root';
import axiosInstance, { setAccessToken } from './axiosInstance';
import HomePage from './Pages/HomePage';
import SigninPage from './Pages/SigninPage';
import SignupPage from './Pages/SignupPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import FakeEmailPage from './Pages/FakeEmailPage';
import NewPasswordPage from './Pages/NewPasswordPage';
import Dashboard from './Pages/DashboardPage';
import Animal from './Pages/AnimalPage';
import Calendar from './Pages/CalendarPage';
import Map from './Pages/MapPage';
import Profile from './Pages/ProfilePage';
import Weapon from './Pages/WeaponPage';
import ExempleReduxPage from './Pages/ExempleReduxPage';
import { User } from './types';

export const initUser = {
  id: 0,
  username: '',
  email: '',
};

function App() {
  const [user, setUser] = useState<User>(initUser);

  useEffect(() => {
    axiosInstance
      .get<{ user: User; accessToken: string }>(
        `${import.meta.env.VITE_API}/token/refresh`
      )
      .then(async (res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: '/',
          element: <HomePage user={user} />,
        },
        {
          path: '/signin',
          element: <SigninPage setUser={setUser} />,
        },
        {
          path: '/signup',
          element: <SignupPage setUser={setUser} />,
        },
        {
          path: '/resetpassword',
          element: <ResetPasswordPage setUser={setUser} />,
        },
        {
          path: '/fake-email',
          element: <FakeEmailPage setUser={setUser} />,
        },
        {
          path: '/newpassword',
          element: <NewPasswordPage setUser={setUser} />,
        },
        {
          path: '/dashboard',
          element: <Dashboard setUser={setUser} />,
        },
        {
          path: '/animal',
          element: <Animal setUser={setUser} />,
        },
        {
          path: '/calendar',
          element: <Calendar setUser={setUser} />,
        },
        {
          path: '/map',
          element: <Map user={user} setUser={setUser}/>,
        },
        {
          path: '/weapon',
          element: <Weapon setUser={setUser} />,
        },
        {
          path: '/exemplereduxpage',
          element: <ExempleReduxPage user={user} setUser={setUser}/>,
        },
        {
          path: '/profile',
          element: <Profile user={user} setUser={setUser}/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;