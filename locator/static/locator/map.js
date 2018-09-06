var map;
var alllabels = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 15.9129, lng: 81.7400},
        zoom: 6.5,
        mapTypeId: 'satellite',
    });
    
    map.data.setStyle({
        fillColor: 'red',
        strokeWeight: 1,
        fillOpacity: 0.1,
    });


    $.ajax({
        url : "getborder",
        type : "POST",
        cache : false,
        success : function(res){
            var dl = new google.maps.Data({map:map});
            dl.addGeoJson(res);
            dl.setStyle({
                strokeWeight: 0.5,
            });
        },
        fail : function(e) {
            alert(e);
        } 
    });

    $.ajax({
        url : "getapdmpborder",
        type : "POST",
        cache : false,
        success : function(res){
            var dl = new google.maps.Data({map:map});
            dl.addGeoJson(res);
            dl.setStyle({
                fillColor: 'blue',
                strokeWeight: 0.5,
                fillOpacity: 0.1,
            });
            map.data.addGeoJson(res);

            res.features.forEach(function(feature) {
                let pos = [
                    feature.geometry.coordinates[0][0][0][1], 
                    feature.geometry.coordinates[0][0][0][0]
                ];

                var point = feature.geometry.coordinates[0][0].reduce(function(current, a){
                    return [current[0] + a[0],
                        current[1] + a[1]];
                },[0,0]);

                point[0] /= feature.geometry.coordinates[0][0].length;
                point[1] /= feature.geometry.coordinates[0][0].length;

               var mapLabel = new MapLabel({
                    text: feature.properties['district'],
                    position: new google.maps.LatLng(point[1], point[0]),
                    map: map,
                    fontSize: 20,
                    align: 'center',
                });
            });
        },
        fail : function(e) {
            alert(e);
        } 
    });
      
    google.maps.event.addDomListener(document.getElementById('sub'), 
        'click', function() {

        
        var district = document.getElementById('district').value;
        var mandal = document.getElementById('mandal').value;
        var village = document.getElementById('village').value;
        var lfa = document.getElementById('lfa').value;
        var fa = document.getElementById('fa').value;
        
        if(lfa || district) {

            $.ajax({
                url : "getareas",
                type : "POST",
                data : {
                    type : document.querySelector('input[name="type"]:checked').value,
                    district,
                    mandal,
                    village,
                    lfa,
                    fa,
                }, 
                cache : false,
                success : function(res){

                    while(alllabels.length > 0) {
                        let a = alllabels[0];
                        alllabels.shift();
                        a.setMap(null);
                    }

                    map.data.forEach(function(feature) {
                        map.data.remove(feature);
                    });
                    if(res == "") {
                        alert("No areas found");
                    } else {
                        map.data.addGeoJson(res);
                        var point = res.features.reduce(function(current, a){
                            return [current[0] + a.geometry.coordinates[0][0][0][0],
                                current[1] + a.geometry.coordinates[0][0][0][1]];
                        },[0,0]);
                        point[0] /= res.features.length;
                        point[1] /= res.features.length;
                        map.setZoom(6.5);
                        map.panTo(new google.maps.LatLng(15.9129, 81.7400));
                        map.setZoom(8.5);
                        map.panTo(new google.maps.LatLng(point[1], point[0]));

                        res.features.forEach(function(feature) {
                            let pos = [
                                feature.geometry.coordinates[0][0][0][1], 
                                feature.geometry.coordinates[0][0][0][0]
                            ];

                            var point = feature.geometry.coordinates[0][0].reduce(function(current, a){
                                return [current[0] + a[0],
                                    current[1] + a[1]];
                            },[0,0]);

                            point[0] /= feature.geometry.coordinates[0][0].length;
                            point[1] /= feature.geometry.coordinates[0][0].length;



                           var mapLabel = new MapLabel({
                                text: feature.properties['sub_distri'] || feature.properties['gp'],
                                position: new google.maps.LatLng(point[1], point[0]),
                                map: map,
                                fontSize: 10,
                                align: 'center',
                            });
                            alllabels.push(mapLabel);

                        });         
                        
                    }
                    map.data.setMap(map);
                },
                fail : function(e) {
                    alert(e);
                } 
            });
        } else {
            alert("Please Select options");
            return;
        }
    });

    google.maps.event.addDomListener(document.getElementById('reset'), 
        'click', function() {
        map.data.forEach(function(feature) {
            map.data.remove(feature);
        });

        while(alllabels.length > 0) {
            let a = alllabels[0];
            alllabels.shift();
            a.setMap(null);
        }

        map.panTo(new google.maps.LatLng(15.9129, 81.7400));
        map.setZoom(6.5);
        var district = document.getElementById('district').value = "";
        var mandal = document.getElementById('mandal').value = "";
        var village = document.getElementById('village').value = "";
        var lfa = document.getElementById('lfa').value = "";
        populateFA(lfas[""]);
        var fa = document.getElementById('fa').value = "";
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