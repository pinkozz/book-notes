// App that is visible to all users
import express from "express";
import pg from "pg";

const app = new express();
const port = 3000;

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
// GET all posts
app.get("/", async (req, res) => {
  viewNotes();
  res.render("index.ejs", {notes: notes});
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

// GET post by id
app.get("/:id", (req, res) => {
  const note = notes.find((note) => note.id === parseInt(req.params.id));
  res.render("note.ejs", {note: note});
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});