function populateDistricts() {
    var dropdown = document.getElementById('district');
    Object.keys(districts).forEach(function(key){
        var option = document.createElement('option');
        option.text = key;
        option.value = key;
        dropdown.appendChild(option); 
    });
}

function populateMandals() {
    var dropdown = document.getElementById('mandal');
    var district = document.getElementById('district').value;
    
    while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
    }

    Object.keys(districts[district]).forEach(function(key){
        var option = document.createElement('option');
        option.text = key;
        option.value = key;
        dropdown.appendChild(option); 
    });
}

function populateVillages() {
    var dropdown = document.getElementById('village');
    var district = document.getElementById('district').value;
    var mandal = document.getElementById('mandal').value;
    
    while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
    }

    Object.keys(districts[district][mandal]).forEach(function(key){
        var option = document.createElement('option');
        option.text = key;
        option.value = key;
        dropdown.appendChild(option); 
    });
}

populateDistricts();
populateMandals();
populateVillages();

var districtDrop = document.getElementById('district');

districtDrop.onchange = function() {
    populateMandals();
    populateVillages();
}

var mandalDrop = document.getElementById('mandal');

mandalDrop.onchange = function() {
    populateVillages();
}
