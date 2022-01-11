mapboxgl.accessToken = 'pk.eyJ1Ijoia2FydGhpa2psMjQiLCJhIjoiY2t5MnBvdjlwMG51ZDJubGdzOTBldnBpNCJ9.nVMcF_aHd0PBFQw-6nPJDQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11'
});

map.addControl(new mapboxgl.NavigationControl());

function resolveLocationName(longitude, latitude){
    // const apiKey = "pk.eyJ1Ijoia2FydGhpa2psMjQiLCJhIjoiY2t5MnBvdjlwMG51ZDJubGdzOTBldnBpNCJ9.nVMcF_aHd0PBFQw-6nPJDQ";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;
    console.log(url);
    return fetch(url)
        .then(function(response){
            return response.json()
        })
        .then(function(response){
            console.log(response)
            const features = response.features;

            const location = features.filter(function(feature){
                return feature.id.slice(0,5) === 'place';
            });
            if(location.length === 0){
                throw "Place not found..";
            }

            return location[0].place_name;

        })
}

const direction =  new MapboxDirections({
    accessToken: mapboxgl.accessToken
    });
    
direction.on('origin', function(event){
    console.log('origin', event);
    const feature = event.feature;
    const coord = feature.geometry.coordinates;
    resolveLocationName(coord[0], coord[1])
        .then(function(location) {
            console.log('location', location);
            document.getElementById('loc-from').value = location;
        })


});

direction.on('destination', function(event){
    console.log('destination', event);
    
})

map.addControl(direction, 'top-left');

map.setDestination("Melbourne");
