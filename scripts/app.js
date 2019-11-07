onload();
function onload() {
    var latitude = 25.26479,
        longitude = 55.32639,
        zoomlevel = 13;

    displayTomTom(latitude, longitude, zoomlevel);
    displayHere(latitude, longitude, zoomlevel);
    
};


// Move map according to a city selected
function moveMapToCity() {
    var coordinates = document.getElementById('city').value;
    var str = coordinates.split(',');
    latitude = str[0].trim();
    longitude = str[1].trim();

    map.setCenter({ lat: latitude, lng: longitude });
    map.setZoom(14);

    document.getElementById('coordinates').value = coordinates;
    document.getElementById('zoomlevel').value = 14;
};

// Move map according to Pan To & Zoom Level
function moveMapToCoordinates() {
    var coordinates = document.getElementById('coordinates').value;
    var str = coordinates.split(',');
    latitude = str[0].trim();
    longitude = str[1].trim();

    var zoomlevel = document.getElementById('zoomlevel').value;

    map.setCenter({ lat: latitude, lng: longitude });
    map.setZoom(zoomlevel);
};


var TomTom;
// TomTom Maps
// https://developer.tomtom.com/maps-sdk-web-js/functional-examples
function displayTomTom(latitude, longitude, zoomlevel) {
     TomTom = tt.map({
        key: 'kKC71nZeQchh4LAzaWpXcOm8mFGC4hMj',
        container: 'TomTom',
        style: 'tomtom://raster/1/basic-main',
        dragPan: !window.isMobileOrTablet()
        
    });
};





// HERE Maps
var map;
function displayHere(latitude, longitude, zoomlevel) {
    /**
    * Boilerplate map initialization code starts below:
    */

    //Step 1: initialize communication with the platform
    // In your own code, replace variable window.apikey with your own apikey
    var platform = new H.service.Platform({

        //Replace with your own credentials.
        //Please do not use this apikey for other purposes.
        //To obtain the credentials for an application, please visit http://developer.here.com/plans to register with HERE.
        apikey: 'QvIVGzA3xtY-C85u2Bt_VIhsLgV8eajYfTbGyWsFai0'
    });
    var defaultLayers = platform.createDefaultLayers();

    //Step 2: initialize a map - this map is centered over Europe
    map = new H.Map(document.getElementById('here'),
        defaultLayers.vector.normal.map, {
        center: { lat: latitude, lng: longitude },
        zoom: zoomlevel,
        pixelRatio: window.devicePixelRatio || 1
    });
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    // Now use the map as required...

    synchronizeMaps();
};



function synchronizeMaps() {
    map.addEventListener('mapviewchangeend', function () {
        var latitude = map.getCenter().lat.toFixed(5),
            longitude = map.getCenter().lng.toFixed(5),
            zoomlevel = map.getZoom().toFixed(0);

        moveTomTom(latitude, longitude, zoomlevel);

        document.getElementById('coordinates').value = latitude + ',' + longitude;
        document.getElementById('zoomlevel').value = zoomlevel;

    }, false);
};



function moveTomTom(latitude, longitude, zoomlevel) {
    var v2 = [longitude, latitude];
    TomTom.setCenter(v2);
    TomTom.setZoom(zoomlevel-1);
};
