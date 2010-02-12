require('../lib/bootstrap');

var http = require("http"),
    crypto = require('dep/node-crypto').crypto,
    querystring = require("querystring"),
    twitter = http.createClient(80, "twitter.com");

var request_headers = {
  "host": "twitter.com",
  "Authorization": {
    "realm": "",
    "oauth_consumer_key": "cV3cvjwaUW6GKoz55nkc8A",
    "oauth_nonce": crypto.hex_sha1(new Date().getTime()),
    "oauth_signature": "",
    "oauth_signature_method": "HMAC-SHA1",
    "oauth_timestamp": new Date().getTime(),
    "oauth_version": "1.0",
  }
}

// Generate signature
var token_secret = null;
var consumer_secret = "0q3N1wUJKjXeM5R84YhaymsEAFpPVbUoBEOwS3ThuAo"
var signature_key = consumer_secret + "&" + token_secret

var signature_base_string = "GET&http://twitter.com/oauth/request_token&" + escape(querystring.stringify(request_headers.Authorization));
var signature = crypto.b64_hmac_sha1(signature_base_string, signature_key);
request_headers.Authorization.oauth_signature = signature


function prepareHeader(params){
  var stringified = 'OAuth '
  for(var key in params){
    var value = params[key]
    if(key != "oauth_version"){
      stringified += '' + key + '="' + value + '",'
    } else {
      stringified += '' + key + '="' + value + '"'
    }
  }
  return stringified
}

var request = twitter.request("GET", "/oauth/request_token", {
  "Authorization": prepareHeader(request_headers.Authorization)
});

debug(inspect(request));


request.finish(function (response) {
  debug(inspect("STATUS: " + response.statusCode));
  debug(inspect("HEADERS: " + JSON.stringify(response.headers)));
  response.setBodyEncoding("utf8");
  response.addListener("body", function (chunk) {
    debug(inspect("BODY: " + chunk));
  });
});