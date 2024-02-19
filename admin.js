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

// View notes (Not sorted)
function viewNotes() {
  db.query("SELECT * FROM note", (err, res) => {
    if(err) {
      console.error("Error executing query", err.stack);
    } else {
      notes = res.rows;
    }
  });
}

// View notes (sorted by date - newest first)
function newestNotes() {
  db.query("SELECT * FROM note ORDER BY dateread DESC;", (err, res) => {
    if(err) {
      console.error("Error executing query", err.stack);
    } else {
      notes = res.rows;
    }
  });
}

// View notes (sorted by rating - best first)
function bestNotes() {
  db.query("SELECT * FROM note ORDER BY recommend DESC;", (err, res) => {
    if(err) {
      console.error("Error executing query", err.stack);
    } else {
      notes = res.rows;
    }
  });
}

// View notes (sorted by title - alphabetical order)
function alphabeticalNotes() {
  db.query("SELECT * FROM note ORDER BY title ASC;", (err, res) => {
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

// GET posts sorted by date
app.get("/sort/date", (req, res) => {
  newestNotes();
  res.redirect("/");
});

// GET posts sorted by rating
app.get("/sort/rating", (req, res) => {
  bestNotes();
  res.redirect("/");
});

// GET posts sorted by title
app.get("/sort/title", (req, res) => {
  alphabeticalNotes();
  res.redirect("/");
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
  if(req.body.recommend) db.query("UPDATE note SET recommend = $1 WHERE id = $2", [req.body.recommend, id]);

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
    req.body.recommend,
  ];

  db.query("INSERT INTO note (isbn, title, dateread, description, note, recommend) VALUES ($1, $2, $3, $4, $5, $6);", post);

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