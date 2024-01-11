import { OpenLibBook } from '../types/book';
import { Book } from './Book';

interface BookListProps {
  books: OpenLibBook[] | undefined | null;
}

export const BookList = ({ books }: BookListProps) => {
  if (!books) {
    return null;
  }

  if (books.length === 0) {
    return (
      <div className='flex items-center justify-center'>
        <span className='text-xl font-semibold'>No books found</span>
      </div>
    );
  }
  return (
    <div className='grid md:grid-cols-12 gap-4 ' data-testid='book-list'>
      {books.map((book, index) => (
        <Book key={book.isbn[0] + index} book={book} />
      ))}
    </div>
  );
};
