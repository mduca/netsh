
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.setip = function(req, res){
  var exec = require('child_process').exec
    , child
    , options = {
        "type"    : req.body.type.toLowerCase()
      , "ipaddr"  : req.body.ipaddress 
      , "netmask" : req.body.netmask
      , "gateway" : req.body.gateway
      , "metric"  : "1"
      , "name"    : req.body.lanName
    }
  
  if (options.type == "dhcp") {
    cmd = "netsh interface ip set address \"" + options.name + "\" dhcp"
  } else {
    cmd = "netsh interface ip set address " + 
      options.name + " " + 
      options.type + " " + 
      options.ipaddr + " " + 
      options.netmask + " " + 
      options.gateway + " " + 
      options.metric 
  }
  child = exec(cmd, function(err, stdout, stderr) {
    console.log(cmd)
    if (err != null) {
     console.log("Error: " + err + stderr)
    }
    res.redirect("/")
  })
}
