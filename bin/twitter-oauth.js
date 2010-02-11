#!/usr/bin/env node
require('../lib/bootstrap');

var crypto = require('dep/node-crypto');
var OAuth = require('dep/node-oauth').OAuth;
var XMLHttpRequest = require('dep/node-XMLHttpRequest').XMLHttpRequest;

twitter_consumer = { 
  consumerKey   : "xxx",
  consumerSecret: "xxx",
  serviceProvider: { 
    signatureMethod     : "HMAC-SHA1",
    requestTokenURL     : "http://twitter.com/oauth/request_token",
    userAuthorizationURL: "http://twitter.com/oauth/authorize",
    accessTokenURL      : "http://twitter.com/oauth/access_token",
  }
};

debug(inspect(crypto));
debug(inspect(OAuth));
debug(inspect(XMLHttpRequest));

debug(inspect(getTokens(twitter_consumer)));

function getTokens(consumer) {
    var accessor = consumer;
    
    var message = {
        method: "post", action: accessor.serviceProvider.requestTokenURL,
        parameters: {}
    };
    
    var requestBody = OAuth.formEncode(message.parameters);
    OAuth.completeRequest(message, accessor);
    var authorizationHeader = OAuth.getAuthorizationHeader("", message.parameters);
    
    debug(inspect(requestBody));
    
    var requestToken = newXMLHttpRequest();
    requestToken.onreadystatechange = function receiveRequestToken() {
        if (requestToken.readyState == 4) {
            var dump = requestToken.status+" "+requestToken.statusText
                  +"\n"+requestToken.getAllResponseHeaders()
                  +"\n"+requestToken.responseText;
            if (confirm(dump)) {
                var results = OAuth.decodeForm(requestToken.responseText);
                message = {method: "post", action: accessor.serviceProvider.accessTokenURL};
                OAuth.completeRequest(message,
                    { consumerKey   : accessor.consumerKey
                    , consumerSecret: accessor.consumerSecret
                    , token         : OAuth.getParameter(results, "oauth_token")
                    , tokenSecret   : OAuth.getParameter(results, "oauth_token_secret")
                    });
                var requestAccess = newXMLHttpRequest();
                requestAccess.onreadystatechange = function receiveAccessToken() {
                    if (requestAccess.readyState == 4) {
                        alert(requestAccess.status+" "+requestAccess.statusText
                              +"\n"+requestAccess.getAllResponseHeaders()
                              +"\n"+requestAccess.responseText);
                    }
                };
                requestAccess.open(message.method, message.action, true); 
                requestAccess.setRequestHeader("Authorization", OAuth.getAuthorizationHeader("", message.parameters));
                requestAccess.send();
            }
        }
    };
    requestToken.open(message.method, message.action, true); 
    requestToken.setRequestHeader("Authorization", authorizationHeader);
    requestToken.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    requestToken.send(requestBody);
}
function newXMLHttpRequest() {
    try{
        return new XMLHttpRequest();
    } catch(e) {
      puts("Damn, no XMLHttpRequest");
      throw(e);
    }
}

