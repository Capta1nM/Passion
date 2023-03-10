module.exports = {
  Admins: ["UserID", "UserID"], //Admins of the bot
  ExpressServer: true, //If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || ">", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/mmhJQHjG", //Support Server Link
  Token: process.env.Token || "ODg0MzAxODcwMTU4NDc5MzYw.Gr26Qc.yo4-eO4BezNVlajhNUnkGnZjWVXMmYonq8E2Sg", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "884301870158479360", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "BNYbSXzDAAAvKoMP2dd5B3uFshhWkOIk", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  ServerDeafen: true, //If you want bot to stay deafened
  DefaultVolume: 100, //Sets the default volume of the bot, You can change this number anywhere from 1 to 100
  CallbackURL: "/api/callback", //Discord API Callback url. Do not touch it if you don't know what you are doing. All you need to change for website to work is on line 20.
  "24/7": true, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "Pikachu is cute", //A Secret like a password
  IconURL:
    "https://raw.githubusercontent.com/SudhanPlayz/Passion/master/assets/logo.gif", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  IconSent: "https://raw.githubusercontent.com/manhkull/demoproject/main/900675264625922108.jpg",
  EmbedColor: "#FF69B4", //Color of most embeds | Dont edit unless you want a specific color instead of a random one each time
  Permissions: 2205281600, //Bot Inviting Permissions
  Website: process.env.Website || "https://example.com", //Website where it is hosted at includes http or https || Use "0.0.0.0" if you using Heroku || Do not include /api/callback. Just the website url. I.e. "https://foo.bar"
  //If you get invalid oauth, make sure on the discord developer page you set the oauth url to something like: https://example.com/api/callback.
  OpenAPISecret: "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",
  Presence: {
    status: "online", // You can show online, idle, and dnd
    name: "", // The message shown
    type: "", // PLAYING, WATCHING, LISTENING, STREAMING
  },

   // Lavalink server; public lavalink -> https://lavalink-list.darrennathanael.com/; create one yourself -> https://darrennathanael.com/post/how-to-lavalink/
  // The default one should work fine, altho if you have issue with it, you can create your own or use another public lavalink.
  Lavalink: {
    id: "Main", //- Used for indentifier. You can set this to whatever you want.
    host: "lavalink4africa.islantay.tk", //- The host name or IP of the lavalink server.
    port: 8880, // The port that lavalink is listening to. This must be a number!
    pass: "AmeliaWatsonisTheBest**!", //- The password of the lavalink server.
    secure: false, // Set this to true if the lavalink uses SSL. if not set it to false.
  },

  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "32c6640a859b4cd7a2f93fe10c15fe3a", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "e34871cad2774584a6dd37852c4113d3", //Spotify Client Secret
  },
};
