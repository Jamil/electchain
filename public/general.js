$('.infobox').click(function() {
    $('.infobox').removeClass('selected');
    $(this).addClass('selected');
});

Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: ['SF Mono', 'Courier New', 'monospace']
        }
    }
});

function displayMessage(id) {
    $('#projectDetails').html($('#' + id + '-box-networkMessage').html());
    
    const balanceElement = $('#' + id + '-fund-balance');

    if (balanceElement.length > 0) {
        const fundAddress = balanceElement.data().fundAddress;
        window.web3['mainnet'].eth.getBalance(fundAddress).then((result) => {
            const eth = window.web3['mainnet'].utils.fromWei(result, 'ether');
            const truncated = eth.substring(0, 4);
            $('.fundBalance').html(truncated).show();
        });
    }
}

$('#ap2020-box').click();

$('#connectButton').click(function() {
    connectMetamask()
});

