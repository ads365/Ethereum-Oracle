const Web3 = require("web3");
const rpcUrl = //link to ropesten network; https://mainnet.infura.io/INSERTYOURKEY
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
const privateKey = //0x+Private key;
const account = web3.eth.accounts.privateKeyToAccount(privateKey)
const fetch = require('node-fetch');
const signedTxs = [];
let nonce;

//contract abi - the below is for the sample contract.
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_number",
				"type": "uint256"
			}
		],
		"name": "setNumber",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumber",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "number",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress = //Address of deployed contract;
const sampleContract = new web3.eth.Contract(abi, contractAddress);


//sample sets number from the api below - gas price on mainnet.
async function main() {

  let gasReq = await fetch('https://ethgasstation.info/json/ethgasAPI.json');
  let gasInfo = await gasReq.json();
  let gasAvg = await (gasInfo.average);

  //makes the input an object for the sendTx function and triggers that
  //Input is gasPrice from above
  await sendTx(sampleContract.methods.setNumber(gasAvg));
}

//function sending the transaction from our configured wallet (the private key we provided)
async function sendTx(txObject) {
  const txTo = contractAddress;
  const txData = txObject.encodeABI(); //txObject was set in main funtion
  const txFrom = account.address;
  const txKey = account.privateKey;
  const gasPrice = (5*(10**9)); //5 gwei gas price
  const gasLimit = await txObject.estimateGas(); //estimated gas cost of trnsaction

  const tx = {
    from : txFrom,
    to : txTo,
    nonce : nonce,
    data : txData,
    gas : gasLimit, gasPrice
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, txKey);
  nonce++;
  // push transaction - dont wait for confirmations just wait till broadcasted
  signedTxs.push(signedTx.rawTransaction)
  web3.eth.sendSignedTransaction(signedTx.rawTransaction, {from:account});
}

main();
