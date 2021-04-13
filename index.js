const yargs = require('yargs');

const MqttKafkaConnect = require('./mqtt-kafka-connect/MqttKafkaConnect')
const KafkaCassandraConnect = require('./kafka-cassandra-connect/KafkaCassandraConnect')

const argv = yargs
    .command('mqtt-cassandra', 'connects messages from MQTT broker to Kafka, consumes Kafka broker messages and save it in Cassandra', {
       
    })
    .usage("Usage: cmd [options]")
    .option('m', {
        alias: 'mqtt-broker',
        description: 'MQTT broker IP address',
        type: 'string',
    })
    .option('mt', {
        alias: 'mqtt-topic',
        description: 'MQTT topic',
        type: 'string',
    })
    .option('k', {
        alias: 'kafka-broker',
        description: 'Kafka broker IP address',
        type: 'string',
    })
    .option('kt', {
        alias: 'kafka-topic',
        description: 'Kafka topic',
        type: 'string',
    })
    .option('kc', {
        alias: 'kafka-client',
        description: 'Kafka client ID',
        type: 'string',
    })
    .option('c', {
        alias: 'cassandra-cluster',
        description: 'Cassandra cluster IP address',
        type: 'string',
    })
    .option('cd', {
        alias: 'cassandra-dc',
        description: 'Cassandra Data-center',
        type: 'string',
        default: 'datacenter1'
    })
    .option('ck', {
        alias: 'cassandra-ks',
        description: 'Cassandra Key-space',
        type: 'string',
        default: 'mycity'
    })
    .option('t', {
        alias: 'topic',
        description: 'global topic that will be used in MQTT & Kafka',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;


if(argv.m){
    var globalTopicFlag = false
    var mqttTopic;
    let topic
    if (argv.t) {
        globalTopicFlag = true
        mqttTopic = argv.t

    }
    else if(argv.mt){
        mqttTopic = argv.mt
    }
    else{
        console.log("Missing argument: mqtt-topic")
        process.exit(1)
    }

    if(argv.k){
        if(argv.kc){
            if(globalTopicFlag || argv.kt){
                if(argv.c){
                    let kafkaTopic = globalTopicFlag ? topic : argv.kt
                    let mqttKafkaBridge = new MqttKafkaConnect(argv.m, mqttTopic, argv.k, argv.kc, kafkaTopic);
                    mqttKafkaBridge.run()
                    
                    let kafkaCassandraBridge = new KafkaCassandraConnect(argv.k, argv.kc, argv.kt, argv.c, argv.cd, argv.ck);
                    kafkaCassandraBridge.run()
                }
                else{
                    console.log("Missing argument: cassandra-cluster")
                    process.exit(1)
                }
            }
            else{
                console.log("Missing argument: kafka-topic")
                process.exit(1)
            }
        }
        else{
            console.log("Missing argument: kafka-client")
            process.exit(1)
        }
    }
    else{
        console.log("Missing argument: kafka-broker")
        process.exit(1)
    }
}
else{
    console.log("Missing argument: mqtt-broker")
    process.exit(1)
}

// console.log(argv);
