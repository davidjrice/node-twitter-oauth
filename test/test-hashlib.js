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


puts('\n\n\n')

base = "GET&http%3A%2F%2Fphotos.example.net%2Fphotos&file%3Dvacation.jpg%26oauth_consumer_key%3Ddpf43f3p2l4k3l03%26oauth_nonce%3Dkllo9940pd9333jh%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1191242096%26oauth_token%3Dnnch734d00sl2jdk%26oauth_version%3D1.0%26size%3Doriginal"
hashlib.hmac_sha1(base, "kd94hf93k423kf44&pfkkdhi9sl3r4s00")



