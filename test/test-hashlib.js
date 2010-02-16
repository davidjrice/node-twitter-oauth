require('../lib/bootstrap');
process.mixin(require("./common"));
//var Mustache = require('../dep/node-mustache')
var crypto = require('dep/node-crypto').crypto,
    Base64 = require('dep/node-base64').Base64,
    hashlib = require("hashlib");

// http://wiki.oauth.net/TestCases

var base_string = "bs"
var signature_key = "cs&"
var hmac_sha = hashlib.hmac_sha1(base_string, signature_key)
puts(hmac_sha);

var b64 = Base64.encode(hmac_sha);
puts(b64);

debug("SHOULD EQUAL: egQqG5AJep5sJ7anhXju1unge2I=")