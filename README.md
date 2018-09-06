# Ethereum Oracle
This is an implementation of an Ethereum oracle using web3.
An oracle is simply a messenger which relays data from one source to another, in this case a number is fetched from an API and this is relayed to a smart contract on the ethereum blockchain via the "setNumber" function in the sample smart contract.

### Dependencies
1. Node.js
2. NPM
3. Web3
4. node-fetch

### Code Logic
Oracle.js consists of 2 core functions:
1. main: This function fetches data from the api, which in this example is the average gas price for mined transactions on the main ethereum network. This is then set as the input for the setNumber function in the deployed sample smart contract. This input is set as the object for the second function (sendTx).
2. sendTx: This function sets all the parameters for the transaction, signs the transaction and sends the transaction.

### Implementation
In order to deploy and test the oracle:
1. Clone the repository.
2. Set up an ethereum wallet with ropsten ether (metamask is easiest).
3. Deploy "sample.sol" [(remix is easiest)](https://remix.ethereum.org/).
4. Obtain a provider for the Ethereum network, you can run your own node via mist however for simplicity we are using [Infura](https://infura.io/) which is a public gateway to the blockchain. Sign up and you will be provided with an API key.
5. Edit oracle.js as directed by the comments in the script. You will need: your infura API key, your ethereum wallet's private key, [the smart contract's ABI ](https://ethereum.stackexchange.com/questions/27536/where-to-find-contract-abi-in-new-version-of-online-remix-solidity-compiler) (sample.sol ABI has been provided), and the address of the deployed contract.
6. Run the oracle: cd into the directory and run command "node oracle.js".

 
