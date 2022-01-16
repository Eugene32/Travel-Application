mapboxgl.accessToken = 'pk.eyJ1Ijoia2FydGhpa2psMjQiLCJhIjoiY2t5MnBvdjlwMG51ZDJubGdzOTBldnBpNCJ9.nVMcF_aHd0PBFQw-6nPJDQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});

map.addControl(new mapboxgl.NavigationControl());

function resolveLocationName(longitude, latitude) {
    // const apiKey = "pk.eyJ1Ijoia2FydGhpa2psMjQiLCJhIjoiY2t5MnBvdjlwMG51ZDJubGdzOTBldnBpNCJ9.nVMcF_aHd0PBFQw-6nPJDQ";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;

    return fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
            else {
                serverErrorDisplay();
            }
        })
        .then(function (response) {

            if (response.ok) {
                const features = response.features;

                const location = features.filter(function (feature) {
                    return feature.id.slice(0, 5) === 'place';
                });
                if (location.length === 0) {
                    throw "Place not found..";
                }

                return location[0].place_name;
            }
            else {
                serverErrorDisplay();
            }

        })
}

const direction = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    controls: {
        inputs: false,
    }
});


direction.on('origin', function (event) {
    console.log('origin', event);
    const feature = event.feature;
    const coord = feature.geometry.coordinates;
    resolveLocationName(coord[0], coord[1])
        .then(function (location) {
            console.log('location', location);
            document.getElementById('loc-from').value = location;
        })


});

direction.on('destination', function (event) {
    console.log('destination', event);

})

map.addControl(direction, 'top-left');

var form = document.getElementById('inputForm');
var inputDest = document.getElementById('loc-to');
var inputFrom = document.getElementById('loc-from');
var formDate = document.getElementById('form-date');
var historyWindow = document.getElementById('search-content');


form.addEventListener('submit', (event) => {
    event.preventDefault();  // prevents automatic refresh
    var Destination = inputDest.value;
    var Origin = inputFrom.value;
    var chosenDate = formDate.value
    direction.setDestination(Destination);
    direction.setOrigin(Origin);




    if (Destination) {
        // Add function here to display map of destination
        // Add function here to display weather at destination with or without dates


        saveToHistory(); // Function to save history

    }

    else if (Destination && Origin) {
        // Add function here to display route from start location to destination
        // Add function here to display weather at destination with or without dates

        saveToHistory(); // Function to save history

    }


});


