function timeConverter(UNIX_timestamp){
  if (UNIX_timestamp === null) return "unknown";
  var a = new Date(UNIX_timestamp * 1000);
  return a.toLocaleString("en-US");
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
