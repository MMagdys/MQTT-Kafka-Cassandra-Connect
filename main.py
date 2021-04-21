import argparse
import _thread

from mqtt_kafka_connect.mqtt_kafka_connect import MqttKafkaConnect
from kafka_cassandra_connect.kafka_cassandra_connect import KafkaCassandraConnect


def main():

    parser = argparse.ArgumentParser(description='CLI tool for IoT infrastructure data handling', 
        usage="main.py [options]")
    parser.add_argument("-m" , "--mqtt-broker", type=str, help="MQTT broker IP address")
    parser.add_argument("-mt", "--mqtt-topic", type=str, help="MQTT broker IP address")
    parser.add_argument("-k" , "--kafka-broker", type=str, help="Kafka broker IP address")
    parser.add_argument("-kc", "--kafka-client", type=str, help="Kafka client ID")
    parser.add_argument("-kt", "--kafka-topic", type=str, help="Kafka topic")
    parser.add_argument("-c" , "--cassandra-cluster", type=str, help="Cassandra cluster IP address")
    parser.add_argument("-cd", "--cassandra-datacenter", type=str, help="Cassandra Data-center")
    parser.add_argument("-ck", "--cassandra-keyspace", type=str, help="Cassandra Key-space")

    args = parser.parse_args()

    if(args.mqtt_broker and args.mqtt_topic and args.kafka_broker and args.kafka_topic and args.kafka_client):
        
        print("MQTT-Kafka")
        mqtt_kafka_bridge = MqttKafkaConnect(args.mqtt_broker, args.mqtt_topic, args.kafka_broker, args.kafka_client, args.kafka_topic)
        mqtt_kafka_bridge.run()
    
    elif(args.kafka_broker and args.kafka_topic and args.kafka_client and args.cassandra_cluster and args.cassandra_keyspace):
        
        print("Kafka-Cassandra")
        if(args.cassandra_datacenter == None):
            args.cassandra_datacenter = "datacenter1"

        kafka_cassandra_bridge = KafkaCassandraConnect(args.kafka_broker, args.kafka_client, args.kafka_topic, args.cassandra_cluster, args.cassandra_datacenter , args.cassandra_keyspace)
        kafka_cassandra_bridge.run()

    
    
    # try:
    #     _thread.start_new_thread( mqtt_kafka_bridge.run)

    # except:
    #     print ("Error: unable to start thread")



if __name__ == "__main__":
    main()