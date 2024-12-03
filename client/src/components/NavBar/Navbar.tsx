import { Dispatch, SetStateAction } from 'react';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { User } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { initUser } from '../../App';

type NavbarProps = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export default function Navbar({ user, setUser }: NavbarProps) {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/auth/logout`
    );
    if (response.status === 200) {
      setUser(initUser);
      setAccessToken('');
      navigate('/');
    }
  };

  return (
    <div >
      <div>
        <Link to='/'>На главную</Link>
      </div>
      <div>
        {user?.username ? (
          <>
            <Link to='/'>{user?.username}</Link>
            <Link onClick={logoutHandler} to={''}>Выйти</Link>
          </>
        ) : (
          <>
            <Link to='/signin'>Войти</Link>
            <Link to='/signup'>Регистрация</Link>
          </>
        )}
      </div>
    </div>
  );
}
