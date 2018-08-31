var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 15.9129, lng: 81.7400},
        zoom: 6.5,
    });
    
    var defaultMap = new google.maps.Data();

    //console.log()

    defaultMap.addGeoJson(ap_districts);
    defaultMap.setStyle({
        fillColor: 'green',
        strokeWeight: 0.25
    });

    defaultMap.setMap(map); 

    var mandalMap = new google.maps.Data();

    mandalMap.addGeoJson(apdmp_mandals);
    mandalMap.setStyle({
        fillColor: 'blue',
        strokeWeight: 0.5
    });

    var villageMap = new google.maps.Data();

    villageMap.addGeoJson(apdmp_villages);
    villageMap.setStyle({
        fillColor: 'red',
        strokeWeight: 1,
    });

    var pointMap = new google.maps.Data();

    google.maps.event.addDomListener(document.getElementById('dispMandal'), 
        'change', function() {   
        if(document.getElementById('dispMandal').checked) {
            mandalMap.setMap(map);
        } else {
            mandalMap.setMap(null);
        }
    });

    google.maps.event.addDomListener(document.getElementById('dispVillages'), 
        'change', function() {   
        if(document.getElementById('dispVillages').checked) {
            villageMap.setMap(map);
        } else {
            villageMap.setMap(null);
        }
    });

    var current_marker = new google.maps.Marker();

    google.maps.event.addDomListener(document.getElementById('sub'), 
        'click', function() {   
        var village = document.getElementById('village');
        pointMap.setMap(null);
        current_marker.setMap(null);
        pointMap =  new google.maps.Data();

        for(let i=0; i<apdmp_villages['features'].length; i++) {
            if(apdmp_villages['features'][i]['properties']['name'] == village.value) {
                var village_feature = apdmp_villages['features'][i];
                break;
            }
        }
        console.log(village_feature);
        var max_coordinates = village_feature['geometry']['coordinates'][0][0].reduce(function(a,b){
            return [a[0] > b[0] ? a[0] : b[0], a[1] > b[1] ? a[1] : b[1]];
        });
        var min_coordinates = village_feature['geometry']['coordinates'][0][0].reduce(function(a,b){
            return [a[0] < b[0] ? a[0] : b[0], a[1] < b[1] ? a[1] : b[1]];
        });

        var coords = [(max_coordinates[0] + min_coordinates[0])/2,
            (max_coordinates[1] + min_coordinates[1])/2];
        
        console.log(coords);

        current_marker =  AddMarker(coords[1], coords[0]);

        pointMap.addGeoJson(village_feature);
        pointMap.setStyle({
            fillColor: 'gold',
            strokeWeight: 2,
        });
        pointMap.setMap(map);
    });
}

function AddMarker(Long, Lati) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng( Long, Lati),
        map: map
    });
    
    map.setZoom(10);
    map.panTo(marker.getPosition());
    return marker;
}