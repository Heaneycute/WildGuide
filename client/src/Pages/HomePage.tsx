import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { Entries, User } from '../types';

export default function HomePage({ user }: { user: User }) {
  const [entries, setEntries] = useState<Entries>([]);

  useEffect(() => {
    axiosInstance
      .get<Entries>(`${import.meta.env.VITE_API}/tasks`)
      .then((res) => {
        setEntries(res.data);
      })
      .catch((err) => {
        console.error(err);
        setEntries([]);
      });
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <Form setEntries={setEntries} />
      <List data={entries} setEntries={setEntries} />
    </div>
  );
}
