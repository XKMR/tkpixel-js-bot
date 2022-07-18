console.log("WAIT FOR THE BOT TO START.......");
const Discord = require('discord.js');
const bot = require('discord.js');
console.log("Discord = discord.js");
const { Client, Intents } = require('discord.js');
console.log("Client and Intents = discord.js");
const request = require('request');
console.log("request library setup");
const fs = require('fs');
const { runInThisContext } = require('vm');
console.log("fs library setup");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
console.log("client login setup");

let rawdata = fs.readFileSync('config.json');
console.log("read config.json");
let config = JSON.parse(rawdata);
console.log("decode config.json");
logthis = true


const TOKEN = config.botToken
const prefix = config.prefix
console.log("extract token and perfix from config.json");

console.log("extract limited list from limit.json");

client.login(TOKEN)
console.log("login....");

client.on('ready', () =>{
    client.user.setActivity(`Perfix: $t`, { type: "PLAYING" })
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
    client.channels.cache.get("939872573217452033").send("ONLINE AT: "+timeanddate);
});
client.on('messageCreate', message => {
    if (message.author == 877076750625017896) return; //stop it from replying to itself
    if (message.channel == 871673942891429888)return; //ignore the spam channel
    var limited = fs.readFileSync('limit.txt').toString().split("\n"); //read limited list
    if (limited.includes(message.author.id)){ //delete limited ppl's message and say you are limited
        message.delete();
        message.channel.send("<@"+message.author.id+"> you are limited").then(msg=>msg.delete({timeout:"2000"}));
        return;
    }
    if (message.content.includes(" quote_this")){//quote check
        var quoted = '_"'+message.content.split(" quote_this")+'"_\n\n- <@'+message.author.id+">"
        message.channel.send("qutoed in <#998648611783057479>").then(msg=>msg.delete({timeout:"5000"}));
        client.channels.cache.get("998648611783057479").send(quoted)
        return;
    }
    if (!message.content.startsWith(prefix)){ //if message started with perfix
        if(message.content == "") return;
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        if(message.content == ""){
            actualmsg = "ACTION: DELETED OR UNREADABLE MESSAGE";
        }else{
            actualmsg = message.content;
        }
        fs.appendFileSync("saved_data/messages.log", "MESSAGE CREATED\n\nAUTHOR ID: "+message.author+"\n\n"+"CHANNEL: "+message.channel+"\n\n"+"TIME AND DATE: "+timeanddate+"\n\n"+"CONTENT:\n\n"+actualmsg+"\n\n"+"----------------------------------| END OF MESSAGE |-------------------------------------------"+"\n\n\n");
        client.channels.cache.get("939872137068576768").send("```\nAUTHOR ID: "+message.author+"\n\n"+"CHANNEL: "+message.channel+"\n\n"+"TIME AND DATE: "+timeanddate+"\n\n"+"CONTENT:\n\n"+actualmsg+"\n\n"+"----------------------------------| END OF MESSAGE |-------------------------------------------\n```");
        return;
    }
    else if(message.content == "$t help"){
        message.channel.send("USED $t help\n```\ncommand list:\ngay - check how much gay you are\n\nsexy - check how much sexy you are \n\ndefine my message - defindes the message you just sent\n\nnitro - sends a fake nitro link straight to a brand new rickroll link *evil laughing\n\nrandom image - send's a random image produced by picsum.photos\n\nmessage - send a private message to developer\n\nlimit - mute a user\n\nunlimit - unmute a user\n\nunlimit_all - clear muted list\n\nlove <user> - see how much you love each other\n\nadd quote_this at the end of your message and the bot will quote it!\n```")
    }else if(message.content == "$t limit"){
        message.channel.send("wrong syntax. correct usage: $t limit <user>");
        return;
    }
    else if(message.content.startsWith("$t limit <@") || message.content.startsWith("$t limit <!@")){
        if(!message.member.permissionsIn(message.channel).has("ADMINISTRATOR"))return message.channel.send("YOU DO NOT HAVE PERM!");
        strs = message.content;
        sss = strs.replace("$t limit <@!", "");
        ssss = sss.replace(">", "");
        sssx = ssss.replace(" ", "");
        if(sssx == message.author.id)return message.channel.send("CANT LIMIT URSELF!");
        fs.appendFileSync("limit.txt", ssss+"\n")
        message.channel.send("✅ Limited <@"+sssx+">");
    }
    else if(message.content == "$t unlimit")return message.channel.send("wrong syntax. correct usage: $t unlimit <user>");
    else if(message.content.startsWith("$t unlimit <@")){
        if(!message.member.permissionsIn(message.channel).has("ADMINISTRATOR"))return message.channel.send("YOU DO NOT HAVE PERM!");
        msgs = message.content;
        lid = msgs.replace("$t unlimit <@!", "");
        rmlid = lid.replace(">", "");

        limitfile = fs.readFileSync("limit.txt", 'utf8');
        rmlfile = limitfile.replace(rmlid, "");
        fs.writeFileSync("limit.txt", rmlfile);
        message.channel.send("✅ Unlimited <@"+rmlid+">");
    }
    else if(message.content == "$t unlimit_all"){
        if(!message.member.permissionsIn(message.channel).has("ADMINISTRATOR"))return message.channel.send("YOU DO NOT HAVE PERM!");
        fs.writeFileSync("limit.txt", "");
        message.channel.send("✅ All");
    }
    else if(message.content == "$t test"){
        message.channel.send("the test work's!");
        console.log("test works");
    }
    else if (message.content == "$t gay"){
        if(message.author.id == 745157949122543686 || message.author.id == 780133749669101659){
            message.channel.send("🏳️‍🌈<@"+message.author+">, you are 100% gay.\nand that means you are gay.")
        }
        else{
        const rndInt = Math.floor(Math.random() * 100) + 1
        var gay = "are";
        if(rndInt > 50){gay = "are"}if(rndInt < 50){gay = "are not"}
        message.channel.send("<@"+message.author+">, you are "+rndInt+"% gay! :) \n and that means you "+gay+" gay.");
        }
    }
    else if(message.content == "$t sexy"){
        if(message.author == 795587326491230238){
            message.channel.send("<@795587326491230238>, you are 0% sexy.\nand that means you are not sexy.")
        }
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
            url: 'https://www.aparat.com/v/7NkKL/Rick_Astley_-_Never_Gonna_Give_You_Up_%28Video%29',
        };
        message.channel.send({ embeds: [exampleEmbed] });
        
    }
    else if(message.content == "$t random image"){
        const rndo = Math.floor(Math.random() * 300) + 200;
        const rndt = Math.floor(Math.random() * 300) + 200;
        message.channel.send("https://picsum.photos/"+rndo+"/"+rndt);
    }else if(message.content == "$t message"){
        message.channel.send("WRONG SYNTAX! correct usage:  $t message <the message you want to send>");
    }else if (message.content.startsWith("$t message")){
        str = message.content;
        xss = str.replace("$t message ", "");
        fs.appendFileSync("saved_data/messages_to_developer.log", "FROM: "+message.author+"\n\n"+"MESSAGE CONTENT: "+"\n\n"+xss+"\n\n\n"+"----------------------------------| END OF MESSAGE |-------------------------------------------"+"\n\n")
        client.users.fetch('745157949122543686', false).then((user) => {
            user.send("```FROM: "+message.author+"\n\n"+"MESSAGE CONTENT: "+"\n\n"+xss+"\n\n\n"+"----------------------------------| END OF MESSAGE |-------------------------------------------"+"```");
           }); 
        message.channel.send("MESSAGE SENT TO DEVELOPER ✅");
        message.delete();   
    }else if(message.content == "$t say yo"){
        message.reply("yo")
    }else if(message.content == "$t love"){
        message.channel.send("WRONG USAGE. CHECK $t help")
    }else if(message.content == "$t love <@745157949122543686>" && message.author.id == 780133749669101659){
        const rndo = "101"
        lstr = message.content.replace("$t love ", "")
        message.channel.send(`❤️ ${message.author} + ${lstr} = ${rndo}%`)
    }else if(message.content == "$t love <@780133749669101659>" && message.author.id == 745157949122543686){
        const rndo = "101"
        lstr = message.content.replace("$t love ", "")
        message.channel.send(`❤️ ${message.author} + ${lstr} = ${rndo}%`)
    }else if(message.content.startsWith("$t love <@") || message.content.startsWith("$t love <!@")){
        const rndo = Math.floor(Math.random() * 100) + 1;
        lstr = message.content.replace("$t love ", "")
        message.channel.send(`❤️ ${message.author} + ${lstr} = ${rndo}%`)
    }else if(message.content.startsWith("$t ans")){//anouncement maker
        if(message.author.id == "745157949122543686"){
            var ansfunc = message.content.replace("$t ans <#", "").split(" c: ")
            function isNumeric(value) {
                return /^-?\d+$/.test(value);
            }
            if(!isNumeric(ansfunc[0].replace(">", ""))){
                message.channel.send("wrong syntax error 0: failed to verify channel.is.number")
                return;
            }
            if(!ansfunc[1]) return message.channel.send("wrong syntax error 1: failed to verify message.not.empty");
            if(message.guild.channels.cache.get(ansfunc[0]) === undefined) return message.channel.send("wrong syntax error 2: faild to verify channel.exists");
            client.channels.cache.get(ansfunc[0].replace(">", "")).send(ansfunc[1])
        }else{
            message.channel.send("COMMAND NOT FOUND or NOT USED CORRECTLY! use $t help")
        }
    }
    else{
        message.channel.send("COMMAND NOT FOUND or NOT USED CORRECTLY! use $t help")
    }

    //SAVING TO LOG ----------------------------------
    if(logthis){
        if (message.content.startsWith("$t ")){
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();
            timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
            fs.appendFileSync("saved_data/commands.log", "COMMAND USED\n\nAUTHOR ID: "+message.author+"\n\n"+"CHANNEL: "+message.channel+"\n\n"+"TIME AND DATE: "+timeanddate+"\n\n"+"CONTENT:\n\n"+message.content+"\n\n"+"----------------------------------| END OF MESSAGE |-------------------------------------------"+"\n\n\n");
            client.channels.cache.get("939872324482633758").send("```\COMMAND USED\n\nAUTHOR ID: "+message.author+"\n\n"+"CHANNEL: "+message.channel+"\n\n"+"TIME AND DATE: "+timeanddate+"\n\n"+"CONTENT:\n\n"+message.content+"\n\n"+"----------------------------------| END OF MESSAGE |-------------------------------------------\n```");
        }
    }
    //END OF SAVING TO LOG ---------------------------

});
//  ^^  this is for the start of on.message

client.on('roleCreate', role =>{

    //time and date setup-----------------
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    //time and date end------------------

    client.channels.cache.get('940142122005315634').send("AT "+timeanddate+" ROLE CREATED "+role.id);
});

client.on('roleDelete', role =>{

    //time and date setup-----------------
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    //time and date end------------------

    client.channels.cache.get('940142122005315634').send("AT "+timeanddate+" ROLE DELETED "+role.id);
});

client.on('roleUpdate', role =>{

    //time and date setup-----------------
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    //time and date end------------------

    client.channels.cache.get('940142122005315634').send("AT "+timeanddate+" ROLE UPDATED "+role.id);
});

client.on('messageDelete', (message, member) =>{

    if(message.author.id == 877076750625017896)return;
    //time and date setup-----------------
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        timeanddate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    //time and date end------------------

    client.channels.cache.get('939872137068576768').send("```\nMESSAGE DELETED\n\nTIME AND DATE: "+timeanddate+"\n\nCONTENT:\n\n"+message.content+"\n\nSENT BY: "+message.author.id+"\n\nCHANNEL: "+message.channel.id+"\n```");
    fs.appendFileSync('saved_data/messages.log', "MESSAGE DELETED\n\nTIME AND DATE: "+timeanddate+"\n\nCONTENT:\n\n"+message.content+"\n\nSENT BY: "+message.author.id+"\n\nCHANNEL: "+message.channel.id+"\n\n----------------------------------| END OF MESSAGE |-------------------------------------------\n\n\n");
});


    client.login(TOKEN);
