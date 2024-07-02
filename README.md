# MulterUsingMysql
# Multer with MySQL File Upload

This project demonstrates how to use Multer to handle file uploads in an Express.js application and store the file metadata in a MySQL database.

## Prerequisites

- Node.js installed
- MySQL installed and running

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/multer-mysql-upload.git
2. Install the dependencies:
npm install


Setting up the Database
    Start your MySQL server.
    Create a database called file_upload:
    sql

CREATE DATABASE file_upload;
  Create a table called files:
  sql

CREATE TABLE files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL,
  originalname VARCHAR(255) NOT NULL,
  mimetype VARCHAR(255) NOT NULL,
  size INT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
      Running the Application
          Start the server:


npm start
The server will be running on http://127.0.0.1:3000.

API Endpoints
Upload a Single File
    URL: /upload
    Method: POST
    Form Data: File (file input)
Response:
    201 Created: File uploaded successfully.
    500 Internal Server Error: Error uploading file.
Upload Multiple Files
    URL: /uploads
    Method: POST
Form Data: Files (file input, multiple)
Response:
      201 Created: Files uploaded successfully.
      400 Bad Request: No files were uploaded.
      500 Internal Server Error: Error uploading files.
Download a File
    URL: /download/:filename
    Method: GET
Response:
    200 OK: File downloaded successfully.
    404 Not Found: File not found.
    500 Internal Server Error: Error downloading file.

Project Structure


multer-mysql-upload/
│
├── uploads/             # Directory where uploaded files are stored
├── db.js                # MySQL connection configuration
├── app.js               # Main application file
├── package.json         # Project dependencies and scripts
├── README.md            # Project documentation

#Dependencies
  express: ^4.19.2
  multer: ^1.4.5-lts.1
  mysql2: ^3.10.2
  nodemon: ^3.1.4
