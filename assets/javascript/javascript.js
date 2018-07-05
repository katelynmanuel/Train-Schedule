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

    $(document).ready(function () {
        $("#addNewTrainForm").on("submit", function (event){
            event.preventDefault();

        //Create variables
        var trainName = $("#inputTrainName").val().trim();
        var destinationName = $("#inputDestinationName").val().trim();
        var firstTrainTime = $("#inputFirstTrainTime").val().trim();
        var trainFrequency = $("#inputFrequency").val().trim();
        var currentTime = moment();
        console.log("Current Time:" + moment(currentTime).format("hh:mm"));

        var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        console.log("First Train Time Converted: " + firstTrainTimeConverted)

        var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
        console.log("Difference in time: " + diffTime);

        var tRemainder = diffTime % trainFrequency;
        console.log("Remainder: " + tRemainder);

        //Minutes until train
        var minutesUntilTrain = trainFrequency - tRemainder;
        console.log("Minutes until train: " + minutesUntilTrain);

        var nextTrain = moment().add(minutesUntilTrain, "minutes");
        console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

        var formatNextTrain = moment(nextTrain).format("LT",);

        var dateAdded = firebase.database.ServerValue.TIMESTAMP;

        database.ref().push ({
            trainName: trainName,
            destinationName: destinationName,
            firstTrainTime: firstTrainTime,
            trainFrequency: trainFrequency,
            dateAdded: dateAdded
        });

        database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot){
            console.log(snapshot.val().trainName);
            var form = document.getElementById("addNewTrainForm");
            $("#tableBody").append(`
                <tr>
                <td>${snapshot.val().trainName}</td>
                <td>${snapshot.val().destinationName}</td>
                <td>every ${snapshot.val().trainFrequency} minutes</td>
                <td>${formatNextTrain}</td>
                <td>${minutesUntilTrain} minutes away</td>
            `)
            form.reset();
        });

        })
        

        
    });

    

//Create Event Handler for when submit button

//

// (TEST 2)
    // First Train of the Day is 3:00 AM
    // firstTrain = "3:00 AM"
    // Assume Train comes every 17 minutes.
    // trainInterval = (firstTrain + 17);
    // Assume the current time is 3:16 AM....
    // currentTime = moment.format()
    // What time would the next train be...? (Use your brain first)
    
    // It would be 3:21 -- 5 minutes away