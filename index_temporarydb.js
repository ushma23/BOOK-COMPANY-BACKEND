//MAIN BACKEND FILE

const db = require("./database");

// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");
const app = express();
app.use(express.json());

//https://localhost:3000/
app.get("/", (req, res) => {
    return res.json({
        "WELCOME": `to my Backend Software for the Book Company`
    });
});

//https://localhost:3000/books
app.get("/books", (req, res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);
});

//https://localhost:3000/book-isbn/12345ONE
app.get("/book/:isbn", (req, res) => {
    //console.log(req.params);
    const { isbn } = req.params;
    //console.log(isbn);
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    //console.log(getSpecificBook);
    //console.log(getSpecificBook.length);
    if (getSpecificBook.length === 0) {
        return res.json({ "error": `No Book found for the ISBN of ${isbn}` });
    }
    return res.json(getSpecificBook[0]);
});

//https://localhost:3000/book-category/programming
app.get("/book-category/:category", (req, res) => {
    //console.log(req.params);
    const { category } = req.params;
    //console.log(category);
    const getSpecificBooks = db.books.filter((book) => book.category.includes(category));
    //console.log(getSpecificBook);
    //console.log(getSpecificBook.length);
    if (getSpecificBooks.length === 0) {
        return res.json({ "error": `No Book found for the category of ${category}` });
    }
    return res.json(getSpecificBooks);
});

//https://localhost:3000/authors
app.get("/authors", (req, res) => {
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors);
});


//https://localhost:3000/author-id/1
app.get("/author/:id", (req, res) => {
    //console.log(req.params);
    let { id } = req.params;
    id = Number(id);
    //console.log(id);
    const getSpecificAuthors = db.authors.filter((author) => author.id === id);
    //console.log(getSpecificAuthors);
    //console.log(getSpecificAuthors.length);
    if (getSpecificAuthors.length === 0) {
        return res.json({ "error": `No Author found for the id of ${id}` });
    }
    return res.json(getSpecificAuthors[0]);
});

//https://localhost:3000/author-isbn/12345Two
app.get("/authors-isbn/:isbn", (req, res) => {
    //console.log(req.params);
    const { isbn } = req.params;
    //console.log(id);
    const getSpecificAuthors = db.authors.filter((author) => author.books.includes(isbn));
    // console.log(getSpecificAuthor);
    //console.log(getSpecificAuthor.length);
    if (getSpecificAuthors.length === 0) {
        return res.json({ "error": `No Author found for the ISBN of ${isbn}` });
    }
    return res.json(getSpecificAuthors);
});


//https://localhost:3000/publications
app.get("/publications", (req, res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});

//https://localhost:3000/publications-isbn/12345ONE
app.get("/publications-isbn/:isbn", (req, res) => {
    console.log(req.params);
    const { isbn } = req.params;
    //console.log(isbn);
    const getSpecificPublication = db.publications.filter((publication) => publication.books.includes(isbn));
    //console.log(getSpecificPublication);
    //console.log(getSpecificPublication.length);
    if (getSpecificPublication.length === 0) {
        return res.json({ "error": `No Book found for the publication of ${isbn}` });
    }
    return res.json(getSpecificPublication[0]);
});

//https://localhost:3000/book
app.post("/book", (req, res) => {
    //console.log(req.body);
    db.books.push(req.body);
    return res.json(db.books);
});

//https://localhost:3000/author
app.post("/author", (req, res) => {
    //console.log(req.body);
    db.authors.push(req.body);
    return res.json(db.authors);
});

//https://localhost:3000/publication
app.post("/publication", (req, res) => {
    //console.log(req.body);
    db.publications.push(req.body);
    return res.json(db.publications);
});

//https://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", (req, res) => {
    //console.log(req.body);
    //console.log(req.params);
    const {isbn} = req.params;
    db.books.forEach((book) => {
        if(book.ISBN === isbn){
            //console.log({...book,...req.body});
            return {...book,...req.body};
        }
        return book;
    })
    return res.json(db.books);
});

//https://localhost:3000/author-update/1
app.put("/author-update/:id", (req, res) => {
    //console.log(req.body);
    //console.log(req.params);
    const {id} = req.params;
    db.authors.forEach((author) => {
        if(author.id === id){
            //console.log({...author,...req.body});
            return {...author,...req.body};
        }
        return author;
    })
    return res.json(db.authors);
});

//https://localhost:3000/publication-update/1
app.put("/publication-update/:id", (req, res) => {
    //console.log(req.body);
    //console.log(req.params);
    const {id} = req.params;
    db.publications.forEach((publication) => {
        if(publication.id === id){
            //console.log({...author,...req.body});
            return {...publication,...req.body};
        }
        return publication;
    })
    return res.json(db.publications);
});

//https://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", (req, res) => {
    //console.log(req.params);
    const {isbn} = req.params;
    const filteredBooks = db.books.filter((book) => book.ISBN!==isbn);
    //console.log(filteredBooks);
    db.books = filteredBooks;
    return res.json(db.books) 
});

//https://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", (req, res) => {
    //console.log(req.params);
    let {isbn, id} = req.params;
    id = Number(id);
    db.books.forEach((book) => {
        if(book.ISBN === isbn) {
            if(!book.authors.includes(id)) {
                return;
            }
            book.authors = book.authors.filter((author) => author!==id);
            return book;
        }
        return book;
    })
    return res.json(db.books);
});

//https://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn", (req, res) => {
    //console.log(req.params);
    let {id, isbn} = req.params;
    id = Number(id);
    db.authors.forEach((author) => {
        if(author.id === id) {
            if(!author.books.includes(isbn)) {
                return;
            }
            author.books = author.books.filter((book) => book!==isbn);
            return author;
        }
        return author;
    })
    return res.json(db.authors);
});

//https://localhost:3000/author-delete/12345ONE
app.delete("/author-delete/:id", (req, res) => {
    //console.log(req.params);
    const {id} = req.params;
    const filteredAuthors = db.authors.filter((author) => author.id!==id);
    //console.log(filteredAuthors);
    db.authors = filteredAuthors;
    return res.json(db.authors)
});

//https://localhost:3000/publication-delete/12345ONE
app.delete("/publication-delete/:id", (req, res) => {
    //console.log(req.params);
    const {id} = req.params;
    const filteredPublications = db.publications.filter((publication) => publication.id!==id);
    //console.log(filteredPublications);
    db.publications = filteredPublications;
    return res.json(db.publications)
});

app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
})
