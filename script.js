"use strict"

const bookContainer = document.querySelector("#book-container");

const myLibrary = [
    new Book("The Hobbit", "Author", 123, true),
    new Book("Batman", "Author", 234, false),
    new Book("Joker", "Author", 443, true),
    new Book("Joker", "Author", 443, true),
    new Book("Joker", "Author", 443, true)
];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary() {
}

function displayLibrary() {
    myLibrary.forEach(book => {

        const bookCard = document.createElement("div");
        const bookTitle = document.createElement("p");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookHasRead = document.createElement("p");
        
        bookCard.classList.add("book-card");

        bookTitle.textContent = book.title;
        bookTitle.classList.add("book-title");

        bookAuthor.textContent = book.author;
        bookAuthor.classList.add("book-author");

        bookPages.textContent = `${book.pages} Pages`;
        bookPages.classList.add("book-pages");

        bookHasRead.textContent = book.hasRead;
        bookHasRead.classList.add("book-has-read");

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookHasRead);

        bookContainer.appendChild(bookCard);
    });
}

// console.log(myLibrary)
displayLibrary()

