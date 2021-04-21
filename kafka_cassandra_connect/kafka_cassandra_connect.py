from kafka import KafkaConsumer
from cassandra.cluster import Cluster
import json
# from cassandra_tables import insert_to_devices
from . import cassandra_tables

class KafkaCassandraConnect:

    def __init__(self, kafka_ip, kafka_client_id, kafka_topic, cassandra_ip, cassandra_dataCenter, cassandra_keySpace):
        
        self.kafka_consumer = KafkaConsumer(kafka_topic,
            bootstrap_servers=kafka_ip, group_id='group_01')
        self.cassandra_cluster = Cluster([cassandra_ip])
        self.cassandra_session = self.cassandra_cluster.connect(cassandra_keySpace)


    
    def run(self):

        for msg in self.kafka_consumer:
            print("message recieved from Kafka: " + msg.value.decode("utf-8"))
            obj = json.loads(msg.value.decode("utf-8"))
            cassandra_tables.insert_to_devices(self.cassandra_session, obj["traffic1"], obj["num1"], obj["traffic2"], obj["num2"])