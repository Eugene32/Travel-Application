var form = document.getElementById('inputForm');
var inputDest = document.getElementById('loc-to');
var inputFrom = document.getElementById('loc-from');
var formDate = document.getElementById('form-date');
var historyWindow = document.getElementById('history-content');


form.addEventListener('submit', (event) => {
  event.preventDefault();  // prevents automatic refresh
  var Destination = inputDest.value;
  var Origin = inputFrom.value;
  var chosenDate = formDate.value




  if (Destination) {
    // Add function here to display map of destination
    // Add function here to display weather at destination with or without dates
    citySearch();
    modal.style.display = 'block';


    saveToHistory(); // Function to save history


  }

  else if (Destination && Origin) {
    // Add function here to display route from start location to destination
    // Add function here to display weather at destination with or without dates

    saveToHistory(); // Function to save history

  }

});


// Server Error Modal Script -- Start

// You can uncomment the two lines below to see the serverErrorModal
//var serverError = document.getElementById("modalTestButton");
//serverError.addEventListener('click', serverErrorDisplay);

// Get modal window
var serverErrorModal = document.getElementById('serverErrorModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// Display the error modal due to server response error
function serverErrorDisplay() {
  
  serverErrorModal.style.display = "block";

}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  serverErrorModal.style.display = "none";
}

