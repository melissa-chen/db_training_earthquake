// console.log("hi");
//
// $(document).ready(function(){
//   $.get("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson", function(data)
//   {
//     var source   = $("#entry-template").html();
//     var template = Handlebars.compile(source);
//
//     console.log(data);
//     alert( "Load was performed." );
//   });
// });


$(document).ready(function(){
  $.get("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson", function(data){
    console.log(data);

      var source   = $("#entry-template").html();
      var template = Handlebars.compile(source);
      var html    = template(data);

      $("#data").html(html);
  });
});
