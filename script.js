"use strict"

const bookContainer = document.querySelector("#book-container");
const addBookButton = document.querySelector("#add-book-button");
const modal = document.querySelector("dialog");
const cancelFormButton = document.querySelector(".cancel");
// const submitFormButton = document.querySelector(".submit");
const addBookForm = document.querySelector("form");

addBookButton.addEventListener("click", () => {
    modal.showModal();
});

cancelFormButton.addEventListener("click", () => {
    modal.close();
    addBookForm.reset();
});

document.addEventListener("keydown", event => {
    if(event.key === "Escape"){
        addBookForm.reset(); 
    }
});

addBookForm.addEventListener("submit", event => {
    //event.preventDefault();
    //modal.close();

    const inputTitle = document.querySelector("#title").value;
    const inputAuthor = document.querySelector("#author").value;
    const inputPages = document.querySelector("#pages").value;
    const inputHasRead = document.querySelector("#has-read").checked;
    
    addBookToLibrary(inputTitle, inputAuthor, inputPages, inputHasRead);
    
    addBookForm.reset();
});

const myLibrary = [
    new Book("The Hobbit", "J. R. R. Tolkien", 368, true),
    new Book("A Feast for Crows", "George R. R. Martin", 753, false),
    new Book("1984", "George Orwell", 328, true)
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

function removeBookFromLibrary(event){
    const bookIndex = event.target.parentNode.getAttribute("data-index");
    myLibrary.splice(bookIndex, 1);
    displayLibrary();
}

function displayLibrary() {
    bookContainer.textContent = "";

    myLibrary.forEach((book, index) => {

        const bookCard = document.createElement("div");
        const bookTitle = document.createElement("p");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookHasRead = document.createElement("p");
        const removeBookButton = document.createElement("button");
        
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-index", index);

        bookTitle.textContent = book.title;
        bookTitle.classList.add("book-title");

        bookAuthor.textContent = book.author;
        bookAuthor.classList.add("book-author");

        bookPages.textContent = `${book.pages} Pages`;
        bookPages.classList.add("book-pages");

        bookHasRead.textContent = book.hasRead;
        bookHasRead.classList.add("book-has-read");

        removeBookButton.textContent = "REMOVE";
        removeBookButton.classList.add("remove-book");
        removeBookButton.addEventListener("click", removeBookFromLibrary);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookHasRead);
        bookCard.appendChild(removeBookButton);

        bookContainer.appendChild(bookCard);
    });
}

displayLibrary()


