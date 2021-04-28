# MQTT Kafka Cassandra Connect

## Usage
```
python main.py [options]
```


**MQTT to Kafka Module example**

```
python main.py -m localhost -mt mqtttopic -k 192.168.1.147:9092 -kc myapp -kt devices 
```


**Kafka to Cassandra Module example**

```
python main.py -k 192.168.1.147:9092 -kc myapp -kt devices -c 172.18.0.5 -ck mykeyspace
```



## License
[MIT](https://choosealicense.com/licenses/mit/) 
