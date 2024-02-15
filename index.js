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

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM note");
  notes = result.rows;

  res.render("index.ejs", {notes: notes});
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});