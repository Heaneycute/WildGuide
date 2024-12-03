import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { fetchDataThunk } from '../../Redux/Thunks/exampleThunks';

const ExampleComponent = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.example);

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};