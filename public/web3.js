window.web3 = {
    'ropsten': new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/2fac55bdfd0647bc916b0d5400adc915')),
    'mainnet': new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/2fac55bdfd0647bc916b0d5400adc915')),
}

if (typeof(ethereum) == undefined) {
    $('#connectButton').hide();
}

function connectMetamask() {
    ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
        const web3 = new Web3(Web3.givenProvider);
        web3.eth.getAccounts(function(err, accounts) {
            if (err != null) {
                console.error("An error occurred: " + err);
            } else if (accounts.length == 0) { 
                console.log("User is not logged in to MetaMask");
            } else {
                console.log("User is logged in to MetaMask");
                window.web3['metamask'] = web3;
                $('#connectStatus').html('Connected ');
                $('#connectStatus').css('color', '#16a085');
                $('#connectButton').removeClass('ecMenuHover');
                $('.ecFooter').html('Connected to the Ethereum Blockchain through Infura and an in-browser Ethereum wallet.<br>');
            }
        });
    });
}

function register(address) {
    ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
        const web3 = new Web3(Web3.givenProvider);
        web3.eth.getAccounts(function(err, accounts) {
            if (accounts.length > 0) {
                var user_address = accounts[0];
                web3.eth.sendTransaction({
                    to: address,
                    from: user_address,
                    value: web3.utils.toWei('0.005', 'ether'),
                }, function (err, transactionHash) {
                    alert('Thank you! The contract call was successful');
                })
            } else {
                alert('You need to log in MetaMask to use this feature.')
            }
        });
    });
}

function donate(address) {
    ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
        const web3 = new Web3(Web3.givenProvider);
        web3.eth.getAccounts(function(err, accounts) {
            if (accounts.length > 0) {
                var user_address = accounts[0];
                web3.eth.sendTransaction({
                    to: address,
                    from: user_address,
                    value: web3.utils.toWei('0.005', 'ether'),
                }, function (err, transactionHash) {
                    if (err != null) {
                        alert('Looks like something went wrong: ' + err.message);
                    } else {
                        alert('Thank you! This goes a long way to helping preserve our information. You can check the new fund balance by reloading this page.');
                    }
                })
            } else {
                alert('You need to log in MetaMask to use this feature.')
            }
        });
    });
}
