const books = document.querySelectorAll(".book");
const themeToggler = document.querySelector("#theme-toggler");
const readStatusButton = document.querySelector("#read-status");
const addBookButton = document.querySelector("#add-book");
const editBookButton = document.querySelector("#edit");
const bookModal = document.querySelector("#modal-book-details");
const closeModalButton = document.querySelector("#close-modal");
const form = bookModal.querySelector("form");

let library = [];

function Book(title, author, pages, haveRead, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.cover = cover
    this.id = crypto.randomUUID();
}

function addNewBook(bookData) {
    const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.read, bookData.cover);
    library.push(book)

    displayLibrary();
}

function editBook(book, newData) {

}

function displayLibrary() {

}

// event listeners

books.forEach(book => {
    book.addEventListener("mouseover", () => {
        const bookOptions = book.querySelector(".features");
        bookOptions.classList.add("visible");
    });
});


books.forEach(book => {
    book.addEventListener("mouseout", () => {
        const bookOptions = book.querySelector(".features");
        bookOptions.classList.remove("visible");
    });
});

themeToggler.addEventListener("click", () => {
    const root = document.documentElement;
    const newTheme = root.className === "dark" ? "light" : "dark";
    root.className = newTheme;

    themeToggler.src = `./assets/${newTheme}-theme.svg`;
});

readStatusButton.addEventListener("click", () => {
    readStatusButton.classList.toggle("not-read");
});

addBookButton.addEventListener("click", () => {
    bookModal.querySelector("h1").innerText = "Add a new book";
    bookModal.showModal();
});

editBookButton.addEventListener("click", (e) => {
    bookModal.querySelector("h1").innerText = "Edit book details";
    bookModal.showModal();
    bookModal.bookToEdit = e.target.closest(".book");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    bookModal.close();
    const data = Object.fromEntries(new FormData(form).entries());

    if (bookModal.bookToEdit) {
        editBook(bookModal.bookToEdit, data);
        bookModal.bookToEdit = null;
    } else {
        addNewBook(data);
    }
});

closeModalButton.addEventListener("click", () => {
    bookModal.bookToEdit = null;
    bookModal.close();
});