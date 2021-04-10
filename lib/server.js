
var http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var handlers = require('./handlers');
var helpers = require('./helpers');
var path = require('path');

var server = {};

server.init = () => {
 
    http.createServer((request, response) => {
        const { headers, url } = request;
        var method = request.method;
        var incomingUrl = new URL(url, 'http://localhost:3000');
        var queryStringObject = incomingUrl.searchParams;
        var path = incomingUrl.pathname;
        var trimmedPath = path.replace(/^\/+|\/+$/g,'');
        let body = [];
        request.on('error', (err) => {
          console.error(err);
        }).on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
      
      
          response.on('error', (err) => {
            console.error(err);
          });

          
          var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;
          chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;

          const data = {
            'trimmedPath':trimmedPath,
            'queryStringObject':queryStringObject,
            'method':method.toLowerCase(),
            'headers':headers,
            'payload':body
            };
          chosenHandler(data).then((handlerResult) => {
       

              const resultIsArray = typeof(handlerResult) == 'object' && handlerResult instanceof Array ? true : false;
              var statusCode = 200;
              var payload = {};
              var contentType = 'json';
              var payloadString = '';

              if(resultIsArray){
                statusCode = handlerResult[0];
                payload = handlerResult[1];
         
                if(handlerResult.length > 2){
                    contentType = handlerResult[2];
                }

              }else if(typeof(handlerResult) == 'number'){
          
                statusCode = handlerResult;
              }else{
                console.log("RESULT IS NEITHER AN ARRAY OR A number?: ",result);
 
              }

              if(contentType == 'json'){
                console.log("In json contenttype");
                response.setHeader('Content-Type', 'application/json');
                payload = typeof(payload) == 'object' ? payload : {};
                payloadString = JSON.stringify(payload);
              }
              if(contentType == 'html'){
                response.setHeader('Content-Type','text/html');
                payloadString = typeof(payload) == 'string' ? payload : '';
              }
              if(contentType == 'favicon'){
                response.setHeader('Content-Type','image/x-icon');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
              }
              if(contentType == 'css'){
                response.setHeader('Content-Type','text/css');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
              }
              if(contentType == 'png'){
                response.setHeader('Content-Type','image/png');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
              }
              if(contentType == 'jpg'){
                response.setHeader('Content-Type','image/jpeg');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
              }
              if(contentType == 'plain'){
                response.setHeader('Content-Type','text/plain');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
              }
              response.statusCode = statusCode;
              response.end(payloadString);

              if(statusCode == 200){
                console.log('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
            
              }else{
                console.log('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
              }



          }).catch((err) => {
              console.log("Chosen Handler Error = ",err);
          });  



        });
      }).listen(3000);


}

server.router = {
    '':handlers.index,
    'ping':handlers.ping,
    'api/users':handlers.users,
    'api/tokens':handlers.tokens,
    'public':handlers.public,
    'favicon.ico':handlers.favicon,
    'account/create':handlers.accountCreate,
    'account/edit':handlers.accountEdit,
    'account/deleted':handlers.accountDeleted,
    'session/create':handlers.sessionCreate,
    'session/deleted':handlers.sessionDeleted

};

module.exports = server;