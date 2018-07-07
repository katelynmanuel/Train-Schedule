//Initialize Firebase Connection (copy & paste from Firebase dashboard)
var config = {
    apiKey: "AIzaSyDx71xkhq38VqbsYhwEyK7AHMsXxkaPJmU",
    authDomain: "train-tracking-homework.firebaseapp.com",
    databaseURL: "https://train-tracking-homework.firebaseio.com",
    projectId: "train-tracking-homework",
    storageBucket: "train-tracking-homework.appspot.com",
    messagingSenderId: "237525165152"
};

firebase.initializeApp(config);

var database = firebase.database();
var formatNextTrain;
var minutesUntilTrain;

$(document).ready(function () {
    //Create Event Handler for submit button
    $("#addNewTrainForm").on("submit", function (event){
        event.preventDefault();

    //Create variables
    var trainName = $("#inputTrainName").val().trim();
    var destinationName = $("#inputDestinationName").val().trim();
    var firstTrainTime = $("#inputFirstTrainTime").val().trim();
    var trainFrequency = $("#inputFrequency").val().trim();

    //Adding date added to firebase to display order in which trains will arrive
    var dateAdded = firebase.database.ServerValue.TIMESTAMP;
    
    //Pushing variables to database
        database.ref().push ({
            trainName: trainName,
            destinationName: destinationName,
            firstTrainTime: firstTrainTime,
            trainFrequency: trainFrequency,
            dateAdded: dateAdded
        });
    });

    //Function to display train information from database push
    database.ref().on("child_added", function (childSnapshot, prevChildKey){
        // debugger;
        var currentTime = moment();
        console.log("Current Time:" + moment(currentTime).format("hh:mm"));
        
        //First Time - pushed back 1 year to make sure it comes before current time.
        var firstTrainTimeConverted = moment(childSnapshot.val().firstTrainTime, "HH:mm").subtract(1, "years");
        console.log("First Train Time Converted: " + firstTrainTimeConverted)
        
        //Difference between the times.
        var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
        console.log("Difference in time: " + diffTime);
        
        //Time apart - remainder
        var tRemainder = diffTime % childSnapshot.val().trainFrequency;
        console.log("Remainder: " + tRemainder);
    
        //Minutes until train
        minutesUntilTrain = childSnapshot.val().trainFrequency - tRemainder;
        console.log("Minutes until train: " + minutesUntilTrain);
        
        //Next Train
        var nextTrain = moment().add(minutesUntilTrain, "minutes");
        console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));
    
        //Formatting Next Train display
        formatNextTrain = moment(nextTrain).format("LT",);
        console.log("Train Name: " + childSnapshot.val().trainName);
        //Adding variable for form
        var form = document.getElementById("addNewTrainForm");

        //Appending user submissions to the table body
        $("#tableBody").append(`
            <tr>
            <td>${childSnapshot.val().trainName}</td>
            <td>${childSnapshot.val().destinationName}</td>
            <td>every ${childSnapshot.val().trainFrequency} minutes</td>
            <td>${formatNextTrain}</td>
            <td>${minutesUntilTrain} minutes away</td>
        `)

        //Resetting the form
        form.reset();
    });
    

    
});

