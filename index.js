const themeToggler = document.querySelector("#theme-toggler");
const addBookButton = document.querySelector("#add-book");
const bookModal = document.querySelector("#modal-book-details");
const closeModalButton = document.querySelector("#close-modal");
const form = bookModal.querySelector("form");
const bookFeaturesTemplate = document.querySelector("#book-features");
const bookInfoTemplate = document.querySelector("#book-info");

let library = [];
const colors = ['red', 'green', 'blue', 'orange', 'yellow'];

function Book(title, author, pages, haveRead, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.cover = cover
    this.id = crypto.randomUUID();
}

function formatData(data) {
    if (data.cover.size === 0) {
        data.cover = colors[Math.floor(Math.random() * colors.length)];
    }

    if (data.read === "true") data.read = true;
    else data.read = false;

    return data;
}

function addNewBook(bookData) {
    bookData = formatData(bookData);

    const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.read, bookData.cover);
    library.push(book)

    displayLibrary();
}

function deleteBook(book) {
    bookIndex = library.indexOf(library.find((item) => item.id == book.getAttribute("data-id")));
    if (bookIndex > -1) library.splice(bookIndex, 1);

    displayLibrary();
}

function displayLibrary() {
    const display = document.querySelector("main");
    display.innerText = ""; // clear display

    library.forEach(item => {
        // create element and its content
        const book = document.createElement("div");
        book.classList.add("book", "flex", "flex-column", "justify-between", "relative");
        book.setAttribute("data-id", item.id);

        const features = document.importNode(bookFeaturesTemplate.content, true);
        const readStatusButton = features.querySelector(".read-status");
        const deleteButton = features.querySelector(".delete");
        if (item.haveRead) {
            readStatusButton.classList.remove("not-read");
        }

        const coverContainer = document.createElement("div");
        coverContainer.classList.add("cover");

        if (colors.includes(item.cover)) {
            coverContainer.style.backgroundColor = item.cover;
        } else {
            const coverImg = document.createElement("img");
            coverImg.src = URL.createObjectURL(item.cover);
            coverImg.alt = "book cover";

            coverContainer.appendChild(coverImg);
        }
        
        const info = document.importNode(bookInfoTemplate.content, true);
        info.querySelector(".title").innerText = item.title;
        info.querySelector(".author").innerText = item.author;
        info.querySelector(".pages").innerText = item.pages;

        // append content to element
        book.append(features, coverContainer, info);
        display.appendChild(book);

        // add event listeners
        book.addEventListener("mouseover", () => {
            const bookOptions = book.querySelector(".features");
            bookOptions.classList.add("visible");
        });

        book.addEventListener("mouseout", () => {
            const bookOptions = book.querySelector(".features");
            bookOptions.classList.remove("visible");
        });

        readStatusButton.addEventListener("click", () => {
            readStatusButton.classList.toggle("not-read");
        });

        deleteButton.addEventListener("click", (e) => {
            deleteBook(e.target.closest(".book"));
        });
    });
}

// event listeners
themeToggler.addEventListener("click", () => {
    const root = document.documentElement;
    const newTheme = root.className === "dark" ? "light" : "dark";
    root.className = newTheme;

    themeToggler.src = `./assets/${newTheme}-theme.svg`;
});

addBookButton.addEventListener("click", () => {
    bookModal.showModal();
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