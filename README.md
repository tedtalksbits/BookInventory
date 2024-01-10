# Book Inventory Manager with API Integration and Local Storage

<center>
<img src='https://www.svgrepo.com/show/393314/library.svg' style="background: white; text-align:center;" height=200 width=200  />
</center>

### About This Project

The Book Inventory Manager is a feature-rich web-based Book Inventory Management System. This system allows users to organize and manage their book collections effectively.

**Features**

- **Add New Books**: Users can easily add new books to their collection by entering the ISBN number. The system automatically fetches the book's details, including the title, author, and cover image, from the Open Library API.

- **View Inventory**: The application displays a list of books in the user's inventory, showcasing titles, authors, ISBNs, and cover images.

- **Rate Books**: Users have the option to rate each book in their collection on a scale of 1 to 5 stars.

- **Delete Books**: Books can be removed from the inventory as per the user's choice.

### Requirements

**Dependencies**

To ensure smooth running of the application, ensure the following dependencies are installed:

[React Query](https://tanstack.com/query/latest): `@tanstack/react-query: ^5.17.9`

[React](https://react.dev/reference/react): `react: ^18.2.0`

[TailwindCSS](https://tailwindcss.com/): `tailwindcss: ^3.4.1`

[Typescript](https://www.typescriptlang.org/): `typescript: ^5.2.2`

[Vite](https://vitejs.dev/): `vite: ^5.0.8`

### Setup Instructions

1. **Clone** the Repository: Clone this repository to your local machine.

```sh
git clone
```

2. **Install** Dependencies: Run npm install to install the required dependencies.

```sh
npm install
```

3. **Start** the Application: Use npm start to run the application on your local server.

```sh
npm run dev
```

### Usage

- Adding Books: To add a book, enter the ISBN number in the provided field and the system will automatically populate the book's details.

- Viewing Inventory: Access your book inventory on the main dashboard, where you can see all the details of your books.

- Rating Books: Rate each book by clicking on the star rating system.

- Deleting Books: Remove a book from your inventory by clicking the delete button associated with the book.

### License

This project is licensed under the MIT License - see the LICENSE file for details.
