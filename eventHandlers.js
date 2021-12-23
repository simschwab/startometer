const logger = require("./db/logger.js");

exports.sendEvent = null;

exports.registerEventHandlers = function (source) {
  source.addEventListener("MyEvent", handleMyEvent);

  source.addEventListener("SensorData", handleData);
};

function handleMyEvent(event) {
  // read variables from the event
  var data = {
    eventName: event.type,
    eventData: JSON.parse(event.data).data, // the value of the event
    deviceId: JSON.parse(event.data).coreid,
    timestamp: JSON.parse(event.data).published_at,
  };

  //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

  try {
    // you can add more properties to your data object
    data.myMessage = "Hello World";

    // TODO: do something meaningful with the data

    // Log the event in the database
    logger.logOne("MyDB", "MyEvent", data);

    // send data to all connected clients
    exports.sendEvent(data);
  } catch (error) {
    console.log("Could not handle event: " + JSON.stringify(event) + "\n");
    console.log(error);
  }
}

function handleData(event) {
  var sensorData = JSON.parse(event.data).data;

  var startDecision = false;

  function startLogic() {
    if (sensorData) {
      startDecision = true;
    }
  }

  var data = {
    eventName: event.type,
    SensorData: JSON.parse(sensorData),
    timestamp: JSON.parse(event.data).published_at,
    deviceId: JSON.parse(event.data).coreid,
  };

  try {
    logger.logOne("Measurements", "SensorData", data);

    exports.sendEvent(data);
  } catch (error) {
    console.log("Could not handle event: " + JSON.stringify(event) + "\n");
    console.log(error);
  }
}
