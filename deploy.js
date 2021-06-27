const Web3 = require('web3')
const fs = require('fs')
const parse = require('csv-parse/lib/sync')
const util = require('util')

let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/2fac55bdfd0647bc916b0d5400adc915'));
var abi = JSON.parse(fs.readFileSync('abi.json'));

var contractAddress = '0x225B2F6b931092Fda8742087e02d2cC71D24dc74';
var PresidentialElections = new web3.eth.Contract(abi, contractAddress);

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

