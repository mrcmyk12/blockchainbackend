const PubNub = require("pubnub");

const credentials = {
	publishKey: "pub-c-6f657573-5729-4be3-ad57-11f4ef564a3c",
	subscribeKey: "sub-c-473217dc-49ec-11ec-9507-2ead4dd001bc",
	secretKey: "sec-c-YmVlZWI3MjYtNjQ3Yi00NzFiLWFmOGYtYmY1YjhmMTFhY2Jk"
};

const CHANNELS = {
	TEST: "TEST",
	BLOCKCHAIN: "BLOCKCHAIN",
	TRANSACTION: "TRANSACTION"
};

class PubSub {
	constructor({ blockchain, transactionPool, wallet }) {
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;
		this.wallet = wallet;

		this.pubnub = new PubNub(credentials);

		this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

		this.pubnub.addListener(this.listener());
	}

	subscribeToChannels() {
		this.pubnub.subscribe({
			channels: [Objects.values(CHANNELS)]
		});
	}

	listener() {
		return {
			message: (messageObject) => {
				const { channel, message } = messageObject;

				console.log(
					`Message received.  Channel: ${channel}.  Message: ${message}`
				);

				const parsedMessage = JSON.parse(message);

				switch (channel) {
					case CHANNELS.BLOCKCHAIN:
						this.blockchain.replaceChain(parsedMessage, true, () => {
							this.transactionPool.clearBlockchainTransactions({
								chain: parsedMessage
							})
						});
						break;
					case CHANNELS.TRANSACTION:
						if (
							!this.transactionPool.existingTransaction({
								inputAddress: this.wallet.publicKey
							})
						) {
							this.transactionPool.setTransaction(parsedMessage);
						}
						break;
					default:
						return;
				}
			}
		};
	}

	publish({ channel, message }) {
		this.pubnub.publish({ channel, message });
	}

	broadcastChain() {
		this.publish({
			channel: CHANNELS.BLOCKCHAIN,
			message: JSON.stringify(this.blockchain.chain)
		});
	}

	broadcastTransaction(transaction) {
		this.publish({
			channel: CHANNELS.TRANSACTION,
			message: JSON.stringify(transaction)
		});
	}
}

// const testPubSub = new PubSub();
// testPubSub.publish({ channel: CHANNELS.TEST, message: "hello pubnub" });
// console.log("nachos");

module.exports = PubSub;
