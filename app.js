//Sample NodeJS app to illustrate design pattern

'use strict';

//Load configuration fron .env file
require('dotenv').config()

//kafka init starts

const { Kafka } = require('kafkajs')
const kafka = new Kafka({
	clientId: process.env.consumerid, //this is used by Kafka to identify the currently ACTIVE consumers of a particular consumer group
	brokers: [ process.env.bootstrapservers ],	
	ssl: true,
	sasl: {
		mechanism: process.env.saslmechanisms,
		username:  process.env.saslusername,
		password:  process.env.saslpassword
	},
})

//kafka init ends


//consumer starts

const consumer = kafka.consumer({ groupId: process.env.groupid }) //If the Consumer Group does not already exist, one will be automatically created.
consumer.connect()
consumer.subscribe({
	topic: process.env.topic, fromBeginning: true
})

consumer.run({
	eachMessage: async ({ topic, partition, message }) => {
		console.log({
			value: message.value.toString(),
		})
	},
})

//consumer end


/*kafka producer starts

const producer = kafka.producer()
producer.send({
	topic: 'req_to_create_vpc',
	messages: [
		{ key: 'vpc-name', value: 'hello world' },
		{ key: 'vpc-cidr', value: '10.0.0.0/16' },
		{ key: 'vpc-name', value: 'hello world' },
		{ key: 'environment', value: 'DEV' },
		{ key: 'owner', value: 'javier' },
	],
})

/kafka producer ends*/


var express = require('express');
var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('home', {
	});
});

app.post('/', function (req, res) {
	let eventType = req.body.eventtype;
	let eventData = req.body.eventdata;
	//Note: In real life the EndPoint is retrieved from a Service Registry
	//      not from with a switch/new like below :) 
	switch (eventType) {
		case 'CommodityNodejsPipelineAsCode':
			const nodejsPipeline = new CommodityNodejsPipelineAsCode();
			nodejsPipeline.run(eventData);
			break;

		case 'CommodityAKSPipelineAsCode':
			const aksIaCPipeline = new CommodityAKSPipelineAsCode();
			aksIaCPipeline.run(eventData);
			break;

		case 'SendEvent':
			let eventSource = req.body.eventsource;
			let eventRepository = new EventRepository();
			let destTopics = eventRepository.getTopics(eventSource);

			destTopics.forEach(function (destTopic) {
				eventRepository.sendEvent(destTopic, eventData);
			});
			break;
	}

	console.log(request.body);
});

app.listen(8080);
module.exports.getApp = app;