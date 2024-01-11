import { Button } from '@/components/ui/button';
import { OpenLibBook } from '../types/book';
import { useBookAPI } from '../hooks/useBookAPI';
import { Rating } from './Rating';

export const Book = ({ book }: { book: OpenLibBook }) => {
  const { addBook, deleteBook, updateBook } = useBookAPI();

  const handleAddBook = () => {
    addBook.mutate(book);
  };

  const handleDeleteBook = () => {
    if (!book.id) return;
    deleteBook.mutate(book.id);
  };

  const handleRateBook = (rating: number) => {
    if (!book.id) return;
    const updatedBook: OpenLibBook = {
      ...book,
      rating,
    };
    updateBook.mutate(updatedBook);
  };

  return (
    <article className='col-span-3 p-4 book flex flex-col justify-between'>
      <div className='book__content flex items-center flex-col gap-2'>
        <header className='book__header text-left'>
          <h3
            className='text-lg font-semibold leading-10 whitespace-nowrap overflow-hidden max-w-[14ch] text-ellipsis cursor-default capitalize'
            title={book.title}
          >
            {book.title}
          </h3>
          <span className='text-sm leading-3 text-foreground/80'>
            By: {book.author_name?.toString()}
          </span>
        </header>
        <img
          src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg?default=false`}
          className='book__cover w-48 h-64 object-cover rounded-lg shadow-lg overflow-hidden'
          loading='lazy'
          alt={book.title}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/150';
          }}
        />
      </div>
      <div className='book__action mt-4'>
        {book?.added_at ? (
          <>
            <div className='flex rating'>
              <Rating
                maxRatings={5}
                rating={book?.rating}
                onRate={(rating) => handleRateBook(rating)}
              />
            </div>
            <Button className='w-full' onClick={handleDeleteBook}>
              Delete
            </Button>
          </>
        ) : (
          <Button className='w-full' onClick={handleAddBook}>
            Add to Library
          </Button>
        )}
      </div>
    </article>
  );
};
