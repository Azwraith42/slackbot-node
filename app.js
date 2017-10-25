var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token = process.env.SLACK_BOT_TOKEN;

var rtm = new RtmClient(bot_token);

let channel;

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
	  console.log(c);
	  if (c.is_member && c.name ==='deploybot-home') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage("Hello!", channel);
});

//{
// "type":"message",
// "channel":"C7HHG9R40",
// "user":"U5ZNJHM5Z",
// "text":"Hello Deploy Bot",
// "ts":"1508888299.000321",
// "source_team":"T02921102",
// "team":"T02921102"
// }
rtm.on(CLIENT_EVENTS.RTM.RAW_MESSAGE, function(msg){
	console.log("Message Get!\n");
	var json = JSON.parse(msg);
	console.log(json);
	console.log(typeof(json));
	console.log("text: ");
	console.log(json.text);
	console.log(json.type === "message" && json.text === "Hello Deploy Bot");
	if(json.text === "Hello Deploy Bot"){
           rtm.sendMessage("Hi there, friend!", channel);
	}

});

rtm.start();

