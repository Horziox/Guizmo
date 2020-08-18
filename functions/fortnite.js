const Discord = require("discord.js");
const axios = require("axios");
const Canvas = require("canvas");
const GIFEncoder = require('gifencoder');
const fs = require("fs");

module.exports = {

    async generateGifNews(bot, data) {
        var channel = bot.channels.cache.get("551673005689012229")
        var topic = channel.topic.split(" ")
        if(data["jcr:baseVersion"] !== topic[0]) {
            const encoder = new GIFEncoder(1280, 720);
            await encoder.createReadStream().pipe(fs.createWriteStream(`./final/br-news.gif`));
            encoder.start();
            encoder.setRepeat(0);
            encoder.setDelay(5000);
            encoder.setQuality(10);
            const canvas = Canvas.createCanvas(1280, 720);
            const ctx = canvas.getContext('2d');
            let e = 0;
            while(e != data.news.motds.length) {
                const background = await Canvas.loadImage(data.news.motds[e].image);
                ctx.globalAlpha = 1
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
                ctx.font ="60px Burbank Big Cd Bk";
                ctx.fillStyle = '#ffffff';
                ctx.fillText(data.news.motds[e].title.toUpperCase(), 30, 550);
                ctx.strokeText(data.news.motds[e].title.toUpperCase(), 30, 550);
                ctx.font ="30px Burbank Big Cd Bk";
                ctx.fillStyle = '#33edfe';
                var text = data.news.motds[e].body;
                var textSplit = text.split(" ");
                var finalText = textSplit[0]
                let t = 1;
                while(t != textSplit.length) {
                    if((ctx.measureText(finalText+" "+textSplit[t]).width) <= 700) finalText = finalText+" "+textSplit[t]
                    else finalText = finalText+"\n"+textSplit[t];
                    t++;
                }
                ctx.fillText(finalText, 30, 600);
                ctx.strokeText(finalText, 30, 600);        
                let i = 0;
                let right = 5
                let Tlength = (canvas.width - 10) / (data.news.motds.length) - 1
                while(i != data.news.motds.length) {
                    if(e == i) {
                        ctx.globalAlpha = 0.3
                        ctx.fillStyle = 'white'
                    }
                    else {
                        ctx.globalAlpha = 0.6
                        ctx.fillStyle = 'blue' 
                    }
                    ctx.fillRect(right, 1, Tlength, 50);
                    ctx.globalAlpha = 1
                    ctx.font ="25px Burbank Big Cd Bk";
                    ctx.fillStyle = '#ffffff';
                    let title = data.news.motds[i].tabTitleOverride
                    if(data.news.motds[i].tabTitleOverride == undefined) title = data.news.motds[i].title
                    ctx.fillText(title.toUpperCase(), (Tlength-ctx.measureText(title.toUpperCase()).width)/2 +right, 35, Tlength)
                    ctx.strokeText(title.toUpperCase(), (Tlength-ctx.measureText(title.toUpperCase()).width)/2 +right, 35, Tlength)
                    right = right + Tlength + 2
                    i++
                }
                encoder.addFrame(ctx);
                e++;
            }
            encoder.finish();

            let attachement = new Discord.MessageAttachment(`./final/br-news.gif`)
            await channel.send(attachement).then(message => {
                axios({
                    method: 'post',
                    url: `https://discord.com/api/v6/channels/551673005689012229/messages/${message.id}/crosspost`,
                    headers: {
                        "Authorization" : `Bot ${process.env.discordToken}`
                    }
                })
            })
            return await channel.setTopic(data["jcr:baseVersion"]+" "+topic[1])     
        }
    },

    async emergencyMessage(bot, data) {
        var channel = bot.channels.cache.get("551673005689012229")
        var topic = channel.topic.split(" ")
        if(data["jcr:baseVersion"] !== topic[1] && data.news.messages.length !==0) {
            let embed = new Discord.MessageEmbed()
            .setAuthor(data.news.messages[0].title, "https://cdn.discordapp.com/attachments/715327691842256906/739843403642306621/giphy.gif")
            .setDescription(data.news.messages[0].body)
            .setColor("#c4281a")
            .setTimestamp()
            await channel.send(embed).then(message => {
                axios({
                    method: 'post',
                    url: `https://discord.com/api/v6/channels/551673005689012229/messages/${message.id}/crosspost`,
                    headers: {
                        "Authorization" : `Bot ${process.env.discordToken}`
                    }
                })
            })
            return await channel.setTopic(topic[0]+" "+data["jcr:baseVersion"])
        }
        
    }
}