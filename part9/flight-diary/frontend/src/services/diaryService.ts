import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import type { DiaryEntry } from '../types';

export const useGetDiaries = () => {
  const [data, setData] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaries = async () => {
      setLoading(true);
      try {
        const result = await axios.get<DiaryEntry[]>(
          `${import.meta.env.VITE_API_URL}/api/diaries`
        );
        setData(result.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.message);
        } else {
          setError('unkown error occured');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDiaries();
  }, []);

  return { data, error, loading };
};
