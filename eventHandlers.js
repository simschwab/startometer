const logger = require("./db/logger.js");

exports.sendEvent = null;

exports.registerEventHandlers = function (source) {

  source.addEventListener("SensorData", handleData);
};

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
