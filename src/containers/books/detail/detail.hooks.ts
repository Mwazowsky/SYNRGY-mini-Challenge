import axios from 'axios';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { IBooks } from '../books.types';
import { IApiResponse, IMeta, IParams } from '../../../services/types';
import { useNavigate, useParams } from 'react-router-dom';

export default function useList() {
  const navigate = useNavigate();
  const { id } = useParams(); // Using useParams within the functional component
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [book, setBook] = useState<IBooks[]>([]);

  const handleRemove = async (
    e: MouseEvent<HTMLButtonElement>,
    record: IBooks
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/books/${record.id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        await fetchBook();
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: IBooks) => {
    e.stopPropagation();
    navigate(`/update/${record.id}`);
  };

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse<IBooks[]>>(
        `http://localhost:8000/api/books/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setBook(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log('error > ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  return {
    book,
    loading,
    meta,
    handleEdit,
    handleRemove,
  };
}
