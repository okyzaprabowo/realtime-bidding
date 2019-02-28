// Called after form input is processed
function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = "broker.hivemq.com";
    port = 8000;

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
    });
}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    topic = "mqtt/bidapp/bkmraya02";

    // Print output for the user in the messages div
    console.log("[read.html] Subscribing to: " + topic);

    // Subscribe to the requested topic
    client.subscribe(topic);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    console.log("[read.html] ERROR: Connection lost");
    if (responseObject.errorCode !== 0) {
        console.log("[read.html] ERROR: " + responseObject.errorMessage );
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    console.log("[read.html] onMessageArrived: " + message.payloadString);
    if(message.payloadString == "query")
    {
        console.log("[read.html] Sending query request...");
        $.get("../api/read.php", function(data, status){
            // console.log("Data: " + data + "\nStatus: " + status);
            var obj = JSON.parse(data);
            $("#table").text("");
            Object.keys(obj).forEach(function(key) {
                console.log(key, obj[key]);
                $("#table").append(obj[key].id + " - " + obj[key].bidder_name + " - " + obj[key].bidder_value + " - " + obj[key].bidder_timestamp + "<br>");
            });
        });
    }
}

function getDataFirst()
{
    $.get("../api/read.php", function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
        var obj = JSON.parse(data);
            Object.keys(obj).forEach(function(key) {
                console.log(key, obj[key]);
                $("#table").append(obj[key].id + " - " + obj[key].bidder_name + " - " + obj[key].bidder_value + " - " + obj[key].bidder_timestamp + "<br>");
            });
    });
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}

getDataFirst();
startConnect();