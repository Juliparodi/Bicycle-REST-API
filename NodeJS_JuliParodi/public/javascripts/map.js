var mymap = L.map('main_map').setView([-34.672329,-58.3538834], 15); 
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', 
}).addTo(mymap);


$.ajax({
    dataType = "json",
    url: "api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.location, {title: bici.id}).addTo(mymap);
            L.marker(bici.location, {title: bici.id}).addTo(mymap);
            L.marker(bici.location, {title: bici.id}).addTo(mymap);
        });
    }
})