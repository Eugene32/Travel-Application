var form = document.getElementById('inputForm');
var inputDest = document.getElementById('loc-to');
var inputDest1 = document.getElementById('loc-to1');
var inputFrom = document.getElementById('loc-from');
var formDate = document.getElementById('form-date');
var historyWindow = document.getElementById('history-content');


form.addEventListener('submit', (event) => {
  event.preventDefault();  // prevents automatic refresh
  var Destination = inputDest.value;
  inputDest1.value = Destination;
  var Destination1 = inputDest1.value;
  inputDest1.style.display = "none";

  console.log(Destination1);
  var Origin = inputFrom.value;
  var chosenDate = formDate.value


  if (Destination1) {
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
