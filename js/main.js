// Карта
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);



// Адаптер треков


// Настройки подключения к сервису
var serviceConnectionSettings = {
    service: "nearest",
    version: "v1",
    profile: "driving",

    url: function () {
        var url = this.service + "/" + this.version + "/" + this.profile + "/";
        return url;
    }
};

// Настройки поиска адаптера
var serviceAdaptSettings = {
    suggestionsAmount: 3,
    bearings: "0,20"
};

// Трек
var track = {
    initialTrack: [
        [13.388860, 52.517037],
        [13.397634, 52.529407],
        [13.428555, 52.523219]
    ],
    adaptedTrack: [],

    coordsToString: function(index) {
        var coordsString = this.initialTrack[index][0] + "," + this.initialTrack[index][1];
        return coordsString;
    }
}

var request = new XMLHttpRequest();
function reqReadyStateChange() {
    if (request.readyState == 4) {
        var status = request.status;
        if (status == 200) {
            var response = JSON.parse(request.responseText);
            console.log(response);
            var marker = L.marker([response.waypoints[0].location[1], response.waypoints[0].location[0]]).addTo(mymap);
            mymap.setView([response.waypoints[0].location[1], response.waypoints[0].location[0]], 9);

        }
    }
}

request.open("GET", "http://router.project-osrm.org/" + serviceConnectionSettings.url() + track.coordsToString(1));
request.onreadystatechange = reqReadyStateChange;
request.send();