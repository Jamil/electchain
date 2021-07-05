from generate_table import generate_table

head = '''
<head>
    <title>ElectChain: Preserving Election Results on the Blockchain</title>
    <link rel="stylesheet" href="style.css">

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

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
    <div style="margin: 20px" onclick="window.location = 'index.html';">
        <div class="ecHeader"><b>ElectChain</b></div>
        <div class="ecSubtitle">Preserving the Information of Democracy</div>
    </div>
    <div style="display: flex; align-items: center;">
        <!--
        <div class="ecMenu ecMenuHover" id="connectButton" style="display: flex; align-items: center;">
            <div id="connectStatus">Connect </div>
            <div><img src="eth.png" width=30 height=30></img></div>
        </div>
        -->
        <div class="ecMenu ecMenuCurrent" onclick="window.location = 'index.html'">Maps</div>
        <div class="ecMenu ecMenuHover" onclick="window.location = 'dao.html'">DAO</div>
        <div class="ecMenu ecMenuHover" onclick="window.location = 'data.html'">Data</div>
        <div class="ecMenu ecMenuHover" onclick="window.location = 'about.html'">About</div>
    </div>
</div>
'''

projects = '''
<body>
    <div style="display: flex; margin-top: 20px;">
        <div class="projectList">
            {project_list}
        </div>
        <div id="detailcontainer">
            <div id="mapcontainer"></div>
            <div id="projectDetails">
            </div>
        </div>
    </div>
</body>
'''

footer = '''
<div class="console">
</div>
<div style="display: none;">
    <img src="android-chrome-512x512.png">
</div>

<script src="./ecscripts/utils.js"></script>
<script src="./dao.js"></script>
<script src="./mit.js"></script>
<script src="./ap.js"></script>
<script src="./general.js"></script>
'''

def generate_index():
    table = generate_table()
    projects_resolved = projects.format(project_list = table)
    return head + header + projects_resolved + footer

if __name__ == '__main__':
    print(generate_index())
