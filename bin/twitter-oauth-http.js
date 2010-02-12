require('../lib/bootstrap');

var http = require("http"),
    crypto = require('dep/node-crypto').crypto,
    querystring = require("querystring"),
    twitter = http.createClient(61213, "localhost");
//  twitter = http.createClient(80, "twitter.com");
    
var request_headers = {
  "Authorization": {
    "realm": "",
    "oauth_consumer_key": "cV3cvjwaUW6GKoz55nkc8A",
    "oauth_nonce": crypto.hex_sha1(new Date().getTime()),
    "oauth_signature_method": "HMAC-SHA1",
    "oauth_timestamp": new Date().getTime(),
    "oauth_version": "1.0",
  }
}

// Generate signature
var token_secret = null;
var consumer_secret = "0q3N1wUJKjXeM5R84YhaymsEAFpPVbUoBEOwS3ThuAo"
var signature_key = consumer_secret + "&" + token_secret

var signature_base_string = "GET&"+encodeURIComponent("http://twitter.com/oauth/request_token")+"&"+encodeURIComponent(querystring.stringify(request_headers.Authorization));
debug("SIGNATURE_BASE: " + signature_base_string);
var signature = encodeURIComponent(crypto.b64_hmac_sha1(signature_base_string, signature_key));
request_headers.Authorization.oauth_signature = signature


function prepare_header(params){
  var stringified = 'OAuth '
  for(var key in params){
    var value = params[key]
    if(key != "oauth_signature"){
      stringified += '' + key + '="' + value + '",\n'
    } else {
      stringified += '' + key + '="' + value + '"'
    }
  }
  return stringified
}

var request = twitter.request("GET", "/oauth/request_token", {
  "Host": "twitter.com",
  "Authorization": prepare_header(request_headers.Authorization)
});

debug("REQUEST:");
puts(request.output[0])


request.finish(function (response) {
  debug(inspect("STATUS: " + response.statusCode));
  debug(inspect("HEADERS: " + JSON.stringify(response.headers)));
  response.setBodyEncoding("utf8");
  response.addListener("body", function (chunk) {
    debug(inspect("BODY: "));
    puts(chunk)
  });
});