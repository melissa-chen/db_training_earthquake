const hour = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson";
const day = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";
const week = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";
const month = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";
var curType = 'day';

var autoref = false;
const autoDisabled = 'Auto Refresh Disabled';
const autoEnabled = 'Auto Refresh Enabled';

function getData(srcStr)
{
    $.get(srcStr, 
                function(data)
                {
                    console.log("Called.");
                    var pageContent = $("#entry-template").html();
                    var template = Handlebars.compile(pageContent);
                    var htmlContent = template(data);

                    $("#data").html(htmlContent);
                }
         );
}

function changeSrc(typeStr)
{
    curType = typeStr;
    if (typeStr == 'hour')
        getData(hour)
    else if (typeStr == 'day')
        getData(day)
    else if (typeStr == 'week')
        getData(week)
    else if (typeStr == 'month')
        getData(month)
    else
    {
        curType = 'day';
        getData(day);
        console.error("Wrong Type of argument in changeSrc");
    }
}

$(document).ready(changeSrc(curType));

Handlebars.registerHelper("Convert", function(timeStamp) {
	return new Date(timeStamp);
});

Handlebars.registerHelper("ChangeText", function() {
    return autoref ? autoEnabled : autoDisabled;
});

function refresh()
{
    changeSrc(curType);
}

function autoRefreshChange()
{
    autoref = ! autoref;
    var buttonText = autoref ? autoEnabled : autoDisabled;
    $("#autorefbutton").html(buttonText);
}

//  Default no autorefresh. Auto Refresh happens every 30s.
setInterval
(
    function() 
    {
        if (autoref)
            refresh();
    },
        30000
);

function generateMap(longitude, latitude)
{
    var uluru = {lat: parseInt(latitude), lng: parseInt(longitude)};
    var map = new google.maps.Map(document.getElementById('map'),
    {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker(
    {
        position: uluru,
        map: map
        
    });
}

function initMap()
{
    generateMap(0, 0);
}

Handlebars.registerHelper("ExtractLong", function(coord) {
    return coord[0];
});
Handlebars.registerHelper("ExtractLat", function(coord) {
    return coord[1];
});
Handlebars.registerHelper("ExtractDepth", function(coord) {
    return coord[2];
});