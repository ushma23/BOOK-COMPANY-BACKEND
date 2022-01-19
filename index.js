//MAIN BACKEND FILE

//const db = require("./database");
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");

const express = require("express");
const app = express();
app.use(express.json());

//import the mongoose module
var mongoose = require('mongoose');
//set up default mongoose connection
var mongoDB = 'mongodb+srv://shaik_ushma:9NNFVx754nFEpHQ@cluster0.obrsv.mongodb.net/book-company?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://shaik_ushma:9NNFVx754nFEpHQ@cluster0.obrsv.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const bcollection = client.db("book-company").collection("books").findOne({ISBN: "1234Three"});
//   bcollection.then((data)=>console.log(data));
// });
// client.close();

// async function listDatabases(client)    {
//     databasesList = await client.db().admin().listDatabases();
//     console.log("THE DATABASES ARE:");
//     databasesList.databases.forEach(db=>console.log(db.name));
// }

// async function main()   {
//     const uri = "mongodb+srv://shaik_ushma:9NNFVx754nFEpHQ@cluster0.obrsv.mongodb.net/book-company?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try{
//         await client.connect();
//         const result = await client.db("book-company").collection("books").findOne({ISBN: "1234Three"});
//         console.log(result);
//         //await listDatabases(client);
//     }
//     catch(err) {
//         console.log(err);
//     }
//     finally {
//         await client.close();
//     }
// }
// main();

//https://localhost:3000/
app.get("/", (req, res) => {
    return res.json({
        "WELCOME": `to my Backend Software for the Book Company`
    });
});

//https://localhost:3000/books
app.get("/books", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

//https://localhost:3000/book-isbn/1234Three
app.get("/book-isbn/:isbn", async (req, res) => {
    //console.log(req.params);
    const { isbn } = req.params;
    //console.log(isbn);
    const getSpecificBooks = await BookModel.findOne({ISBN: isbn});
    //console.log(getSpecificBook);
    //console.log(getSpecificBook.length);
    if (getSpecificBooks === null) {
        return res.json({ "error": `No Book found for the ISBN of ${isbn}` });
    }
    return res.json(getSpecificBooks);
});

//https://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req, res) => {
    //console.log(req.params);
    const { category } = req.params;
    //console.log(category);
    const getSpecificBooks = await BookModel.find({category:category});
    //console.log(getSpecificBook);
    //console.log(getSpecificBook.length);
    if (getSpecificBooks.length === 0) {
        return res.json({ "error": `No Book found for the category of ${category}` });
    }
    return res.json(getSpecificBooks);
});

//https://localhost:3000/authors
app.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});


//https://localhost:3000/authors-id/3
app.get("/authors/:id", async (req, res) => {
    //console.log(req.params);
    const { id } = req.params;
    //console.log(id);
    const getSpecificAuthors = await AuthorModel.findOne({id: id});
    //console.log(getSpecificAuthors);
    //console.log(getSpecificAuthors.length);
    if (getSpecificAuthors===null) {
        return res.json({ "error": `No Author found for the id of ${id}` });
    }
    return res.json(getSpecificAuthors);
});

//https://localhost:3000/author-isbn/1234Three
app.get("/authors-isbn/:isbn", async(req, res) => {
    //console.log(req.params);
    const { isbn } = req.params;
    //console.log(id);
    const getSpecificAuthors = await AuthorModel.find({books: isbn});
    // console.log(getSpecificAuthor);
    //console.log(getSpecificAuthor.length);
    if (getSpecificAuthors.length===0) {
        return res.json({ "error": `No Author found for the ISBN of ${isbn}` });
    }
    return res.json(getSpecificAuthors);
});


//https://localhost:3000/publications
app.get("/publications", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});

//https://localhost:3000/publications-isbn/1234Three
app.get("/publications-isbn/:isbn", async (req, res) => {
    //console.log(req.params);
    const { isbn } = req.params;
    //console.log(isbn);
    const getSpecificPublication = await PublicationModel.findOne({books: isbn});
    //console.log(getSpecificPublication);
    //console.log(getSpecificPublication.length);
    if (getSpecificPublication.length === 0) {
        return res.json({ "error": `No Book found for the publication of ${isbn}` });
    }
    return res.json(getSpecificPublication);
});

//https://localhost:3000/book
app.post("/book", async (req, res) => {
    //console.log(req.body);
    const addNewBook = await BookModel.create(req.body);
    return res.json({
        books: addNewBook,
        message: "Book was added !!!!"
    });
});

//https://localhost:3000/author
app.post("/author", async (req, res) => {
    //console.log(req.body);
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json({
        authors: addNewAuthor, 
        message: "Author was added !!!!"
    });
});

//https://localhost:3000/publication
app.post("/publication", async (req, res) => {
    //console.log(req.body);
    const addNewPublication = await PublicationModel.create(req.body);
    return res.json({
        publications: addNewPublication,
        message: "publication was added !!!!"
    });
});

//https://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", async (req, res) => {
    //console.log(req.body);
    //console.log(req.params);
    const {isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate(
        {ISBN: isbn},
        req.body,
        {new: true}
    );
    return res.json({
        bookUpdated: updateBook,
        message: "Book was updated !!!!"
    });
});

//https://localhost:3000/author-update/1
app.put("/author-update/:id", async (req, res) => {
    //console.log(req.body);
    //console.log(req.params);
    const {id} = req.params;
    const updateAuthor = await AuthorModel.findOneAndUpdate(
        {id: id},
        req.body,
        {new: true}
    );
    return res.json({
        authorUpdated: updateAuthor,
        message: "Author was updated !!!!"
    });
});

//https://localhost:3000/publication-update/1
app.put("/publication-update/:id", async (req, res) => {
    //console.log(req.body);
    //console.log(req.params);
    const {id} = req.params;
    const updatePublication = await PublicationModel.findOneAndUpdate(
        {id: id},
        req.body,
        {new: true}
    );
    return res.json({
        publicationUpdated: updatePublication,
        message: "Publication is updated !!!!" 
    });
});

//https://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", async (req, res) => {
    //console.log(req.params);
    const {isbn} = req.params;
    const deleteBook = await BookModel.deleteOne({ISBN: isbn});
    return res.json({
        bookDeleted: deleteBook, 
        message: "Book was Deleted !!!"
    }); 
});

//https://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", async (req, res) => {
    //console.log(req.params);
    const {isbn, id} = req.params;
    let getSpecificBooks = await BookModel.findOne({ISBN: isbn});
    if(getSpecificBooks===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    else {
        getSpecificBooks.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate(
            {ISBN: isbn}, 
            getSpecificBooks, 
            {new: true}
        );
        return res.json({
            bookUpdated: updateBook,
            message: "Author was Deleted from the Book !!!"
        });
    }
});

//https://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn", async (req, res) => {
    //console.log(req.params);
    const {id, isbn} = req.params;
    let getSpecificAuthors= await AuthorModel.findOne({id: id});
    if(getSpecificAuthors===null){
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    else {
        getSpecificAuthors.books.remove(isbn);
        const updateAuthor = await AuthorModel.findOneAndUpdate(
            {id: id}, 
            getSpecificAuthors, 
            {new: true}
        );
        return res.json({
            authorUpdated: updateAuthor,
            message: "Author was Deleted from the Book !!!"
        });
    }
});

//https://localhost:3000/author-delete/12345ONE
app.delete("/author-delete/:id", async (req, res) => {
    //console.log(req.params);
    const {id} = req.params;
    const deleteAuthor = await AuthorModel.deleteOne({id: id});
    return res.json({
        authorDeleted: deleteAuthor,
        message: "Author was deleted !!!!"
    });
});

//https://localhost:3000/publication-delete/12345ONE
app.delete("/publication-delete/:id", async (req, res) => {
    //console.log(req.params);
    const {id} = req.params;
    const deletePublication = await PublicationModel.deleteOne({id: id});
    return res.json({
        publicationDeleted: deletePublication,
        message: "Publication was deleted !!!!"
    });
});

app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
})
