class EventRepository {

	constructor(initData) {
		this.initData = initData;
	}

	sendEvent(destTopic, eventData) {
		var producer = new Kafka.Producer();
		return producer.init().then(function () {
			return producer.send({
				topic: destTopic,
				partition: 0,
				message: {
					value: eventData
				}
			});
		})
			.then(function (result) {
				/*
				[ { topic: $destTopic, partition: 0, offset: 353 } ]
				*/
			});
	}

	getTopics(eventType) {
		var dict = {};
		var destTopics = ["RequestQueueForIaC"];
		dict["CommodityNodejsPipelineAsCode"] = destTopics;
		return dict;
	}


}