let library = [];

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.id = crypto.randomUUID();
}

function addNewBook(title, author) {
    const book = new Book(title, author);
    library.push(book)
}