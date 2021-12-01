console.log("WAIT FOR THE BOT TO START.......");
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

const TOKEN = config.botToken
const prefix = config.prefix

client.login(TOKEN)

client.on('ready', () =>{
    client.user.setActivity(`Perfix: $t - use $t help`, { type: "PLAYING" })
    console.log("WE ARE READYYYYYYYYYY!!!!!!!")
});
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if(message.content == "$t help"){
        message.channel.send("USED $t help\n```\ncommand list:\ngay - check how much gay you are (my developer is LGBT)\n\nsexy - check how much sexy you are \n\ndefine my message - defindes the message you just sent\n\nnitro - sends a fake nitro link straight to a brand new rickroll link *evil laughing```")
    }
    if(message.content == "$t test"){
        message.channel.send("the test work's!");
        console.log("test works")
    }
    if (message.content == "$t gay"){
        const rndInt = Math.floor(Math.random() * 100) + 1
        console.log("GAY COMMAND USED. RANDOM NUMBER IS: "+rndInt);
        var gay = "hastid";
        if(rndInt > 50){gay = "hastid"}if(rndInt < 50){gay = "nistid"}
        message.channel.send("<@"+message.author+">, shoma "+rndInt+"% gay hastid! :) \n va in yaani shoma gay "+gay+".");
    }
    if(message.content == "$t sexy" && !message.author == '745157949122543686'){
        const rndInt = Math.floor(Math.random() * 100) + 1;
        var sexy = "hastid"
        if(rndInt > 50){sexy = "hastid"}if(rndInt < 50){sexy = "nistid :( sorry"}
        message.channel.send("<@"+message.author+">, shoma "+rndInt+"% sexy hastid.\nke yaani shoma sexy "+sexy+".");
    }else if(message.content == "$t sexy" && message.author == '745157949122543686'){
        message.channel.send("<@745157949122543686>, shoma 100% sexy hastid.\nke yaani shoma sexy hastid.");
    }
    if(message.content == "$t define my message"){
        var defineme = "author = <@"+message.author+">   author id:  "+message.author+"    time sent: "+message.createdAt+"  channel id: "+message.channelId
        message.channel.send(defineme)
    }
    if(message.content == "$t nitro"){
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'HERE YOU ARE, YOUR DISCORD FREE NITRO!',
            url: 'https://aspb3.cdn.asset.aparat.com/aparat-video/b0a18541d5273fcd8493cba052eb3d0915040598-720p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJhN2JhMDY0MzVkNGNhMWE2YmZiZDk3NzFmOTE0YTlhIiwiZXhwIjoxNjM4Mzc1NDQyLCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.7God9lc_EZsxVUwKdz_KakDiSVk41zTOLi53Z-POcb8',
        };
        message.channel.send({ embeds: [exampleEmbed] });
        
    }

    });
//  ^^  this is for the start of on.message
    client.login(TOKEN);