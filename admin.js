// Admin app to add/edit/delete new book notes
// Only admin can use this app
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = new express();
const port = 4000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "notes",
  password: "postgres",
  port: 5432,
});

db.connect();

let notes = [];

function viewNotes() {
  db.query("SELECT * FROM note", (err, res) => {
    if(err) {
      console.error("Error executing query", err.stack);
    } else {
      notes = res.rows;
    }
  });
}

viewNotes();

// View the main page
app.get("/", async (req, res) => {
  viewNotes();
  res.render("admin-index.ejs", {notes: notes});
});

// GET the new post form
app.get("/new", (req, res) => {
  const title = "New Note";
  res.render("modify.ejs", {title: title});
});

// GET post by id
app.get("/:id", (req, res) => {
  const note = notes.find((note) => note.id === parseInt(req.params.id));
  res.render("note.ejs", {note: note});
});

// GET the edit form
app.get("/edit/:id", (req, res) => {
  const note = notes.find((note) => note.id === parseInt(req.params.id));
  const title = "Modify Note";

  res.render("modify.ejs", {note: note, title: title});
});

// Edit certain note
app.post("/modify/edit/:id", (req,res) => {
  const id = req.params.id;

  if(req.body.isbn) db.query("UPDATE note SET isbn = $1 WHERE id = $2", [req.body.isbn, id]);
  if(req.body.title) db.query("UPDATE note SET title = $1 WHERE id = $2", [req.body.title, id]);
  if(req.body.dateread) db.query("UPDATE note SET dateread = $1 WHERE id = $2", [req.body.dateread, id]);
  if(req.body.description) db.query("UPDATE note SET description = $1 WHERE id = $2", [req.body.description, id]);
  if(req.body.note) db.query("UPDATE note SET note = $1 WHERE id = $2", [req.body.note, id]);

  viewNotes();
  res.redirect("/");
});

// Add new note
app.post("/modify/new", (req, res) => {
  const post = [
    req.body.isbn,
    req.body.title,
    req.body.dateread,
    req.body.description,
    req.body.note,
  ];

  db.query("INSERT INTO note (isbn, title, dateread, description, note) VALUES ($1, $2, $3, $4, $5);", post);

  viewNotes();
  res.redirect("/");
});

// Delete certain note
app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query("DELETE FROM note WHERE id = $1", [id]);

  viewNotes();
  res.redirect("/")
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});