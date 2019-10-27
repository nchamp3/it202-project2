var movie_name;
var park_name;
var day_name_list;
var day_name;
var check_box_date = "";
var url = 'empty';
var i;
$(document).ready(function() {

  function hideScreens() {
    $(".content").hide();
  }

  $(".nav-link").on("click", function() {
    hideScreens();
    var target = $(this).attr("id");
    if (target == '#map' || target == "#cards") {
      getData();
    }

    $(target).show();
    if (target == '#about')
    {
      $(target).load(target.replace("#", "") + ".html");
    }
  });

  $("#search-button").on("click", function() {
    clearMarkers();

    movie_name = $("#movie-name").val();
    park_name = $("#park-name").val();
    day_name_list = $("#day-name").val().split(',');
    day_name = "(";
    for (i = 0; i < day_name_list.length; i++) {
      day_name = day_name + "'" + day_name_list[i].replace(/\s/g, '').substring(0, 3) + "',";
    }
    day_name = day_name.substring(0, day_name.length - 1) + ")";
    if (document.getElementById('upcoming_checkbox').checked) {
      var d = new Date();
      var d_iso = d.toISOString();
      check_box_date = d_iso.substring(0, d_iso.length - 1);
    } else {
      check_box_date = "";
    }

    url = "https://data.cityofchicago.org/resource/7piw-z6r6.json";
    if (movie_name.length > 0 || park_name.length > 0 || day_name_list[0] != "") {
      url = url + "?$WHERE=";
      if (movie_name.length > 0) {
        url = url + "title=" + "'" + movie_name + "'"
      }
      if (park_name.length > 0) {
        if (movie_name.length > 0) {
          url = url + " AND " + "park=" + "'" + park_name + "'";
        } else {
          url = url + "park=" + "'" + park_name + "'";
        }
      }
      if (day_name_list[0] != "") {
        if (movie_name.length > 0 || park_name.length > 0) {
          url = url + " AND " + "day in" + day_name;
        } else {
          url = url + "day in" + day_name;
        }
      }
      if (check_box_date.length > 0) {
        url = url + " AND " + "date>" + "'" + check_box_date + "'";
      }
    } else {
      if (check_box_date.length > 0) {
        url = url + "?$WHERE=";
        url = url + "date>" + "'" + check_box_date + "'";
      }
    }
  })
});

function clearMarkers() {
  var i;
  for (i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function getData() {
  // console.log(url);
  // https://data.cityofchicago.org/resource/7piw-z6r6.json?$WHERE=title='Black Panther' and park='Austin Town Hall' and day='Thu'
  $("#card_row").html("");
  $.get(url,
    function(data) {
      $.each(data, function(i, v) {
        createMarker(v);
        createCard(v);
        // console.log(v);

      }); // end of the callback function and parameter list for $.each
    }); //  end of the callback function and parameter list for $.get
}
