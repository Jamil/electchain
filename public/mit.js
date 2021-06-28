$('#mit2016box').click(function() {
    mitResults(2016);
});
$('#mit2012box').click(function() {
    mitResults(2012);
});
$('#mit2008box').click(function() {
    mitResults(2008);
});
$('#mit2004box').click(function() {
    mitResults(2004);
});
$('#mit2000box').click(function() {
    mitResults(2000);
});
$('#mit1996box').click(function() {
    mitResults(1996);
});
$('#mit1992box').click(function() {
    mitResults(1992);
});
$('#mit1988box').click(function() {
    mitResults(1988);
});
$('#mit1984box').click(function() {
    mitResults(1984);
});
$('#mit1980box').click(function() {
    mitResults(1980);
});
$('#mit1976box').click(function() {
    mitResults(1976);
});

function mitResults(year) {
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

    abiDecoder.addABI(abi);
    const contractAddress = '0x9C5A41719c9C496Afbf14D6FD00764c656a2DA82'; 
    const PresidentialElections = new window.web3ropsten.eth.Contract(abi, contractAddress);

    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    const states = {"ALABAMA": "AL", "ALASKA": "AK", "ARIZONA": "AZ", "ARKANSAS": "AR", "CALIFORNIA": "CA", "COLORADO": "CO", "CONNECTICUT": "CT", "DELAWARE": "DE", "DISTRICT OF COLUMBIA": "DC", "FLORIDA": "FL", "GEORGIA": "GA", "HAWAII": "HI", "IDAHO": "ID", "ILLINOIS": "IL", "INDIANA": "IN", "IOWA": "IA", "KANSAS": "KS", "KENTUCKY": "KY", "LOUISIANA": "LA", "MAINE": "ME", "MARYLAND": "MD", "MASSACHUSETTS": "MA", "MICHIGAN": "MI", "MINNESOTA": "MN", "MISSISSIPPI": "MS", "MISSOURI": "MO", "MONTANA": "MT", "NEBRASKA": "NE", "NEVADA": "NV", "NEW HAMPSHIRE": "NH", "NEW JERSEY": "NJ", "NEW MEXICO": "NM", "NEW YORK": "NY", "NORTH CAROLINA": "NC", "NORTH DAKOTA": "ND", "OHIO": "OH", "OKLAHOMA": "OK", "OREGON": "OR", "PENNSYLVANIA": "PA", "RHODE ISLAND": "RI", "SOUTH CAROLINA": "SC", "SOUTH DAKOTA": "SD", "TENNESSEE": "TN", "TEXAS": "TX", "UTAH": "UT", "VERMONT": "VT", "VIRGINIA": "VA", "WASHINGTON": "WA", "WEST VIRGINIA": "WV", "WISCONSIN": "WI", "WYOMING": "WY"}

    const statesList = [];
    const promises = [];
    if (year) {
        for (state in states) {
            statesList.push({
                'state': state,
                'code': states[state]
            })
            const promise = PresidentialElections.methods.getResult(year, state).call();
            promises.push(promise);
        }
    } else {
        renderDataNew([]);
    }

    console.log(statesList);

    Promise.all(promises).then((results) => {
        console.log(results);
        renderDataNew(results);
    });

    function renderDataNew(results) {
        const demColor = 'rgba(74,131,240,0.80)',
            repColor = 'rgba(220,71,71,0.80)',
            libColor = 'rgba(240,190,50,0.80)',
            grnColor = 'rgba(90,200,90,0.80)';

        console.log(results);
        var data = [];
        for (var i = 0; i < results.length; i++) {
            result = results[i];
            state = statesList[i]['state'].toProperCase();
            var demIndex = result['parties'].indexOf('DEMOCRAT')
            var repIndex = result['parties'].indexOf('REPUBLICAN')
            var libIndex = result['parties'].indexOf('LIBERTARIAN')
            var grnIndex = result['parties'].indexOf('GREEN')
            data.push([
                state,
                result['votes'][demIndex],
                result['votes'][repIndex],
                result['votes'][libIndex],
                result['votes'][grnIndex],
                0,
                (parseInt(result['votes'][demIndex]) > parseInt(result['votes'][repIndex])) ? 1 : -1
            ]);
        }

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
                }, {
                    from: 2,
                    to: 3,
                    name: 'Libertarian',
                    color: libColor
                }, {
                    from: 3,
                    to: 4,
                    name: 'Green',
                    color: grnColor
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
                data: data,
                name: 'States',
                borderColor: '#FFF',
                showInLegend: false,
                joinBy: ['name', 'id'],
                keys: ['id', 'demVotes', 'repVotes', 'libVotes', 'grnVotes',
                    'sumVotes', 'value', 'pieOffset'],
                tooltip: {
                    headerFormat: '',
                    pointFormatter: function () {
                        var hoverVotes = this.hoverVotes; // Used by pie only
                        return '<b>' + this.id + '</b><br/>' +
                            Highcharts.map([
                                ['Democrats', this.demVotes, demColor],
                                ['Republicans', this.repVotes, repColor],
                                ['Libertarians', this.libVotes, libColor],
                                ['Green', this.grnVotes, grnColor]
                            ].sort(function (a, b) {
                                return b[1] - a[1]; // Sort tooltip by most votes
                            }), function (line) {
                                return '<span style="color:' + line[2] +
                                    // Colorized bullet
                                    '">\u25CF</span> ' +
                                    // Party and votes
                                    (line[0] === hoverVotes ? '<b>' : '') +
                                    line[0] + ': ' +
                                    Highcharts.numberFormat(line[1], 0) +
                                    (line[0] === hoverVotes ? '</b>' : '') +
                                    '<br/>';
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
                zIndex: 5,
                showInLegend: false,
                enableMouseTracking: false
            }]
        });

    }

    function renderData(gaData) {
        var data = [
            ['us-ma', 0],
            ['us-wa', 1],
            ['us-ca', 2],
            ['us-or', 3],
            ['us-wi', 4],
            ['us-me', 5],
            ['us-mi', 6],
            ['us-nv', 7],
            ['us-nm', 8],
            ['us-co', 9],
            ['us-wy', 10],
            ['us-ks', 11],
            ['us-ne', 12],
            ['us-ok', 13],
            ['us-mo', 14],
            ['us-il', 15],
            ['us-in', 16],
            ['us-vt', 17],
            ['us-ar', 18],
            ['us-tx', 19],
            ['us-ri', 20],
            ['us-al', 21],
            ['us-ms', 22],
            ['us-nc', 23],
            ['us-va', 24],
            ['us-ia', 25],
            ['us-md', 26],
            ['us-de', 27],
            ['us-pa', 28],
            ['us-nj', 29],
            ['us-ny', 30],
            ['us-id', 31],
            ['us-sd', 32],
            ['us-ct', 33],
            ['us-nh', 34],
            ['us-ky', 35],
            ['us-oh', 36],
            ['us-tn', 37],
            ['us-wv', 38],
            ['us-dc', 39],
            ['us-la', 40],
            ['us-fl', 41],
            //  ['us-ga', 42],
            ['us-sc', 43],
            ['us-mn', 44],
            ['us-mt', 45],
            ['us-nd', 46],
            ['us-az', 47],
            ['us-ut', 48],
            ['us-hi', 49],
            ['us-ak', 50],
            ['gu-3605', 51],
            ['mp-ti', 52],
            ['mp-sa', 53],
            ['mp-ro', 54],
            ['as-6515', 55],
            ['as-6514', 56],
            ['pr-3614', 57],
            ['vi-3617', 58],
            ['vi-6398', 59],
            ['vi-6399', 60]
        ];
        data.push(['us-ga', gaData['votes'][0]]);

        // Create the chart
        Highcharts.mapChart('mapcontainer', {
            chart: {
                map: 'countries/us/custom/us-all-territories'
            },

            title: {
                text: '2016 Presidential Election Results'
            },

            subtitle: {
                text: 'Fetched from Ropsten Testnet Blockchain'
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                min: 0
            },

            series: [{
                data: data,
                name: 'Random data',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }, {
                name: 'Separators',
                type: 'mapline',
                data: Highcharts.geojson(Highcharts.maps['countries/us/custom/us-all-territories'], 'mapline'),
                color: 'silver',
                nullColor: 'silver',
                showInLegend: false,
                enableMouseTracking: false
            }]
        });
    }
}
