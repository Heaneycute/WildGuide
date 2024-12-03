import { Dispatch, SetStateAction } from 'react';
import { User } from '../types';
import { Button } from '@mui/material';

type SignupPageProps = {
  setUser: Dispatch<SetStateAction<User>>
}


export default function SignupPage({ setUser }: SignupPageProps) {
  return (
    <div className={styles.wrapper}>
      <AuthForm title='Зарегистрироваться' type='signup' setUser={setUser} />
      <Button variant="text">Text</Button>
    </div>
  );
}
