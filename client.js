var mqtt = require('mqtt')
var client = mqtt.connect('tcp://114.116.47.229:1883', {
    clientId: "mqtt_sample_publisher_chapter_8",
    clean: false,
    will:{
        topic : 'client/status',
        qos: 1,
        retain: true,
        payload: JSON.stringify({id:'B0052FT0001',status: 'offline'})
    }
})

client.on('connect', function (connack) {
    if(connack.returnCode == 0){
        client.publish("client/status", JSON.stringify({status: 'online'}), {qos: 1, retain: 1})
        console.log(`Pushlish message successfully!`)
    }else{
        console.log(`Connection failed: ${connack.returnCode}`)
    }
})