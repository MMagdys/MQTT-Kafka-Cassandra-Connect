# MQTT_Cassandra

## Getting Started

### Install
```
cd MQTT_Cassandra
npm install
```

### Run
```
node index.js [options]
```
***Example***
```
node index.js -m localhost --mt mqtttopic -k 192.168.1.147:9092 --kc myapp --kt devices -c 172.17.0.5
```

## CLI options
 --version             Show version number                        [boolean]
 
  -m, --mqtt-broker         MQTT broker IP address                      [string]
  
  --mt, --mqtt-topic    MQTT topic                                  [string]
      
  -k, --kafka-broker        Kafka broker IP address                     [string]
  
  --kt, --kafka-topic   Kafka topic                                 [string]
  
  --kc, --kafka-client  Kafka client ID                             [string]
  
  -c, --cassandra-cluster   Cassandra cluster IP address                [string]
  
  --cd, --cassandra-dc  Cassandra Data-center     [string] [default: "datacenter1"]
  
  --ck, --cassandra-ks  Cassandra Key-space     [string] [default: "mycity"]
  
  -t, --topic               global topic that will be used in MQTT & Kafka
                                                                        [string]
  -h, --help                Show help                                  [boolean]
