

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBZ0ALcTbskcYb3aFdOyFRjJ44vfal-MsE",
  authDomain: "train-scheduler-173d4.firebaseapp.com",
  databaseURL: "https://train-scheduler-173d4.firebaseio.com",
  projectId: "train-scheduler-173d4",
  storageBucket: "train-scheduler-173d4.appspot.com",
  messagingSenderId: "349493133208"
};
firebase.initializeApp(config);

//variable to reference the database
var database = firebase.database();

// Button for adding trains
$("#submitButton").on("click", function(event) {

  //grab user inputs
  var trainName = $("#train-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTime = $("#time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  console.log(trainName);
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: firstTime,
    frequency: frequency
  };

  //uploads employee data to database
  // var trainBase = database.ref('trains');
  // var trainPush = trainBase.push();
  // trainPush.set(newTrain);
  database.ref('trains').push(newTrain);

  //Alert
  alert("Your Funky Train Has Been Added! Enjoy The Music! ");

  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry

var dataRef = database.ref('trains');
dataRef.on("child_added", function(snapshot) {

  console.log(snapshot.val());


  var trainName = snapshot.val().name;
  var trainDestination = snapshot.val().destination;
  var firstTime = snapshot.val().time;
  var frequency = snapshot.val().frequency;

  //train info
  //console.log(trainName);
  //console.log(trainDestination);
  //console.log(frequency);

  // Prettify the trains fist start
  //var firstTime = moment.unix(firstTime).format("HH:mm");


  var startTimeCalculated = moment(firstTime, "HH:mm");

  // // Getting current time
  var currentTime = moment();

  // // Total minutes = current time - start time
  var totalMinutesPast = moment().diff(moment(startTimeCalculated), "minutes");
  //console.log(totalMinutesPast);

  var moduloRemainder = totalMinutesPast % frequency;
  console.log(moduloRemainder);

  var minutesToArrival = frequency - moduloRemainder;

  var nextArrivalTime = moment().add(minutesToArrival, "minutes");


  var nextArrivalTime2 = moment(nextArrivalTime).format('hh:mm');

  //Add each train's data into the table
  $(".myTableBody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    firstTime + "</td><td>" + frequency + "</td><td>" + nextArrivalTime2 + "</td><td>" + minutesToArrival + "</td></tr>");
});

function playSound() {
  document.getElementById('play').play();
}
