*MY DRIVE*

This is a simple school based project for learning purposes which is about storing data locally on your PC as the cloud and
handles user sessions.

We used technologies such as HTML, CSS, JAVASCRIPT and EXPRESS.

When you pull the repo, to successfully run the server with no SQL errors, follow the steps below:
   1. Install MySQL on your machine.
   2. Clone/Pull the repository.
   3. Import the database using MySQL Workbench by typing this in command line or VS code terminal:
     `
       mysql -u <username> -p < sql/auth_db.sql
     `
   
    NB: <username> is the name of your mysql server e.g root. And enter the password when prompted.

    4. Install all backend dependencies by typing this in VS code terminal:
    `
       npm install express mysql2 express-session
    `
    
    5. Run the server at the VS code terminal:
    `
       node server.js
    `
    
    6. Open your browser at " http://localhost:3000/login.html"
 
 And you are good to go.

