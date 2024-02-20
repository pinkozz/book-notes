# book-notes
This is a Web Application written using Node.JS, Express.js, PostgreSQL for posting book notes!
![Screenshot from 2024-02-20 01-10-02](https://github.com/pinkozz/book-notes/assets/136079534/a2f6e82f-c2a4-4c42-b217-88bf925089a1)


# Table of contents
• [Features](https://github.com/pinkozz/book-notes#features)

• [Installation](https://github.com/pinkozz/book-notes#installation)

• [Usage](https://github.com/pinkozz/book-notes#usage)

• [Contributing](https://github.com/pinkozz/book-notes#contributing)

• [License](https://github.com/pinkozz/book-notes#license)

# Features
• User friendly interactions through a Web Browser

• Post Creation: Admin is able to create new posts.

• Post Viewing: The home page allows the user to view all their posts.

• Post Update/Delete: Admin is able to edit and delete posts as needed.

• Easy-to-use and extandable codebase

# Installation
*!! To run this application successfully, you must have Node.JS and PostgreSQL installed on your local machine !!*

1. Clone this repository to your local machine using this command:
   
   ```shell
   git clone https://github.com/pinkozz/book-notes
   ```
   
2. Navigate to project folder:
   
   ```shell
   cd book-notes
   ```
3. Once you have installed the application, install all needed packages by simply running this line in your console:
   
   ```shell
   npm i
   ```

4. Create the "note" PostgreSQL database.

5. Open index.js and change following lines of code so the configuration matches your actual database settings
   ```code
   const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "notes",
    password: "postgres",
    port: 5432,
   });
   ```
6. Run the query from create_table.sql in your PostgreSQL environment

7. Great! You are able to use the application now. Run ``` node index.js ``` in your terminal for user view and ``` node admin.js ``` in your terminal for admin view.

# Usage
Once the Web App is up and running, users can interact with it through preferred Web Browser. The Book Notes Website allows user to view notes, add new, delete and edit existing ones! 

# Contributing
Contributions to the Book Notes are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes and commit them with descriptive commit messages.
5. Push your changes to your forked repository.
6. Submit a pull request to the main repository.

Please ensure that your contributions align with the project's coding style, guidelines, and licensing.

# Reference
Inspiration for this project was drawn from an incredible example website provided by Angela Yu, accessible at: https://sive.rs/book.

This documentation aims to summarize the journey, challenges, and accomplishments encountered while developing the Book Review website as part of the Udemy Web Development Bootcamp.
