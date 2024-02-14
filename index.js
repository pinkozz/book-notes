// App that is visible to all users
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = new express();
const port = 3000;

app.use(express.static('public'));

let notes = [
  {
    isbn: "9780805210408",
    title: "The Trial by Franz Kafka",
    dateRead: "February 12th 2022",
    description: "On the morning of his thirtieth birthday, Josef K., the chief clerk of a bank, is unexpectedly arrested by two unidentified agents from an unspecified agency for an unspecified crime. Josef is not imprisoned, however, but left \"free\" and told to await instructions from the Committee of Affairs. Josef's landlady, Frau Grubach, tries to console Josef about the trial, but insinuates that the procedure may be related to an immoral relationship with his neighbor Fräulein Bürstner. Josef visits Bürstner to vent his worries, and then kisses her.",
  },
  {
    isbn: "9781329437982",
    title: "Frankenstein by Mary Shelley",
    dateRead: "January 27th 2022",
    description: "Shelley's novel, Frankenstein: or, the Modern Prometheus (1818), is a combination of Gothic horror story and science fiction. The book tells the story of Victor Frankenstein, a Swiss student of natural science who creates an artificial man from pieces of corpses and brings his creature to life.",
  },
]

app.get("/", (req, res) => {
  res.render("index.ejs", {notes: notes});
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});