import { useState } from 'react';
import { bookAPI, openLibBookAPI } from '../api';
import { OpenLibBook } from '../types/book';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useOpenLibBookAPI = () => {
  const [data, setData] = useState<OpenLibBook[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getByISBN = async (isbn: string) => {
    setIsLoading(true);
    try {
      const res = await openLibBookAPI.getByISBN(isbn);
      setData(res);
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, getByISBN };
};

export const useBookAPI = () => {
  const queryClient = useQueryClient();
  const getBooks = useQuery({
    queryKey: ['books'],
    queryFn: async () => bookAPI.getBooks(),
  });

  const addBook = useMutation({
    mutationKey: ['addBook'],
    mutationFn: async (book: OpenLibBook) => bookAPI.addBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book added');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateBook = useMutation({
    mutationKey: ['updateBook'],
    mutationFn: async (book: OpenLibBook) => bookAPI.updateBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book updated');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteBook = useMutation({
    mutationKey: ['deleteBook'],
    mutationFn: async (id: string) => bookAPI.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book deleted');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { getBooks, addBook, updateBook, deleteBook };
};
