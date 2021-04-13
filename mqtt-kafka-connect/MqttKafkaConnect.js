const mqtt=require('mqtt');
const {Kafka} = require("kafkajs")


class MqttKafkaConnect {

    constructor(mqttIP, mqttTopic, kafkaIp, kafkaClientId, kafkaTopic){
        console.log(kafkaIp)
        this.mqttTopic = mqttTopic;
        const url = "mqtt://"+ mqttIP +":1883"
        const options = {
            clientId:"mqttClient01",
            username:"muhammad",
            password:"123456",
            clean:true
        }

        this.mqttClient = mqtt.connect(url)
        this.kafka = new Kafka({
            "clientId": kafkaClientId,
            "brokers" :[kafkaIp]
        })
        this.kafkaTopic = kafkaTopic
        this.kafkaProducer = this.kafka.producer();

    }

    run(){

        this.mqttClient.on("connect", async () => {
            console.log("connected to Mosquitto");
            await this.kafkaProducer.connect()
            console.log("Connected to Kafka")
            this.mqttClient.subscribe(this.mqttTopic, async (err) => {
                if (!err) {
                    console.log("subscribed to ", this.mqttTopic)
                    // this.mqttClient.publish('mqtttopic', 'Hello mqtt')                    
                }
              })
            // mqttClient.end();
        })
        
        this.mqttClient.on("error", (error) => {
            console.log("Can't connect :: " + error)
            // mqttClient.end();
        })
        
        this.mqttClient.on('message', (topic, message) => {
        
            console.log("Recieved msg: " + message.toString() + "from MQTT on topic " + topic)
            this.sendMsgToKafka(message.toString())
            // mqttClient.end()
        })

    }

    sendMsgToKafka(msg){

        try{
            const result = this.kafkaProducer.send({
                "topic": "devices",
                "messages": [
                    {
                        "value": msg,
                        // "partition": partition
                    }
                ]
            })

            console.log(`Send Successfully! ${JSON.stringify(result)}`)
            // await producer.disconnect();
        }
        catch(err){
            console.error(`ERROR:  ${err}`)
        }
    }
}


module.exports = MqttKafkaConnect