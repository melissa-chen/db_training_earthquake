function getData() {
    $.get("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson", function(data) {
      console.log("Called.");

      var source   = $("#entry-template").html();
      var template = Handlebars.compile(source);
      var html    = template(data);

      $("#data").html(html);
  });
}

$(document).ready(getData());

Handlebars.registerHelper("Convert", function(timeStamp) {
	return new Date(timeStamp);
});

function refresh() {
    getData();
}