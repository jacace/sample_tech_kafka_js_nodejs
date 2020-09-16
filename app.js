//Sample NodeJS app to illustrate design pattern

'use strict';

//kafka init starts
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: [ process.env.main_broker ],	
	ssl: true,
	sasl: {
		mechanism: process.env.sasl,
		username:  process.env.kafkaapikey,
		password:  process.env.kafkaapisecret
	},
})

const consumer = kafka.consumer({ groupId: process.env.groupid })
consumer.connect()
consumer.subscribe({
	topic: process.env.topic, fromBeginning: true
})

//kafka init ends


//kafka business logic starts

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

consumer.run({
	eachMessage: async ({ topic, partition, message }) => {
		console.log({
			value: message.value.toString(),
		})
	},
})

//kafka business logic ends


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