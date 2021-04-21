import paho.mqtt.client as mqtt
import time


def on_message(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)

broker_address="localhost" 
client = mqtt.Client("ms") #create new instance
client.connect(broker_address) #connect to broker
# client.loop_start() #start the loop
# client.subscribe("mqtttopic")
# client.on_message=on_message
client.publish("mqtttopic",'{"traffic1":"OFF", "num1":5, "traffic2":"ON", "num2":9}')#publish
# time.sleep(10) # wait
# client.loop_stop() #stop the loop