import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Root from './Root';
import axiosInstance, { setAccessToken } from './axiosInstance';
import HomePage from './Pages/HomePage';
import SigninPage from './Pages/SigninPage';
import SignupPage from './Pages/SignupPage';
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
