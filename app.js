//Sample NodeJS app to illustrate kafka consumer/producer in nodejs

'use strict';

//Load configuration fron .env file
require('dotenv').config()

//kafka init starts

const { Kafka } = require('kafkajs')
const kafka = new Kafka({
	clientId: process.env.consumerid, //this is used by Kafka to identify the currently ACTIVE consumers of a particular consumer group
	brokers: [process.env.bootstrapservers],
	ssl: true,
	connectionTimeout: 5000,
	sasl: {
		mechanism: process.env.saslmechanisms,
		username: process.env.saslusername,
		password: process.env.saslpassword
	},
})

//kafka init ends


//consumer starts

const run = async () => {
	const consumer = kafka.consumer({ groupId: process.env.groupid }) //If the Consumer Group does not already exist, one will be automatically created.
	await consumer.connect();

	await consumer.subscribe({
		topic: process.env.topicin, fromBeginning: true
	})

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log({
				value: message.value.toString(),
			})
		},
	})
}

run().catch(e => console.log(`[example/consumer] ${e.message}`, { stack: e.stack }))

//consumer end

//app dynamics starts

require("appdynamics").profile({
	controllerHostName: '.saas.appdynamics.com',
	controllerPort: 443,

	// If SSL, be sure to enable the next line
	controllerSslEnabled: true,
	accountName: '',
	accountAccessKey: '',
    applicationName: 'observability-app-demo',
    tierName: 'api-server',
	nodeName: 'process' // The controller will automatically append the node name with a unique number
});

//app dynamicss ends



/*/kafka producer starts
const producer = kafka.producer()
producer.send({
	topic: process.env.topicin,
	partition: 0,
	messages: [
		{ key: 'test_key', value: 'test_value' },

	],
})
//kafka producer ends*/


/*entry point of the app starts*/

var express = require('express');
var app = express();
app.set('view engine', 'jade');


app.get('/', function (req, res) {
	res.render('home', {
	});
});

app.post('/', function (req, res) {
	let eventType = req.body.eventtype;
	let eventData = req.body.eventdata;

	console.log(request.body);
});

app.listen(8080);
module.exports.getApp = app;

/*entry point of the app ends*/