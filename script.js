const ethEnabled = async () => {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        setup();
        return true;
    }
    return false;
}

// This is the ABI for your contract (get it from Remix, in the 'Compile' tab)
// ============================================================
var abi = [
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "year",
				"type": "uint16"
			},
			{
				"internalType": "string",
				"name": "state",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "parties",
				"type": "string[]"
			},
			{
				"internalType": "uint32[]",
				"name": "votes",
				"type": "uint32[]"
			}
		],
		"name": "sendResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "year",
				"type": "uint16"
			},
			{
				"internalType": "string",
				"name": "state",
				"type": "string"
			}
		],
		"name": "getResult",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string[]",
						"name": "parties",
						"type": "string[]"
					},
					{
						"internalType": "uint32[]",
						"name": "votes",
						"type": "uint32[]"
					}
				],
				"internalType": "struct PresidentialElections.StateResult",
				"name": "result",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// ============================================================
abiDecoder.addABI(abi);
// call abiDecoder.decodeMethod to use this - see 'getAllFunctionCalls' for more

var contractAddress = '0x225B2F6b931092Fda8742087e02d2cC71D24dc74'; // FIXME: fill this in with your contract's address/hash

async function createElections() {
    let data = await readData();
    var elections = {};
    for (line of data) {
        if (line['party_detailed']) {
            const year = line['year'];
            const state = line['state'];
            elections[year] ??= {}
            elections[year][state] ??= {
                parties: [],
                votes: [],
            }
            elections[year][state]['parties'].push(line['party_detailed'])
            elections[year][state]['votes'].push(line['candidatevotes'])
        }
    }
    return elections;
}

async function createElections() {
    let data = await readData();
    var elections = {};
    for (line of data) {
        if (line['party_detailed']) {
            const year = line['year'];
            const state = line['state'];
            elections[year] ??= {}
            elections[year][state] ??= {
                parties: [],
                votes: [],
            }
            elections[year][state]['parties'].push(line['party_detailed'])
            elections[year][state]['votes'].push(line['candidatevotes'])
        }
    }
    return elections;
}

async function readData() {
    const csv = fs.readFileSync('data.csv', 'utf8');
    const records = parse(csv, {
        columns: true,
        skip_empty_lines: true
    });
    return records;
}

async function publishData(year, state, results) {
    console.log('Publishing ' + year + ' ' + state);
    let transaction = PresidentialElections.methods.sendResult(
        year,
        state,
        results['parties'],
        results['votes']
    );
    let options = {
        'from': web3.eth.defaultAccount
    };
    let txHash = await transaction.send(options);
    return txHash
}

// =============================================================================
//                                      UI
// =============================================================================

function setup() {
    window.PresidentialElections = new web3.eth.Contract(abi, contractAddress);

    // This sets the default account on load and displays the total owed to that
    // account.
    window.web3.eth.getAccounts().then((response)=> {
        window.web3.eth.defaultAccount = response[0];
    });

    // This code updates the 'My Account' UI with the results of your functions
    $("#myaccount").change(function() {
        window.web3.eth.defaultAccount = $(this).val();
    });

    // Allows switching between accounts in 'My Account' and the 'fast-copy' in 'Address of person you owe
    window.web3.eth.getAccounts().then((response)=>{
        var opts = response.map(function (a) { return '<option value="'+
                a.toLowerCase()+'">'+a.toLowerCase()+'</option>' });
        $(".account").html(opts);
        $(".wallet_addresses").html(response.map(function (a) { return '<li>'+a.toLowerCase()+'</li>' }));
    });
}

// This runs the 'add_IOU' function when you click the button
// It passes the values from the two inputs above
$("#mitelections19762020").click(function() {
    createElections().then((elections) => {
    //  console.log(util.inspect(elections, false, null, true))
        for (year in elections) {
            for (state in elections[year]) {
                publishData(year, state, elections[year][state]).then((txHash) => {
                    console.log('Published with hash ' + txHash);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    });
});

async function readData() {
    const csv = fs.readFileSync('data.csv', 'utf8');
    const records = parse(csv, {
        columns: true,
        skip_empty_lines: true
    });
    return records;
}

async function publishData(year, state, results) {
    console.log('Publishing ' + year + ' ' + state);
    let transaction = PresidentialElections.methods.sendResult(
        year,
        state,
        results['parties'],
        results['votes']
    );
    let options = {
        'from': web3.eth.defaultAccount
    };
    let txHash = await transaction.send(options);
    return txHash
}
