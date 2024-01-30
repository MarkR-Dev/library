"use strict"

const bookContainer = document.querySelector("#book-container");
const addBookButton = document.querySelector("#add-book-button");
const modal = document.querySelector("dialog");
const cancelFormButton = document.querySelector(".cancel");
const submitFormButton = document.querySelector(".submit");
const addBookForm = document.querySelector("form");

addBookButton.addEventListener("click", () => {
    modal.showModal();
});

cancelFormButton.addEventListener("click", () => {
    modal.close();
    addBookForm.reset();
});

submitFormButton.addEventListener("click", event => {
    //event.preventDefault();
    //modal.close();
    
    addBookForm.reset();
});

const myLibrary = [
    new Book("The Hobbit", "Author", 123, true),
    new Book("Batman", "Author", 234, false),
    new Book("Joker", "Author", 443, true)
];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
    displayLibrary();
}

function displayLibrary() {
    bookContainer.textContent = "";

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

displayLibrary()


