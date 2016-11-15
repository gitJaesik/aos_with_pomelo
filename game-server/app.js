var pomelo = require('pomelo');
var models = require('./models');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'game');

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.sioconnector,
      //websocket, htmlfile, xhr-polling, jsonp-polling, flashsocket
      transports : ['websocket'],
      heartbeats : true,
      closeTimeout : 60,
      heartbeatTimeout : 60,
      heartbeatInterval : 25
    });
});


app.configure('production|development', 'gate', function(){
  app.set('connectorConfig',
  {
    connector : pomelo.connectors.sioconnector,
    //websocket, htmlfile, xhr-polling, jsonp-polling, flashsocket
    transports : ['websocket'],
    heartbeats : true,
    closeTimeout : 60,
    heartbeatTimeout : 60,
    heartbeatInterval : 25
  });
  /*
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      useProtobuf : true
    });
  */
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
