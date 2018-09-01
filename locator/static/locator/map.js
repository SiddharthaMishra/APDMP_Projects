var map;
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
      
    google.maps.event.addDomListener(document.getElementById('sub'), 
        'click', function() {

        
        var district = document.getElementById('district').value;
        var mandal = document.getElementById('mandal').value;
        var village = document.getElementById('village').value;
        var lfa = document.getElementById('lfa').value;
        var fa = document.getElementById('fa').value;


        if(lfa.value == "") {
            alert("Please Select LFA");
            return;
        } else {

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
                    }
                    map.data.setMap(map);
                },
                fail : function(e) {
                    alert(e);
                } 
            });
        }
    });

    google.maps.event.addDomListener(document.getElementById('reset'), 
        'click', function() {
        map.data.forEach(function(feature) {
            map.data.remove(feature);
        });
        map.panTo(new google.maps.LatLng(15.9129, 81.7400));
        map.setZoom(6.5);
        var district = document.getElementById('district').value = "";
        var mandal = document.getElementById('mandal').value = "";
        var village = document.getElementById('village').value = "";
        var lfa = document.getElementById('lfa').value = "";
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