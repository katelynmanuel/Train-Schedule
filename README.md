# Train-Schedule

Assignment Seven: Train Scheduler

### Overview

In this assignment, I'm using Firebase to store user input to show the current train schedule. The user will be able to view the train name, destination, frequency of arrival, next arrival, and how many minutes away the next train is. I also included a form for the client to add a new train to the list of existing trains. 

### Deployed Project

https://katelynmanuel.github.io/Train-Schedule/

### Step One
In the first step, I initiliaze the Firebase connection and create variables to format the next train and minutes until the next train.

### Step Two
When the document has fully loaded, I create an Event Handler in the second step for the form to add a new train. I then create variables to hold the data for the train name, destination name, first train time, and the train frequency.

### Step Three
In this step, I add the timestamp value to the database so we can display when the trains will arrive based on their entry into the database. I then push the train name, destination, first train time, train frequency, and date added into Firebase so each user can view the information. 

### Step Four
The next step was to display train information from the database push while calculating the minutes until the next train using moment.js. I then format the display and apppend each displayed element to the document.
