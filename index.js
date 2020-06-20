const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'PUT YOUR TOKEN HERE';
const ytdl = require('ytdl-core');
const cheerio= require('cheerio');
const request=require('request');
const pre='!';
const queue = new Map();
var servers = {};

bot.on('ready', () =>{
    console.log('Bot is turned on.');
    bot.user.setActivity('Boruto', {type:'WATCHING'});
   
})

bot.on('guildMemberAdd', member=>{
    const channel=member.giuld.channels.fing(channel => channel.name==='general');
    if(!channel) return;
    channel.send('Welcome ${member} to the server.');
})

bot.on('message',message=>{
    let args=message.content.substring(pre.length).split(' ');

    switch(args[0]){
        case 'info':
            message.channel.send("Konoha was the first Hidden Ninja Village to be birthed under a country. Before that, Shinobi were individual clans working under daimyo for missions. Out of all the clans, the Uchiha Clan and Senju Clan were known as top tier, becoming rivaling clans. When one daimyou ordered for an Uchiha the counter would order for Senju. Soon the rivalry ended when the leader of the Senju Clan, Hashirama offered a truce to the Uchiha Clan. Although Madara, the leader of the Uchiha Clan, disagreed with it he went along with it as his clan wanted it but he felt the Senju may oppress them. Madara went for Hokage of the Hidden Leaf Village soon after trying to gain more power for his clan but no one went for him, including themajority of his clan. Out of anger and feeling betrayed he fought Madara in what became the Valley of the End. That day it was thought that Madara was killed there. Soon after, Hashirama's brother created the Konoha Military Police Force and gave it to the Uchiha Clan as a sign of trust. Many Uchiha saw this as the same as Madara warned the clan once long ago about the Uchiha being oppressed as in reality it was a way to watch the Clan on close surveillance. Many Uchiha rebeled but it was far too late, they were already oppressed.");
        break;    
        case 'marco':
            message.channel.send('https://m.twitch.tv/waveypapijr');
        break;
        case 'jacob':
            message.channel.send('https://www.twitch.tv/peaktournaments');
        break;
        case 'tuan':
            message.channel.send('https://www.twitch.tv/toolguycoolguy');
        break;
        case 'tenzin':
            message.channel.send('https://www.twitch.tv/dragomerlin63');
            break;

        case 'colin':
            message.channel.send("Colin is bad", image(message));
             break;
        case 'clear':
            if(!args[1]) return message.reply('I need a number of messages to clear!')
            message.channel.bulkDelete(args[1]);
        break;
        case 'image':
            image(args[1]);
        break;
        case 'play':
            function play (connection,message){
                var server= servers[message.guild.id];
                server.dispatcher= connection.playStream(ytdl(server.quene[0], {filter: "audioonly"}));
                server.quene.shift();
                server.dispatcher.on("end",function(){
                    if(server.quene[0]){
                        play(connection,message);
                    }else{
                        connection.disconnect();
                    }
                })
            }
            if(!args[1]){
                message.reply('You need to put a link after the command NERD!')
                return;
            }
            if(!message.member.voiceChannel){
                message.reply('Get in a voice channel NERD!');
                return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id]={
                quene:[]
            }
            var server= servers[message.guild.id];
            server.quene.push(args[1]);
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection,message);
            })
        break;
            
        case 'stop':
            var server= servers[message.guild.id];
             if(message.guild.voiceConnection){
                 for(var i = server.quene.length-1;i>=0;i--){
                    server.quene.splice(i,1);
                 }
                 server.dispatcher.end()
                 console.log('stopped the quene')
             }
             if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;

        case 'skip':
            var server= servers[message.guild.id];
             if(server.dispatcher) server.dispatcher.end();
        break;
            
        case 'kick':
            if(!args[1])  message.channel.send('You need to give me a name idiot.')
            const user=message.mentions.users.first();
            if(user){
                const member=member.guild.member(user);
                if(member){
                    member.kick('Kicked for being a nerd').then(()=>{
                        message.reply('Got gotted')
                    }).catch(err=>{
                        message.reply("I couldn't kick them");
                    })
                }
            }
        break;

    }
})

function image(message){
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + args[1],
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
        $ = cheerio.load(responseBody);
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href")); 
        console.log(urls);
        if (!urls.length) {   
            return;
        }
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
}

bot.login(token);
