console.log("WAIT FOR THE BOT TO START.......");
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const request = require('request');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

const TOKEN = config.botToken
const prefix = config.prefix

client.login(TOKEN)

client.on('ready', () =>{
    client.user.setActivity(`Perfix: $t - use $t help`, { type: "PLAYING" })
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    console.log("ONLINE AT "+timeanddate)
    fs.appendFileSync("saved_data/online.log", "ONLINE AT: "+timeanddate+"\n\n");
});
client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)){ 
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        fs.appendFileSync("saved_data/messages.log", "AUTHOR ID: "+message.author+"\n\n"+"CHANNEL: "+message.channel+"\n\n"+"TIME AND DATE: "+timeanddate+"\n\n"+"CONTENT:\n\n"+message.content+"\n\n"+"----------------------------------| END OF MESSAGE |-------------------------------------------"+"\n\n\n");
        return;
    }
    else if(message.content == "$t help"){
        message.channel.send("USED $t help\n```\ncommand list:\ngay - check how much gay you are (my developer is LGBT)\n\nsexy - check how much sexy you are \n\ndefine my message - defindes the message you just sent\n\nnitro - sends a fake nitro link straight to a brand new rickroll link *evil laughing\n\nrandom image - send's a random image produced by picsum.photos```")
    }
    else if(message.content == "$t test"){
        message.channel.send("the test work's!");
        console.log("test works")
    }
    else if (message.content == "$t gay"){
        const rndInt = Math.floor(Math.random() * 100) + 1
        var gay = "are";
        if(rndInt > 50){gay = "are"}if(rndInt < 50){gay = "are not"}
        message.channel.send("<@"+message.author+">, you are "+rndInt+"% gay! :) \n and that means you "+gay+" gay.");
    }
    else if(message.content == "$t sexy"){
        const rndInt = Math.floor(Math.random() * 100) + 1
        var sexy = "are"
        if(rndInt > 50){sexy = "are"}if(rndInt < 50){sexy = "are not"}
        message.channel.send("<@"+message.author+">, you are "+rndInt+"% sexy.\nand that means you are "+sexy+" sexy.")
    }
    else if(message.content == "$t define my message"){
        var defineme = "author = <@"+message.author+">   author id:  "+message.author+"    time sent: "+message.createdAt+"  channel id: "+message.channelId
        message.channel.send(defineme)
    }
    else if(message.content == "$t nitro"){
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'HERE YOU ARE, YOUR DISCORD FREE NITRO!',
            url: 'https://aspb3.cdn.asset.aparat.com/aparat-video/b0a18541d5273fcd8493cba052eb3d0915040598-720p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJhN2JhMDY0MzVkNGNhMWE2YmZiZDk3NzFmOTE0YTlhIiwiZXhwIjoxNjM4Mzc1NDQyLCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.7God9lc_EZsxVUwKdz_KakDiSVk41zTOLi53Z-POcb8',
        };
        message.channel.send({ embeds: [exampleEmbed] });
        
    }
    else if(message.content == "$t random image"){
        const rndo = Math.floor(Math.random() * 300) + 200;
        const rndt = Math.floor(Math.random() * 300) + 200;
        message.channel.send("https://picsum.photos/"+rndo+"/"+rndt);
    }else if (message.content.startsWith("$t message")){
        str = message.content;
        xss = str.replace("$t message ", "");
        fs.appendFileSync("saved_data/messages_to_developer.log", "FROM: "+message.author+"\n\n"+"MESSAGE CONTENT: "+"\n\n"+xss+"\n\n\n"+"----------------------------------| END OF MESSAGE |-------------------------------------------"+"\n\n")
        client.users.fetch('745157949122543686', false).then((user) => {
            user.send("```FROM: "+message.author+"\n\n"+"MESSAGE CONTENT: "+"\n\n"+xss+"\n\n\n"+"----------------------------------| END OF MESSAGE |-------------------------------------------"+"```");
           }); 
        message.channel.send("MESSAGE SENT TO DEVELOPER ✅");          
    }else{
        message.channel.send("COMMAND NOT FOUND! use $t help")
    }

    //SAVING TO LOG ----------------------------------
    
    if (!message.content.startsWith("$t message")){
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    fs.appendFileSync("saved_data/commands.log", "AUTHOR ID: "+message.author+"\n\n"+"CHANNEL: "+message.channel+"\n\n"+"TIME AND DATE: "+timeanddate+"\n\n"+"CONTENT:\n\n"+message.content+"\n\n"+"----------------------------------| END OF MESSAGE |-------------------------------------------"+"\n\n\n");
    }

    //END OF SAVING TO LOG ---------------------------

});
//  ^^  this is for the start of on.message
    client.login(TOKEN);
