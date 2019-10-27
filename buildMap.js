var map;
var markers = [];
var cc;
var numcards = 0;

function initMap() {
  var chicago = {
    lat: 41.881832,
    lng: -87.623177
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: chicago
  });
}

function createCard(record){

  $("#card_row").append('<div class=\"card col-12 col-sm-6 col-lg-3\" id = \"single_card\">' +
    '<div class=\"card-body\">' +
    '<h5 class=\"card-title\">' + record.title + " (" + record.rating + ")" + '</h5>' +
    '<h6 class=\"card-subtitle mb-2 text-muted\">' + record.park + " - " + record.park_address + '</h6>' +
    '<h6 class=\"card-subtitle mb-2 text-muted\">' + record.date.split('T')[0] + " (" + record.day + ")" + '</h6>' +
    '<p class=\"card-text\">' + cc + '</p>' +
    '</div>' +
    '</div>'
  );

  ++numcards;


}

function countCards(){
  $('#num_card_row').append('<h1>' +
    numcards +
    ' matches found!' +
    '</h1> <br>'
  );
  numcards = 0;
}


function createMarker(record) {
  var lat_long = {
    lat: parseFloat(record.location.latitude),
    lng: parseFloat(record.location.longitude)
  };
  if (record.cc == "N") {
    cc = "Closed-captioning is not available";
  } else {
    cc = "Closed-captioning is available";
  }
  var contentString = '<div id="contentt">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h2 id="firstHeading" class="firstHeading">' + record.park + " - " + record.park_address + '</h2>' +
    '<h4 id="secondHeading" class="secondHeading">' + record.title + " (" + record.rating + ")" + " on " + record.date.split('T')[0] + " (" + record.day + ")" + '</h4>' +
    '<h6 id="thirdHeading" class="thirdHeading">' + cc + '</h6>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: lat_long,
    map: map,
    title: record.park
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  markers.push(marker);
}
