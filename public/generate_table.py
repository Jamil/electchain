import json

row_template = '''
            <div id="{identifier}" class="infobox">
                <div class="infobox-left">
                    <div style="margin: 12px;">
                        <div style="font-size: 18px;"><b>{title}</b></div>
                        <div style="font-size: 14px;">
                            Data: <a href="{data_link}">{data_source}</a>,
                            Contract: <a href="{block_link}">{chain_source}</a>
                        </div>
                    </div>
                    <div class="infobox-right tooltip">
                        <div style="margin-right: 5px; padding-top: 1px;">{network}</div>
                        <div class="{dot_class}"></div>
                        <span class="tooltiptext">
                            {network_message}
                        </span>
                    </div>
                </div>
            </div>
'''

ropsten_tooltip_template = '''This data is on the Ropsten test network.<br>
                            Funds to graduate to mainnet: <span id="mit2016fund">4</span> ETH of 0.10 ETH<br>
                            {{fund_address}}<br>
                            <progress class="fundprogress" id="mit2016" value="32" max="100">32%</progress><br>
'''


def main():
    datasets = json.loads(open('datasets.json').read())
    for dataset in datasets:
        if dataset['chain_source']['network'] == 'ropsten':
            if dataset.get('fund_address'):
                network_tooltip = ropsten_tooltip_template.format({
                    'fund_address': dataset['fund_address']
                })
            else:
                network_tooltip = '''This data is on the Ropsten test network.<br>
                            No fund has been established for mainnet graduation.<br>'''
        else:
            network_tooltip = '''This data is on the Ethereum main network.<br>
                            It is preserved and secure.'''

        chain_link_endpoint = {
                'mainnet': 'https://etherscan.io/address',
                'ropsten': 'https://ropsten.etherscan.io/address'
        }[dataset['chain_source']['network']]

        chain_link = f'{chain_link_endpoint}/{dataset["chain_source"]["address"]}'

        network_str = {
            'mainnet': 'ETH',
            'ropsten': 'ROPSTEN'
        }[dataset['chain_source']['network']]

        dot_class = {
            'mainnet': 'greendot',
            'ropsten': 'yellowdot'
        }[dataset['chain_source']['network']]

        res = row_template.format(
            title = dataset['title'],
            data_link = dataset['data_source']['link'],
            data_source = dataset['data_source']['organization'],
            block_link = chain_link,
            chain_source = dataset['chain_source']['organization'],
            network = network_str,
            dot_class = dot_class,
            network_message = network_tooltip,
            identifier = f'{dataset["id"]}-box',
        )
        print(res)

if __name__ == '__main__':
    main()

