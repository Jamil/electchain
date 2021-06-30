$('.infobox').click(function() {
    $('.infobox').removeClass('selected');
    $(this).addClass('selected');
});

$('#ap2020box').click();

$('#connectButton').click(function() {
    connectMetamask()
});

var fundWallets = {
    '#mit2016fund': '0x29bd28d6CAc57be3703dcAc3190B208371D54D9B',
    '#mit2012fund': '0xd1A297254DC5BEE49efA313D3016f97b341Db696',
}

for (wallet in fundWallets) {
    window.web3['mainnet'].eth.getBalance(fundWallets[wallet]).then((result) => {
        const eth = window.web3['mainnet'].utils.fromWei(result, 'ether');
        const truncated = eth.substring(0, 3);
        $(wallet).html(truncated);
    });
}
