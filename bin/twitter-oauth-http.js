require('../lib/bootstrap');

// CONFIG
var http = require("http"),
    crypto = require('dep/node-crypto').crypto,
    querystring = require("querystring"),
    Base64 = require('dep/node-base64').Base64,
    hashlib = require("hashlib"),
    //twitter = http.createClient(80, "twitter.com");
    twitter = http.createClient(61213, "localhost");

// REQUEST
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

// The Goodness
var consumer_secret = "0q3N1wUJKjXeM5R84YhaymsEAFpPVbUoBEOwS3ThuAo",
    domain = "twitter.com"
    path = "/oauth/request_token",
    method = "POST"

var OAuth = {
  post: function(authorization_header, consumer_secret, method, domain, path, http){
    // Generate signature
    var url = "http://"+domain+path
    
    authorization_header.oauth_signature = OAuth.generate_signature(authorization_header, consumer_secret, method, url)
    // Make Request
    var request = twitter.request(method, path, {
      "Host": domain,
      "Authorization": OAuth.prepare_header(authorization_header)
    });
    return request;
  },
  generate_signature: function(authorization_header, consumer_secret, method, url){
    var signature_key = consumer_secret + "&" 
    var signature_base_string = "POST&"+encodeURIComponent("")+"&"+encodeURIComponent(querystring.stringify(request_headers.Authorization));
    var signature = Base64.encode(hashlib.hmac_sha1(signature_base_string, signature_key));
    debug("SIGNATURE_KEY: " + signature_key);
    debug("SIGNATURE_BASE: " + signature_base_string);
    return signature
  },
  prepare_header: function(params){
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
}

request = OAuth.post(request_headers.Authorization, consumer_secret, method, domain, path, twitter)

// Debugging
puts("\n\n")
debug("REQUEST:");
puts(request.output[0]);
puts("\n\n")

request.finish(function (response) {
  debug(inspect("STATUS: " + response.statusCode));
  debug(inspect("HEADERS: " + JSON.stringify(response.headers)));
  response.setBodyEncoding("utf8");
  response.addListener("body", function (chunk) {
    debug(inspect("BODY: "));
    puts(chunk)
  });
});