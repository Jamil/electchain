var abi = 
    [
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
				"internalType": "string[]",
				"name": "states",
				"type": "string[]"
			},
			{
				"internalType": "string[][]",
				"name": "parties",
				"type": "string[][]"
			},
			{
				"internalType": "uint32[][]",
				"name": "votes",
				"type": "uint32[][]"
			}
		],
		"name": "sendResults",
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

var contractAddress = '0x9C5A41719c9C496Afbf14D6FD00764c656a2DA82'; 

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
    const csv = await $.ajax({
        type: "GET",
        url: "data/mitpres19762020.csv",
        dataType: "text",
    });
    const records = $.csv.toObjects(csv);
    return records;
}

async function publishYearData(year, states, parties, votes) {
    console.log('Publishing data from: ' + year)
    console.log(states)
    console.log(parties)
    console.log(votes)
    let transaction = window.PresidentialElections.methods.sendResults(
        year,
        states,
        parties,
        votes
    );
    let options = {
        'from': web3.eth.defaultAccount
    };
    let txHash = await transaction.send(options);
    return txHash;
}

async function publishData(year, state, results) {
    console.log('Publishing ' + year + ' ' + state);
    console.log('Contract:')
    console.log(window.PresidentialElections)
    let transaction = window.PresidentialElections.methods.sendResult(
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
    console.log('Setup called');
    // This sets the default account on load and displays the total owed to that
    // account.

    window.web3 = new Web3(Web3.givenProvider);
    window.PresidentialElections = new web3.eth.Contract(abi, contractAddress);

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

$("#uploadmit19762020").click(function() {
    createElections().then((elections) => {
        //  console.log(util.inspect(elections, false, null, true))
        for (year in elections) {
            var states = []
            var parties = []
            var votes = []
            for (state in elections[year]) {
                states.push(state)
                parties.push(elections[year][state]['parties'])
                votes.push(elections[year][state]['votes'])
                //              publishData(year, state, elections[year][state]).then((txHash) => {
                //                  console.log('Published with hash ' + txHash);
                //              }).catch((error) => {
                //                  console.log(error);
                //              });
            }
            if (year == 2016) {
                publishYearData(year, states, parties, votes);
            }
        }
    });
});

$('#connect').click(function() {
    ethereum.request({ method: 'eth_requestAccounts' });
    setup()
});
