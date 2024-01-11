export interface OpenLibBook {
  title: string;
  author_name?: string[];
  author_key?: string[];
  first_sentence?: string[];
  isbn: string[];
  cover_i?: number;
  id?: string;
  added_at?: string;
  updated_at?: string;
  rating?: number;
}

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
