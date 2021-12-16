var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001

// initialise server-sent events
function initSSE() {
  if (typeof EventSource !== "undefined") {
    var url = rootUrl + "/api/events";
    var source = new EventSource(url);
    source.onmessage = (event) => {
      updateVariables(JSON.parse(event.data));
    };
  } else {
    alert("Your browser does not support server-sent events.");
  }
}
initSSE();

function updateVariables(data) {
  if (data.eventName === "SensorData") {
    var temperature = data.SensorData.temperatureInC + " °C";
    var humidity = data.SensorData.humidityPercentage + " %";
    var pressure = data.SensorData.pressureHpa + " hPa";
    var altitude = data.SensorData.approxAltitudeInM + " m";
    var wind = data.SensorData.windspeedInKmh + " km/h";
  }

  document.getElementById("latestTemperature").innerHTML = temperature;
  document.getElementById("latestHumidity").innerHTML = humidity;
  document.getElementById("latestpressure").innerHTML = pressure;
  document.getElementById("latestAltitude").innerHTML = altitude;
  document.getElementById("latestWind").innerHTML = wind;

  var date = new Date();
  var localTime = date.toLocaleTimeString();

  document.getElementById("time").innerHTML = localTime;

}

var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var d = new Date();
var day = weekday[d.getDay()];
var date = d.toLocaleDateString();
document.getElementById("weekday").innerHTML = day;
document.getElementById("date").innerHTML = date;


