var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://iot.eclipse.org', {
    clientId: "mqtt_sample_publisher_3",
    clean: false
})

client.on('connect', function (connack) {
    if(connack.returnCode == 0){
        client.publish("home/2ndfloor/201/temperature999", JSON.stringify({current: 25}), {qos: 0, retain: 1}, function (err) {
            if(err == undefined) {
                console.log("Publish finished")
                client.end()
            }else{
                console.log("Publish failed")
            }
        })
    }else{
        console.log(`Connection failed: ${connack.returnCode}`)
    }
})