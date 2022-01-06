// var form = document.getElementById('inputForm');
// var inputDest = document.getElementById('loc-to');
// var inputFrom = document.getElementById('loc-from');
// var formDate = document.getElementById('form-date');
// var historyWindow = document.getElementById('history-content');


function saveToHistory() {
    var from = inputFrom.value;
    var to = inputDest.value;
    var date = formDate.value;

    console.log(from);
    console.log(to);
    console.log(date);



    var newBtn = document.createElement('button');
    // newBtn.classList.add('button');
    // newBtn.classList.add('is-dark');
    // newBtn.classList.add('is-fullwidth');
    newBtn.setAttribute('class', 'button is-dark is-fullwidth is-rounded columns');

    var entryArray = [to, from, date];
    console.log(entryArray);


    for (let index = 0; index < 3; index++) {
        var span = document.createElement('span');
        span.innerText = entryArray[index];
        span.setAttribute('class', 'column' );
        newBtn.append(span);
    }

    historyWindow.append(newBtn);

    

     

   
}