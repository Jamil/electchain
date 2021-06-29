$('#ap2020box').click(function() {
    apResults();
});

const abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_payment",
        type: "uint256",
      },
      {
        internalType: "bytes4",
        name: "_callbackFunctionId",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
    ],
    name: "cancelRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkRequested",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_key",
        type: "string",
      },
    ],
    name: "deleteMappingElement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_votes",
        type: "bytes32",
      },
    ],
    name: "fulfillpresidentialWinners",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
      {
        internalType: "string",
        name: "_jobId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_state",
        type: "string",
      },
    ],
    name: "requestPresidentialVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "presidentialWinners",
    outputs: [
      {
        internalType: "string",
        name: "winner",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "resultNow",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "resultBlock",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

function apResults() {
    if (web3['mainnet'] == undefined) {
        return;
    }
    const mainnetAddress = "0x0792724900B551d200D954a5Ed709d9514d73A9F";
    const mainnetContract = new web3['mainnet'].eth.Contract(abi, mainnetAddress);

    const states = {"ALABAMA": "AL", "ALASKA": "AK", "ARIZONA": "AZ", "ARKANSAS": "AR", "CALIFORNIA": "CA", "COLORADO": "CO", "CONNECTICUT": "CT", "DELAWARE": "DE", "DISTRICT OF COLUMBIA": "DC", "FLORIDA": "FL", "GEORGIA": "GA", "HAWAII": "HI", "IDAHO": "ID", "ILLINOIS": "IL", "INDIANA": "IN", "IOWA": "IA", "KANSAS": "KS", "KENTUCKY": "KY", "LOUISIANA": "LA", "MAINE": "ME", "MARYLAND": "MD", "MASSACHUSETTS": "MA", "MICHIGAN": "MI", "MINNESOTA": "MN", "MISSISSIPPI": "MS", "MISSOURI": "MO", "MONTANA": "MT", "NEBRASKA": "NE", "NEVADA": "NV", "NEW HAMPSHIRE": "NH", "NEW JERSEY": "NJ", "NEW MEXICO": "NM", "NEW YORK": "NY", "NORTH CAROLINA": "NC", "NORTH DAKOTA": "ND", "OHIO": "OH", "OKLAHOMA": "OK", "OREGON": "OR", "PENNSYLVANIA": "PA", "RHODE ISLAND": "RI", "SOUTH CAROLINA": "SC", "SOUTH DAKOTA": "SD", "TENNESSEE": "TN", "TEXAS": "TX", "UTAH": "UT", "VERMONT": "VT", "VIRGINIA": "VA", "WASHINGTON": "WA", "WEST VIRGINIA": "WV", "WISCONSIN": "WI", "WYOMING": "WY"}
    const statesList = [];
    const promises = [];
    for (state in states) {
        const code = states[state];
        const promise = mainnetContract.methods.presidentialWinners(code).call();
        promises.push(promise);
        statesList.push(state);
    }
    Promise.all(promises).then((results) => {
        renderData(results, statesList);
    }).catch((error) => {
        console.log(error);
    });
}

function renderData(results, statesList) {
    const demColor = 'rgba(74,131,240,0.80)',
        repColor = 'rgba(220,71,71,0.80)',
        libColor = 'rgba(240,190,50,0.80)',
        grnColor = 'rgba(90,200,90,0.80)';

    var calls = [];

    for (var i = 0; i < results.length; i++) {
        result = results[i];
        state = statesList[i].toProperCase();
        calls.push([
            state,
            result['winner'],
            result['resultNow'],
            (result['winner'] == 'Trump') ? -1 : 1
        ]);
    }

    console.log(calls);

    // Build the chart
    var chart = Highcharts.mapChart('mapcontainer', {
        title: {
            text: ''
        },

        chart: {
            animation: false // Disable animation, especially for zooming
        },

        colorAxis: {
            dataClasses: [{
                from: -1,
                to: 0,
                color: 'rgba(244,91,91,0.5)',
                name: 'Republican'
            }, {
                from: 0,
                to: 1,
                color: 'rgba(124,181,236,0.5)',
                name: 'Democrat'
            }]
        },

        mapNavigation: {
            enabled: true
        },
        // Limit zoom range
        yAxis: {
            minRange: 2300
        },

        tooltip: {
            useHTML: true
        },

        // Default options for the pies
        plotOptions: {
            mappie: {
                borderColor: 'rgba(255,255,255,0.4)',
                borderWidth: 1,
                tooltip: {
                    headerFormat: ''
                }
            }
        },

        series: [{
            mapData: Highcharts.maps['countries/us/us-all'],
            data: calls,
            name: 'States',
            borderColor: '#FFF',
            showInLegend: false,
            joinBy: ['name', 'id'],
            keys: ['id', 'winner', 'raceCalled', 'value'],
            tooltip: {
                headerFormat: '',
                pointFormatter: function () {
                    var hoverVotes = this.hoverVotes; // Used by pie only
                    return '<b>' + this.id + '</b><br/>' +
                        Highcharts.map([
                            ['Winner', this.winner, demColor],
                            ['Race Called', this.raceCalled , repColor],
                        ], function (line) {
                            if (line[0] == "Race Called") {
                                return line[0] + ': ' + timeConverter(line[1]) + ' UTC<br>';
                            } else {
                                return line[0] + ': ' + line[1] + '<br>';
                            }
                        }).join('') + ''
//                      '<hr/>Total: ' + Highcharts.numberFormat(this.sumVotes, 0);
                }
            }
        }, {
            name: 'Separators',
            id: 'us-all',
            type: 'mapline',
            data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
            color: '#707070',
            showInLegend: false,
            enableMouseTracking: false
        }, {
            name: 'Connectors',
            type: 'mapline',
            color: 'rgba(130, 130, 130, 0.5)',
            zIndex: 3,
            showInLegend: false,
            enableMouseTracking: false
        }]
    });

}

