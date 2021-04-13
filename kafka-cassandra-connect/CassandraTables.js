
module.exports.InsertToDevices =  async (client, traffic1, num1, traffic2, num2) => {

	const query = 'INSERT INTO devices (id, traffic1, num1, traffic2, num2) VALUES (?, ?, ?, ?, ?)';
	let timestamp = String(Date.now())
	const params = [timestamp, traffic1, num1, traffic2, num2];

	client.execute(query,params, { prepare: true })
	.then((res) => {
		console.log("record inserted successfully")
	})

}