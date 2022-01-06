var form = document.getElementById('inputForm');
var inputDest = document.getElementById('loc-to');
var inputFrom = document.getElementById('loc-from');


form.addEventListener('submit', (event) => {
    event.preventDefault();  // prevents automatic refresh
    var Destination = inputDest.value;
    var Origin = inputFrom.value;
    console.log(Destination);
    
  });