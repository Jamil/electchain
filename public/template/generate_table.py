import json

row_template = '''
            <div id="{identifier}" class="infobox" onclick="{click_functions}">
                <div class="infobox-left">
                    <div style="margin: 12px;">
                        <div style="font-size: 18px;"><b>{title}</b></div>
                        <div style="font-size: 14px;">
                            Data: <a href="{data_link}" class="dataLink" target="_blank">{data_source}</a>,
                            Contract: 
                            <span data-tooltip-text="{chain_address}">
                                <a href="{block_link}" class="dataLink" target="_blank">{chain_source}</a>
                            </span>
                        </div>
                    </div>
                    <div class="infobox-right">
                        <div style="margin-right: 5px; padding-top: 1px;">{network}</div>
                        <div class="{dot_class}"></div>
                    </div>
                </div>
                <span id="{identifier}-networkMessage" style="display: none;">
                    {network_message}
                </span>
            </div>
'''

ropsten_fund_tooltip_template = '''
    This data is on the Ropsten test network.<br><br>
    It is stored on a <span data-tooltip-text="{chain_address}">
    <a href="{block_link}" class="dataLink" target="_blank">smart contract</a></span> on-chain,<br>
    but is not secure or preserved until it is put on the <br>
    Ethereum main blockchain, or mainnet.<br><br>
    You can help make this happen by sending funds to <br>
    <a href="https://etherscan.io/address/{fund_address}" class="dataLink">{fund_address}</a><br>
    <a href="javascript:donate('{fund_address}')" class="dataLink">Contribute</a>
    <br><br>
    Funds raised for <i>{title}</i> preservation: <span class="fundBalance" id="{identifier}-fund-balance" data-fund-address="{fund_address}">?</span> ETH of 0.10 ETH<br>
    '''

ropsten_nofund_tooltip_template = '''
    This data is on the Ropsten test network.<br><br>
    It is stored on a <span data-tooltip-text="{chain_address}">
    <a href="{block_link}" class="dataLink" target="_blank">smart contract</a></span> on-chain,<br>
    but is not secure or preserved until it is put on the <br>
    Ethereum main blockchain, or mainnet.<br><br>
    '''

mainnet_network_tooltip = '''This data is on the Ethereum main network.<br>
                  It is preserved and secure for as long as Ethereum exists, <br>
                  stored on a <span data-tooltip-text="{chain_address}">
                  <a href="{block_link}" class="dataLink" target="_blank">smart contract</a>
                  </span> directly on the blockchain.
                  '''

def generate_table():
    datasets = json.loads(open('datasets.json').read())
    output = []
    for dataset in datasets:
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

        if dataset['chain_source']['network'] == 'ropsten':
            if dataset.get('fund_address'):
                network_tooltip = ropsten_fund_tooltip_template.format(
                    title = dataset['title'],
                    identifier = dataset['id'],
                    fund_address = dataset['fund_address'],
                    chain_address = dataset['chain_source']['address'],
                    block_link = chain_link
                )
            else:
                network_tooltip = ropsten_nofund_tooltip_template.format(
                    block_link = chain_link
                )
        else:
            network_tooltip = mainnet_network_tooltip.format(
                chain_address = dataset['chain_source']['address'],
                block_link = chain_link
            )

        res = row_template.format(
            title = dataset['title'],
            click_functions = f'{dataset["script"]}(\'{dataset["id"]}\'); displayMessage(\'{dataset["id"]}\');',
            data_link = dataset['data_source']['link'],
            chain_address = dataset['chain_source']['address'],
            data_source = dataset['data_source']['organization'],
            block_link = chain_link,
            chain_source = dataset['chain_source']['organization'],
            network = network_str,
            dot_class = dot_class,
            network_message = network_tooltip,
            identifier = f'{dataset["id"]}-box',
            fund_address = dataset.get('fund_address', 'none'),
        )
        output.append(res)
    return ''.join(output)

