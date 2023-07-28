const express = require('express');
const bodyParser = require('body-parser');
const tasksRoute = require('./routes/tasksRoute'); // Import the tasks router
const fs = require('fs'); // Import the fs module for reading tasks from tasks.json

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.json());

// Use the tasks route
app.use('/tasks', tasksRoute);

// Sample route to test the server
app.get('/', (req, res) => {
  return res.status(200).send("Welcome to the app");
});

// Read tasks from tasks.json and set them as the initial tasks
const tasksData = fs.readFileSync('./tasks.json');
const tasks = JSON.parse(tasksData);

// Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server has started successfully");
  } else {
    console.error("Something went wrong", error);
  }
});
