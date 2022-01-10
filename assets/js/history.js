// var form = document.getElementById('inputForm');
// var inputDest = document.getElementById('loc-to');
// var inputFrom = document.getElementById('loc-from');
// var formDate = document.getElementById('form-date');
// var historyWindow = document.getElementById('search-content');
//var historyList = document.getElementById('drop-down');
var historyList = [];
var arrayForStorage = [];

function saveToHistory() {
    retLocStrg();

    var from = inputFrom.value;
    var to = inputDest.value;
    var date = formDate.value;
    var entryArray = [to, from, date];
    var locStrArr;

    var strArr = entryArray.toString();


    if (arrayForStorage.length != 0) {
        var tempArr = arrayForStorage[0];
        locStrArr = tempArr.toString();
    }

    if (historyWindow.children.length === 0) { // Adding the select element - drop down list of searches

        console.log('Select elment is added');
        var div = document.createElement('div');
        div.setAttribute('class', 'select is-info is-fullwidth')
        var select = document.createElement('select');
        select.setAttribute('id', 'drop-down');
        div.append(select);
        historyWindow.append(div);
        historyList = document.getElementById('drop-down');
    }

    if (historyWindow.firstChild) { //Adding the option element unto the select element - list of searched location


        if (strArr != locStrArr) {
            var option = document.createElement('option');
            option.innerText = entryArray;
            historyList.insertBefore(option, historyList.firstChild);
            arrayForStorage.unshift(entryArray);
           // console.log('unshifted value of arrayforstorage is ' + arrayForStorage);
            if (historyList.children.length == 6) {
                arrayForStorage.pop();
                historyList.lastChild.remove();
             }
            saveToLoc();
        }

    }

}

function saveToLoc() {
    // Saving a string file into the local storage
    localStorage.setItem('histList', JSON.stringify(arrayForStorage));
}

// Retrievng local storage if it exists
function retLocStrg() {
    // Retrieving the local storage data
    var tempStringList = localStorage.getItem("histList");
    // If the local storage is not empty then update srchHist
    if (tempStringList) {
        arrayForStorage = JSON.parse(tempStringList);
    }

}