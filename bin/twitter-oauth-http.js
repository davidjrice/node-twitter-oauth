require('../lib/bootstrap');
var http = require("http");
var crypto = require('dep/node-crypto').crypto;
var querystring = require("querystring");


debug(inspect(crypto));

// https://twitter.com/oauth/request_token
// Authorization: OAuth realm="", oauth_nonce="92673243246",
// oauth_timestamp="12642432725", oauth_consumer_key="9874239869",
// oauth_signature_method="HMAC-SHA1", oauth_version="1.0",
// oauth_signature="l%2FXBqib2y423432LCYwby3kCk%3D"
// 

var twitter = http.createClient(80, "twitter.com");

// client.request([method], path, [request_headers])
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
// "oauth_signature": "l%2FXBqib2y423432LCYwby3kCk%3D"


debug(inspect(request_headers));

// GET&https%3A%2F%2Ftwitter.com%2Foauth%2Frequest_token&oauth_consumer_key%3D1rB94WF54ayRvryLQIZ01A%26oauth_nonce%3D92676946%26
// oauth_signature_method%3DHMAC-SHA1%26
// oauth_timestamp%3D1263777725%26oauth_version%3D1.0

var token_secret = null;
var consumer_secret = "0q3N1wUJKjXeM5R84YhaymsEAFpPVbUoBEOwS3ThuAo"
var signature_key = consumer_secret + "&" + token_secret

var params_string = "oauth_consumer_key%3DcV3cvjwaUW6GKoz55nkc8A%26oauth_nonce%3D"+ request_headers.Authorization.oauth_nonce +"%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D" + request_headers.Authorization.oauth_timestamp + "%26oauth_version%3D1.0"
debug(params_string)
var signature_base_string = "GET" + "&" + "http%3A%2F%2Ftwitter.com%2Foauth%2Frequest_token" + "&" + escape(params_string)
debug(signature_base_string)

var signature = crypto.b64_hmac_sha1(signature_base_string, signature_key);
debug(signature)
request_headers.Authorization.oauth_signature = signature


var query = "OAuth " + querystring.stringify(request_headers.Authorization)

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
var query2 = prepareHeader(request_headers.Authorization);

var req_header = {"Authorization": query2}


debug("CCCCC");
debug(inspect(req_header));

var request = twitter.request("GET", "/oauth/request_token", req_header);

debug(inspect(request));


request.finish(function (response) {
  debug(inspect("STATUS: " + response.statusCode));
  debug(inspect("HEADERS: " + JSON.stringify(response.headers)));
  response.setBodyEncoding("utf8");
  response.addListener("body", function (chunk) {
    debug(inspect("BODY: " + chunk));
  });
});