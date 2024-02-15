// Admin app to add/edit/delete new book notes
// Only admin can use this app
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = new express();
const port = 4000;

app.use(express.static('public'));

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
  res.render("modify.ejs");
});

// GET post by id
app.get("/:id", (req, res) => {
  const note = notes.find((note) => note.id === parseInt(req.params.id));
  res.render("note.ejs", {note: note});
});

// Edit certain post
app.get("/edit/:id", (req, res) => {
  const note = notes.find((note) => note.id === parseInt(req.params.id));

  res.render("modify.ejs", {note: note});
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});