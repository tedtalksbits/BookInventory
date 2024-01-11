import { generateUniqueID } from '@/lib/utils';
import { OpenLibBook } from '../types/book';
export interface OpenLibBookAPI {
  getByISBN: (isbn: string) => Promise<OpenLibBook[]>;
}
export interface BookAPI {
  getBooks: () => Promise<OpenLibBook[]>;
  getBook: (id: string) => Promise<OpenLibBook | null>;
  addBook: (book: OpenLibBook) => Promise<OpenLibBook>;
  deleteBook: (id: string) => Promise<void>;
  updateBook: (book: Partial<OpenLibBook>) => Promise<OpenLibBook>;
}

export const openLibBookAPI: OpenLibBookAPI = {
  getByISBN: async (isbn: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_BOOK_API}?isbn=${isbn}&jscmd=data&format=json`
    );
    const json = await res.json();
    console.log(json);
    return json.docs as OpenLibBook[];
  },
};

export const bookAPI: BookAPI = {
  // manage local storage collection
  getBooks: async () => {
    const books = localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY);
    if (books) {
      return JSON.parse(books);
    }
    return [];
  },
  getBook: async (id: string) => {
    const books = await bookAPI.getBooks();
    return books.find((book: OpenLibBook) => book.id === id) ?? null;
  },
  addBook: async (book: OpenLibBook) => {
    const books = await bookAPI.getBooks();
    const newBook: OpenLibBook = {
      ...book,
      id: generateUniqueID(),
      rating: 0,
      added_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    books.push(newBook);
    localStorage.setItem(
      import.meta.env.VITE_LOCAL_STORAGE_KEY,
      JSON.stringify(books)
    );
    return newBook;
  },
  deleteBook: async (id: string) => {
    const books = await bookAPI.getBooks();
    const newBooks = books.filter((book: OpenLibBook) => book.id !== id);
    localStorage.setItem(
      import.meta.env.VITE_LOCAL_STORAGE_KEY,
      JSON.stringify(newBooks)
    );
  },
  updateBook: async (book: Partial<OpenLibBook>) => {
    const books = await bookAPI.getBooks();
    const foundBookIdx = books.findIndex((b: OpenLibBook) => b.id === book.id);
    const foundBook = books[foundBookIdx];
    if (!foundBook) {
      throw new Error('Book not found');
    }
    const updatedBook = {
      ...foundBook,
      ...book,
      updated_at: new Date().toISOString(),
    };
    books[foundBookIdx] = updatedBook;
    localStorage.setItem(
      import.meta.env.VITE_LOCAL_STORAGE_KEY,
      JSON.stringify(books)
    );
    return book as OpenLibBook;
  },
};
