head = '''
<head>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.15/proj4.js"></script>
    <script src="https://code.highcharts.com/maps/highmaps.js"></script>
    <script src="https://code.highcharts.com/maps/modules/map.js"></script>
    <script src="https://code.highcharts.com/maps/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/maps/modules/offline-exporting.js"></script>
    <script src="https://code.highcharts.com/mapdata/countries/us/us-all.js"></script>
    <script src="https://code.highcharts.com/mapdata/countries/us/custom/us-all-territories.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
    <script src="./web3.js"></script>
    <script src="./ecscripts/abi-decoder.js"></script>
</head>
'''


header = '''
<div class="webHeader">
    <div style="margin: 20px">
        <div class="ecHeader"><b>ElectChain</b></div>
        <div class="ecSubtitle">Preserving the Information of Democracy</div>
    </div>
    <div style="display: flex; align-items: center;">
        <div class="ecMenu ecMenuHover" id="connectButton" style="display: flex; align-items: center;">
            <div id="connectStatus">Connect </div>
            <div><img src="eth.png" width=30 height=30></img></div>
        </div>
        <div class="ecMenu ecMenuHover">Maps</div>
        <div class="ecMenu ecMenuHover">DAO</div>
        <div class="ecMenu ecMenuHover">Data</div>
        <div class="ecMenu ecMenuHover">About</div>
    </div>
</div>
'''

projects = '''
<body>
    <div style="display: flex; margin-top: 20px;">
        <div class="projectList" style="max-height: 500px;">
            {project_list}
        </div>
        <div id="mapcontainer" style="position: relative;"></div>
    </div>
</body>
'''

footer = '''
<div class="ecFooter">
    Connected to the Ethereum Blockchain through Infura.<br>
</div>
<div class="console">
</div>

<script src="./ecscripts/utils.js"></script>
<script src="./mit.js"></script>
<script src="./ap.js"></script>
<script src="./general.js"></script>
'''
