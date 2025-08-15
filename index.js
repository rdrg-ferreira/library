const books = document.querySelectorAll(".book");
const themeToggler = document.querySelector("#theme-toggler");
const readStatusButton = document.querySelector("#read-status");

let library = [];

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.id = crypto.randomUUID();
}

function addNewBook(title, author) {
    const book = new Book(title, author);
    library.push(book)

    displayLibrary();
}

function displayLibrary() {

}

// event listeners

books.forEach(book => {
    book.addEventListener("mouseover", () => {
        const bookOptions = book.querySelector(".features");
        bookOptions.classList.add("visible");
        console.log("visible");
    })
});


books.forEach(book => {
    book.addEventListener("mouseout", () => {
        const bookOptions = book.querySelector(".features");
        bookOptions.classList.remove("visible");
        console.log("not visible");
    })
});

themeToggler.addEventListener("click", () => {
    const root = document.documentElement;
    const newTheme = root.className === "dark" ? "light" : "dark";
    root.className = newTheme;

    themeToggler.src = `./assets/${newTheme}-theme.svg`;
});

readStatusButton.addEventListener("click", () => {
    readStatusButton.classList.toggle("not-read");
})