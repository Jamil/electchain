var daoABI = [
	{
		"inputs": [],
		"name": "registerInterest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

function registerInterest() {
    ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
        const web3 = new Web3(Web3.givenProvider);
        web3.eth.getAccounts(function(err, accounts) {
            var userAddress = accounts[0];
            console.log(userAddress);
            const mainnetAddress = "0x4eff6001362bdf6528905ce7596F36AB639D462d";
            const mainnetContract = new web3.eth.Contract(daoABI, mainnetAddress);
            const promise = mainnetContract.methods.registerInterest().send(
                { from: userAddress },
                function(result) {
                    console.log(result);
                }
            );
        });
    });
}
