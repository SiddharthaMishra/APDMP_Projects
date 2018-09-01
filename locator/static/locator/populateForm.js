function createOption(text, value) {
    if (value == undefined) value = text;
    var option = document.createElement("option");
    option.text = text;
    option.value = value;
    return option;
}

function populateDistricts(districts) {
    var dropdown = document.getElementById('district');
    
    for (var key in districts)
        dropdown.appendChild(createOption(key));
}

function populateMandals(district) {
    var dropdown = document.getElementById('mandal');
    while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
    }
    dropdown.appendChild(createOption("None", ""));
    for (var mandal in district) {
        dropdown.appendChild(createOption(mandal));
    }
}

function populateVillages(mandal) {
    console.log(mandal);
    var dropdown = document.getElementById('village');
    while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
    }
    dropdown.appendChild(createOption("None", ""));
    for (var village in mandal) {
        dropdown.appendChild(createOption(mandal[village]));
    }
}

function populateLFA(lfas) {
    var dropdown = document.getElementById('lfa');
    
    for (var key in lfas)
        dropdown.appendChild(createOption(key));
}

function populateFA(lfa) {
    var dropdown = document.getElementById('fa');
    while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
    }
    dropdown.appendChild(createOption("None", ""));
    for (var fa in lfa) {
        dropdown.appendChild(createOption(lfa[fa]));
    }
}