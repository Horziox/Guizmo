const Discord = require("discord.js");
const fs = require("fs");
const axios = require("axios");
const Canvas = require("canvas");
const GIFEncoder = require('gifencoder');

module.exports = {
    name: "news",
    async execute(message, args, bot, prefix) {
        const generateNews = new Promise(async (resolve, reject) => {
            message.channel.startTyping()
            var request = await axios({
                method: 'get',
                url: 'https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game',
                headers: { 
                    'Accept-Language': 'fr-FR', 
                }
            })
            var data = request.data.battleroyalenews.news.motds
            const encoder = new GIFEncoder(1280, 720);
            await encoder.createReadStream().pipe(fs.createWriteStream(`./final/br-news.gif`));
            encoder.start();
            encoder.setRepeat(0);
            encoder.setDelay(5000);
            encoder.setQuality(10);
            const canvas = Canvas.createCanvas(1280, 720);
            const ctx = canvas.getContext('2d');
            let e = 0;
            while(e != data.length) {
                const background = await Canvas.loadImage(data[e].image);
                ctx.globalAlpha = 1
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
                ctx.font ="60px Burbank Big Cd Bk";
                ctx.fillStyle = '#ffffff';
                ctx.fillText(data[e].title.toUpperCase(), 30, 550);
                ctx.strokeText(data[e].title.toUpperCase(), 30, 550);
                ctx.font ="30px Burbank Big Cd Bk";
                ctx.fillStyle = '#33edfe';
                var text = data[e].body;
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
                let Tlength = (canvas.width - 10) / (data.length) - 1
                while(i != data.length) {
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
                    let title = data[i].tabTitleOverride
                    if(data[i].tabTitleOverride == undefined) title = data[i].title
                    ctx.fillText(title, (Tlength-ctx.measureText(title).width)/2 +right, 35, Tlength)
                    ctx.strokeText(title, (Tlength-ctx.measureText(title).width)/2 +right, 35, Tlength)
                    right = right + Tlength + 2
                    i++
                }
                encoder.addFrame(ctx);
                e++
            }
            encoder.finish()
            return resolve("./final/br-news.gif")
        })

        generateNews.then(async (value) => {
            let embed = new Discord.MessageEmbed()
            .setTitle("Actualités Fortnite Battle Royale")
            .setColor('#bf9322')
            .attachFiles(value)
            .setImage('attachment://br-news.gif')
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            await message.channel.stopTyping()
            return await message.channel.send(embed)
        })
    }
}
