class EventRepository {

	constructor(initData) {
		this.initData = initData;
	}

	sendEvent() {

	}

	getTopics(eventType) {
		var dict = {};
		var destTopics = ["RequestQueueForIaC"];
		dict["CommodityNodejsPipelineAsCode"] = destTopics;
		return dict;
	}


}