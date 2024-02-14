// App that is visible to all users
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = new express();
const port = 3000;

let notes = [
  {
    isbn: "9780805210408",
    title: "The Trial by Franz Kafka",
    dateRead: "today",
    description: "good.",
  },
]

app.get("/", (req, res) => {
  res.render("index.ejs", {notes: notes});
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});