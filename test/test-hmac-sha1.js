require('../lib/bootstrap');
process.mixin(require("./common"));
//var Mustache = require('../dep/node-mustache')
var crypto = require('dep/node-crypto').crypto,
    Base64 = require('dep/node-base64').Base64;

var got_error = false;


// var base_string = "bs"
// var signature_key = "cs&"
// var sha1 = crypto.hex_hmac_sha1(base_string, signature_key);
// var b64 = Base64.encode(sha1);
// puts(b64);


// TEST BASE64
var base = Base64.encode('f')
assert.equal("Zg==", base)

// TEST HMAC-SHA1
// http://tools.ietf.org/html/rfc2104
//
var hex_hmac_sha1 = crypto.hex_hmac_sha1("0x0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b", "Hi There")
var b64_hmac_sha1 = crypto.b64_hmac_sha1("0x0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b", "Hi There")
var str_hmac_sha1 = crypto.str_hmac_sha1("0x0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b", "Hi There")

debug("SHOULD == " + "0xb617318655057264e28bc0b6fb378c8ef146be00")
puts(hex_hmac_sha1);
puts(b64_hmac_sha1);
puts(str_hmac_sha1);

//assert.equal("0xb617318655057264e28bc0b6fb378c8ef146be00",hex_hmac_sha1)
//assert.equal("0xb617318655057264e28bc0b6fb378c8ef146be00",b64_hmac_sha1)
//assert.equal("0xb617318655057264e28bc0b6fb378c8ef146be00",str_hmac_sha1)
//

//var Crypto = {}

// var hmac = Crypto.HMAC(Crypto.SHA1, "\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b", "Hi There", { asString: true } );
// puts(hmac);
// 
// var hmac_b = Crypto.HMAC(Crypto.SHA1, "Hi There", "\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b", { asBytes: true } );
// puts(hmac_b);


