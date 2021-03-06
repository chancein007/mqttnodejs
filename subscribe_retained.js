var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://iot.eclipse.org', {
    clientId: "mqtt_sample_subscriber_id_chapter_14",
    clean: false
})

client.on('connect', function (connack) {
    if(connack.returnCode == 0) {
        if (connack.sessionPresent == false) {
            console.log("subscribing")
            client.subscribe("home/2ndfloor/201/temperature999", {
                qos: 0
            }, function (err, granted) {
                if (err != undefined) {
                    console.log("subscribe failed")
                } else {
                    console.log(`subscribe succeeded with ${granted[0].topic}, qos: ${granted[0].qos}`)
                }
            })
        }
    }else {
        console.log(`Connection failed: ${connack.returnCode}`)
    }
})

client.on("message", function (_, message, packet) {
    var jsonPayload = JSON.parse(message.toString())
    console.log(`retained: ${packet.retain}, temperature: ${jsonPayload.current}`)
})