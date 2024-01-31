"use strict"

const bookContainer = document.querySelector("#book-container");
const addBookButton = document.querySelector("#add-book-button");
const modal = document.querySelector("dialog");
const cancelFormButton = document.querySelector(".cancel");
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

Book.prototype.toggleReadStatus = function(event){
    this.hasRead = !this.hasRead;
    
    if(this.hasRead === true){
        event.target.textContent = "READ";
        event.target.classList.add("read");
        event.target.classList.remove("not-read");
    }else{
        event.target.textContent = "NOT READ";
        event.target.classList.add("not-read");
        event.target.classList.remove("read");
    }
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
        const bookHasRead = document.createElement("button");
        const removeBookButton = document.createElement("button");
        
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-index", index);

        bookTitle.textContent = book.title;
        bookTitle.classList.add("book-title");

        bookAuthor.textContent = book.author;
        bookAuthor.classList.add("book-author");

        bookPages.textContent = `${book.pages} Pages`;
        bookPages.classList.add("book-pages");

        if(book.hasRead === true){
            bookHasRead.textContent = "READ";
            bookHasRead.classList.add("read");
            bookHasRead.classList.remove("not-read");
        }else{
            bookHasRead.textContent = "NOT READ";
            bookHasRead.classList.add("not-read");
            bookHasRead.classList.remove("read");
        }

        // Arrow function is used so that the this context remains as the
        // book object when calling the toggle method
        //
        // bookHasRead.classList.add("book-has-read");
        // bookHasRead.addEventListener("click", (event) => {
        //     book.toggleReadStatus(event);
        // });

        // Bind is used to keep the this context bound to the book obj
        // when calling the method, an arrow function or closing function
        // will have also worked
        bookHasRead.classList.add("book-has-read");
        bookHasRead.addEventListener("click", book.toggleReadStatus.bind(book));
        
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


