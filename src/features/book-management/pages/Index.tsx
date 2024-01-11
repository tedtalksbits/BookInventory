import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookmarkIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useBookAPI, useOpenLibBookAPI } from '../hooks/useBookAPI';
import { BookList } from '../components/BookList';
import Loading from '@/components/ui/loading';
import { Label } from '@radix-ui/react-label';

export const Index = () => {
  const [isbn, setIsbn] = useState('');
  const {
    data: foundBooks,
    getByISBN,
    isLoading: foundBooksIsLoading,
    error: foundBooksError,
  } = useOpenLibBookAPI();
  const { getBooks } = useBookAPI();
  const {
    data: myBooks,
    isLoading: myBooksIsLoading,
    isError: myBooksIsError,
  } = getBooks;

  const handleFetchBook = async () => {
    if (isbn) {
      await getByISBN(isbn);
    }
  };

  const renderFoundBooks = () => {
    if (foundBooksIsLoading) {
      return <Loading />;
    }

    if (foundBooksError) {
      return (
        <div className='flex items-center justify-center'>
          <BookmarkIcon className='h-8 w-8 text-primary' />
          <span className='text-xl font-semibold'>Error loading books</span>
        </div>
      );
    }
    return <BookList books={foundBooks} />;
  };

  const renderMyBooks = () => {
    if (myBooksIsLoading) {
      return <Loading />;
    }

    if (myBooksIsError) {
      return (
        <div className='flex items-center justify-center'>
          <BookmarkIcon className='h-8 w-8 text-primary' />
          <span className='text-xl font-semibold'>Error loading books</span>
        </div>
      );
    }

    return <BookList books={myBooks} />;
  };
  return (
    <div className='p-4'>
      <h3 className='heading'>
        <Label htmlFor='isbn'>Find a book</Label>
      </h3>
      <section className='find-book '>
        <form
          className='find-book__header flex items-center gap-4 my-4'
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder='Enter an ISBN'
            type='number'
            id='isbn'
          />

          <Button
            type='submit'
            onClick={handleFetchBook}
            disabled={foundBooksIsLoading}
          >
            {foundBooksIsLoading ? (
              <Loading />
            ) : (
              <>
                <MagnifyingGlassIcon className='mr-1 h-4 w-4' /> Find
              </>
            )}
          </Button>
        </form>
        <div className='find-book__list bg-accent my-10'>
          {renderFoundBooks()}
        </div>
      </section>
      <section className='my-books'>
        <h3 className='heading'>You Books</h3>
        <div className='my-books__list'>{renderMyBooks()}</div>
      </section>
    </div>
  );
};
