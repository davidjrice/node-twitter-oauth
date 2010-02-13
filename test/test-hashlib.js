require('../lib/bootstrap');
process.mixin(require("./common"));
//var Mustache = require('../dep/node-mustache')
var crypto = require('dep/node-crypto').crypto,
    Base64 = require('dep/node-base64').Base64,
    hashlib = require("hashlib");

var base_string = "bs"
var signature_key = "cs&"

var hmac_sha1 = hashlib.sha1(base_string);
var hmac_sha1a = hashlib.sha1(signature_key);

puts(hmac_sha1);
puts(hmac_sha1a);

var b64 = Base64.encode(hmac_sha1);
puts(b64);
