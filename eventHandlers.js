const logger = require('./db/logger.js');

exports.sendEvent = null;

exports.registerEventHandlers = function (source) {
    source.addEventListener('MyEvent', handleMyEvent);
    source.addEventListener('motion-detected', handleMotionDetection);
    source.addEventListener('Training hat angefangen.', handleTrainingStarted);
    source.addEventListener('Training ist beendet.', handleTrainingStopped);
    source.addEventListener('kadenz', handleCadence);

}

function handleMyEvent(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
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
        console.log(error)
    }
}

function handleMotionDetection(event) {

    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    try {        
        data.myMessage = "Motion Detected";

        logger.logOne("MyDB", "MotionDetected", data);

        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function handleTrainingStarted(event) {
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data,
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at,
        repcounter: JSON.parse(event.data).repcounter
    };

    try {        
        data.myMessage = "Training started";

        logger.logOne("MyDB", "TrainingStarted", data);

        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function handleTrainingStopped(event) {

    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data,
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at,
        repcounter: JSON.parse(event.data).repcounter,
        cadence: JSON.parse(event.data).kadenz

    };

    try {        
        data.myMessage = "Training stopped";

        logger.logOne("MyDB", "TrainingStopped", data);

        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function handleCadence(event) {

    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data,
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at,
        repcounter: JSON.parse(event.data).repcounter,
        cadence: JSON.parse(event.data).kadenz
    };

    try {        
        data.myMessage = "Cadence";

        logger.logOne("MyDB", "Cadence", data);

        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}