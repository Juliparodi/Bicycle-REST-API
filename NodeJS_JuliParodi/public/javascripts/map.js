var mymap = L.map('main_map').setView([-34.672329,-58.3538834], 15); 
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', 
}).addTo(mymap);

L.marker([-34.6725579,-58.3544143]).addTo(mymap);
L.marker([34.6712227,-58.3554249]).addTo(mymap);
L.marker([-34.672329,-58.3538834]).addTo(mymap);