var historyList = [];
var arrayForStorage = [];
var historyWindow = document.getElementById('history-content');

displayHistory();

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
        addSelect();
    }

    if (historyWindow.firstChild) { //Adding the option element unto the select element - list of searched location


        if (strArr != locStrArr) {
            var option = document.createElement('option');
            option.innerText = entryArray;
            historyList.insertBefore(option, historyList.firstChild);
            arrayForStorage.unshift(entryArray);
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


function displayHistory() {
    retLocStrg();
    
    if (arrayForStorage) {
        addSelect();

        for (i = 0; i < arrayForStorage.length; i++) {
            var arr1 = arrayForStorage[i];
            var option = document.createElement('option');
            option.innerText = arr1;
            historyList.append(option);
        }

        var div = document.createElement('div');
        div.setAttribute('class', 'buttons');

        var btnGo = document.createElement('button');
        btnGo.setAttribute('id', 'submit-hist');
        btnGo.setAttribute('class', 'button is-info is-fullwidth my-history-btn');
        btnGo.innerText = 'Go';
        div.append(btnGo);
        historyWindow.append(div);
        goBtn = document.getElementById('submit-hist');
        goBtn.addEventListener('click', sendSelected);
    }


}

function addSelect() {
    var div = document.createElement('div');
    div.setAttribute('class', 'select is-info is-fullwidth')
    var select = document.createElement('select');
    select.setAttribute('id', 'drop-down');
    div.append(select);
    historyWindow.append(div);
    historyList = document.getElementById('drop-down');
}

function sendSelected() {
    var string = historyList.value;
    var arr1 = string.split(',');

    inputDest.value = arr1[0];
    inputFrom.value = arr1[1];
    formDate.value = arr1[2];

}