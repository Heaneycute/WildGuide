import { Dispatch, SetStateAction } from 'react';
import { User } from '../types';

type SigninPageProps = {
  setUser: Dispatch<SetStateAction<User>>
}

export default function SigninPage({ setUser }: SigninPageProps) {
  return (
    <div className={styles.wrapper}>
      <AuthForm title='Войти' type='signin' setUser={setUser} />
    </div>
  );
}
