import paho.mqtt.client as mqtt
from kafka import KafkaProducer
import time


class MqttKafkaConnect:

    def __init__(self, mqtt_ip, mqtt_topic, kafka_ip, kafka_client_id, kafka_topic):

        self.mqtt_client = self._connect_mqtt(mqtt_ip)
        self.mqtt_topic = mqtt_topic
        self.kafka_topic = kafka_topic
        self.kafka_producer = KafkaProducer(bootstrap_servers=kafka_ip)


    def _connect_mqtt(self, broker_ip):
        print(broker_ip)
        client = mqtt.Client("mqttClient01")
        client.connect(broker_ip)
        print("connected to MQTT")
        return client
        

    def run(self):

        def on_message(client, userdata, message):
            print("message recieved from MQTT: " + message.payload.decode("utf-8"))
            self.kafka_producer.send(self.kafka_topic, message.payload.decode("utf-8"))
            print("message sent succefully to Kafka")

        self.mqtt_client.subscribe(self.mqtt_topic)
        self.mqtt_client.on_message = on_message
        self.mqtt_client.loop_forever()
        
