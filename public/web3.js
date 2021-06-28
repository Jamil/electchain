window.web3ropsten = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/2fac55bdfd0647bc916b0d5400adc915'));
window.web3mainnet = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/2fac55bdfd0647bc916b0d5400adc915'));

$('#connectMetaMask').click(function() {
    ethereum.request({ method: 'eth_requestAccounts' });
    window.web3 = new Web3(Web3.givenProvider);
    window.web3.eth.getAccounts(function(err, accounts){
        if (err != null) {
            console.error("An error occurred: " + err);
        } else if (accounts.length == 0) { 
            console.log("User is not logged in to MetaMask");
        } else {
            console.log("User is logged in to MetaMask");
        }
    });
});
