console.log("WAIT FOR THE BOT TO START.......");
const Discord = require('discord.js');
console.log("Discord = discord.js");
const { Client, Intents } = require('discord.js');
console.log("Client and Intents = discord.js");
const request = require('request');
console.log("request library setup");
const fs = require('fs');
console.log("fs library setup");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
console.log("client login setup");

let rawdata = fs.readFileSync('config.json');
console.log("read config.json");
let config = JSON.parse(rawdata);
console.log("decode config.json");



const TOKEN = config.botToken
const prefix = config.prefix
console.log("extract token and perfix from config.json");

console.log("extract limited list from limit.json");

client.login(TOKEN)
console.log("login....");

client.on('ready', () =>{
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    console.log("ONLINE AT "+timeanddate)
    fs.appendFileSync("saved_data/online.log", "UPLOADER ONLINE AT: "+timeanddate+"\n\n");
    client.channels.cache.get("939872573217452033").send("UPLOADER ONLINE AT: "+timeanddate);

    setInterval(function(){
        client.channels.cache.get("939949556815249498").send("---------------| LOG START |---------------");
    },300000) 
});
client.on('messageCreate', message =>{
    if(!message.author.bot)return;
    if(message.content.startsWith("----------")){

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

        message.channel.send("LOGS FOR "+timeanddate);
        message.channel.send({ content:"commands:", files:[{ attachment: 'saved_data/commands.log' }]});
        message.channel.send({ content:"messages:", files:[{ attachment: 'saved_data/messages.log' }]});
        message.channel.send({ content:"online:", files:[{ attachment: 'saved_data/online.log' }]});

    
    }
});