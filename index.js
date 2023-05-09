const fs = require("fs");
const readline = require("readline-sync");

const menuChoice = readline.question(
  "What do you want to do? Use numbers only \n 1. Add new book \n 2. Delete book \n 3. Borrow book \n 4. Return book \n"
);

switch (menuChoice) {
  case "1":
    addNewBook();
    break;
  case "2":
    deleteBook();
    break;
  case "3":
    borrowBook();
    break;
  case "4":
    returnBook();
    break;
  default:
    console.log("Something went wrong...");
    break;
}

function getBooks() {
  let data = fs.readFileSync("books.json", "utf8");
  return JSON.parse(data);
}

function addNewBook() {
  let books = getBooks();
  const bookName = readline.question("Enter name of book \n");
  const bookAuthor = readline.question("Enter author of the book \n");
  let newBook = {
    id: books.length + 1,
    name: bookName,
    author: bookAuthor,
  };
  books.push(newBook);

  fs.writeFile("books.json", JSON.stringify(books), (err) => {
    if (err) console.log(err);
    console.log("Added");
  });
}

function deleteBook() {
  let books = getBooks();
  console.log(books);
  const bookId = readline.question("Enter id of book to delete\n");
  let index = books.findIndex((book) => book.id == bookId);
  books.splice(index, 1);

  fs.writeFile("books.json", JSON.stringify(books), (err) => {
    if (err) console.log(err);
    console.log("Deleted");
  });
}

function borrowBook() {
  let books = getBooks();
  let bookId = readline.question("Enter id of book to borrow\n");

  books.map((book) => {
    if (Object.is(book.id, parseInt(bookId))) {
        if (!book.isBorrowed) {
            book.isBorrowed = true;
            console.log("Borrowed", book);
        } else {
            console.log('This book is already borrowed :(');
        }
    }
  });

  fs.writeFile("books.json", JSON.stringify(books), (err) => {
    if (err) console.log(err);
  });
}

function returnBook() {
  let books = getBooks();
  let bookId = readline.question("Enter id of book to return\n");
  books.map((book) => {
    if (Object.is(book.id, parseInt(bookId))) {
        if (book.isBorrowed) {
            book.isBorrowed = false;
            console.log("Returned");
        } else {
            console.log('Cant return a book that is not borrowed!');
        }
    }
  });

  fs.writeFile("books.json", JSON.stringify(books), (err) => {
    if (err) console.log(err);
  });
}
