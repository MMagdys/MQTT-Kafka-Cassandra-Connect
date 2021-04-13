const cassandra = require('cassandra-driver');
const {Kafka} = require("kafkajs")

const cassandraUtils = require('./CassandraTables')

class KafkaCassandraConnect {

    constructor(kafkaIp, kafkaClientId, kafkaTopic, cassandraIp, cassandraDC, cassandraKS){

        this.kafkaTopic = kafkaTopic
        this.kafka = new Kafka({
            "clientId": kafkaClientId,
            "brokers" :[kafkaIp]
       })
       this.kafkaConsumer = this.kafka.consumer({"groupId": "test2"})

        this.cassandraClient = new cassandra.Client({
        contactPoints: [cassandraIp],
        localDataCenter: cassandraDC,
        keyspace: cassandraKS
      });
    }

    async run(){

        this.cassandraConnect()
        await this.kafkaConsumer.connect()
        console.log("Kafka Consumer Connected!")
        await this.kafkaConsumer.subscribe({
            "topic": this.kafkaTopic,
            "fromBeginning": true
        })
        await this.kafkaConsumer.run({
            "eachMessage": async result => {
            	let values = JSON.parse(String(result.message.value))
                console.log(`Recived from Kafka ${result.message.value}`)
				cassandraUtils.InsertToDevices(this.cassandraClient, values.traffic1, values.num1, values.traffic2, values.num2)
            }
        })
    }

    async cassandraConnect(){
        const result = await this.cassandraClient.connect();
        console.log(`Connected to ${this.cassandraClient.hosts.length} nodes in the cluster: ${this.cassandraClient.hosts.keys().join(', ')}`);    
    }

}

module.exports = KafkaCassandraConnect






// async function run(){
//     try
//     {
//          const kafka = new Kafka({
//               "clientId": "myapp",
//               "brokers" :["192.168.1.147:9092"]
//          })

//         const consumer = kafka.consumer({"groupId": "test"})
//         console.log("Connecting to Kafka")
//         await consumer.connect()
//         console.log("Kafka Connected!")
        
//         await consumer.subscribe({
//             "topic": "devices",
//             "fromBeginning": true
//         })
        
//         await consumer.run({
//             "eachMessage": async result => {
//             	let values = JSON.parse(String(result.message.value))
//             	console.log(values)
//                 console.log(`Recived from Kafka ${values} on partition ${result.partition}`)
// 				InsertToDevices(values.traffic1, values.num1, values.traffic2, values.num2)
//             }
//         })
 

//     }
//     catch(ex)
//     {
//         console.error(`Something bad happened ${ex}`)
//     }

// }






// async function cassandraConnect(){

// const result = await client.connect();
// console.log(`Connected to ${client.hosts.length} nodes in the cluster: ${client.hosts.keys().join(', ')}`);

// }

// async function makeQuery(){

// 	const query = "select * from devices";
// 	client.execute(query)
// 	  .then(result => {
// 	  	// console.log("Result: ",result.rows)
// 	    const row = result.first();
// 	  	console.log("Query Result: ",row)

// 	    // The row is an Object with column names as property keys. 
// 	    // console.log('My name is %s and my email is %s', row['name'], row['email']);
// 	 });
// } 


// async function InsertToDevices(traffic1, num1, traffic2, num2){

// 	const query = 'INSERT INTO devices (id, traffic1, num1, traffic2, num2) VALUES (?, ?, ?, ?, ?)';
// 	let timestamp = String(Date.now())
// 	const params = [timestamp, traffic1, num1, traffic2, num2];

// 	client.execute(query,params, { prepare: true })
// 	.then((res) => {
// 		console.log("record inserted successfully")
// 	})

// }
