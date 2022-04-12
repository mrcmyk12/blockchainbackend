# Blockchain Project Backend

## blockchain/block.js

* Building block of the entire blockchain.  Has intial structure of timestamp, last hash, data, nonce, and difficulty field.
* The difficulty and nonce were created for the proof of work system to account for how quickly new blocks could be created
* Introduced the concept of the genesis block in order to get the blockchain going

## blockchain/index.js

* Collects blocks together in a chain array
* Lasthash field must be set to the hash of the previous block
* Chain validation checks lasthash and block difficulty

## index.js

* Allows the blockchain to be interactable
* Serves as the backend API for the project

## app/pubsub.js

* Makes sure the transactions and blocks are broadcasted
* Follows a publisher/suscriber paradigm for passing messages between servers
* Has a lot less overhead as opposed to keeping track of the addresses of every single block
* Has channels where subscribers can listen for messages and publishers can broadcast their messages

## wallet/index.js

* Digital wallet is way to allow users to interact with each other in the cryptocurrency
* Holds the key pair, which contains the private and public key

