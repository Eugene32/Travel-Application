// var form = document.getElementById('inputForm');
// var inputDest = document.getElementById('loc-to');
// var inputFrom = document.getElementById('loc-from');
// var formDate = document.getElementById('form-date');
// var historyWindow = document.getElementById('search-content');
//var historyList = document.getElementById('drop-down');
var historyList 


function saveToHistory() {
    var from = inputFrom.value;
    var to = inputDest.value;
    var date = formDate.value;

    var entryArray = [to, from, date];



    if (historyWindow.children.length === 0) {
        console.log('Creation of selection list was made');
        var div = document.createElement('div');
        div.setAttribute('class', 'select is-info is-multiple is-fullwidth')
        var select = document.createElement('select');
        select.setAttribute('id', 'drop-down');
        div.append(select);
        historyWindow.append(div);
        historyList = document.getElementById('drop-down');
    }

    if (historyWindow.firstChild) {
        console.log('Creation of option was executed');
        var option = document.createElement('option');
        option.innerText = entryArray;
        console.log(option.value);
        historyList.append(option);
    }

}