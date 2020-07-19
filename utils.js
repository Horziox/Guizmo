const fs = require("fs");
const path = require("path");
const request = require("request");
const Canvas = require("canvas");
const GIFEncoder = require('gifencoder');

const FortniteData = require('./final/dataFortnite.json');

module.exports = {

    importFile(bot, filePath) {
        try {
            const command = require(`./${filePath}`);
            if (bot.commands.has(command.name)) console.warn(`Command ${command.name} has already been registered ! Register multiples files with the same command name will ignore all others previously registered commands !`);
            bot.commands.set(command.name, command);
            console.info(`Command ${command.name} in ./${filePath} has been successfully loaded !`);
        } catch (e) {
            console.error(`Error when loading ${filePath} !`);
            console.error(e);
        }
    },

    cycleDir(client, dir) {
        fs.readdirSync(dir).forEach(file => {
            let fullPath = path.join(dir, file);
            if (fs.lstatSync(fullPath).isDirectory()) {
                this.cycleDir(client, fullPath);
            } else {
                this.importFile(client, fullPath);
            }
        });
    },

    async generateNews() {
        return new Promise((resolve) => {
            request({
                url: "https://fortnite-api.com/v2/news/br?language=fr",
                json: true,
            }, async function(error, response, body) {
                if(body.data.hash != FortniteData.news) {
                    const encoder = new GIFEncoder(1280, 720);
                    await encoder.createReadStream().pipe(fs.createWriteStream(`./final/brNews.gif`));
                    encoder.start();
                    encoder.setRepeat(0);
                    encoder.setDelay(5000);
                    encoder.setQuality(10);
                    const canvas = Canvas.createCanvas(1280, 720);
                    const ctx = canvas.getContext('2d');
                    let e = 0;
                    while(e != body.data.motds.length) {
                        const background = await Canvas.loadImage(body.data.motds[e].image);
                        ctx.globalAlpha = 1
                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
                        ctx.font ="60px Burbank Big Cd Bk";
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(body.data.motds[e].title.toUpperCase(), 30, 550);
                        ctx.font ="30px ";
                        ctx.fillStyle = '#33edfe';
                        var text = body.data.motds[e].body;
                        var textSplit = text.split(" ");
                        var finalText = textSplit[0]
                        let t = 1;
                        while(t != textSplit.length) {
                            if((ctx.measureText(finalText+" "+textSplit[t]).width) <= 700) finalText = finalText+" "+textSplit[t]
                            else finalText = finalText+"\n"+textSplit[t];
                            t++;
                        }
                        ctx.fillText(finalText, 30, 600);          
                        let i = 0;
                        let right = 5
                        let Tlength;
                        if(body.data.motds.length == 1) Tlength = 1270
                        else if(body.data.motds.length == 2) Tlength = 633
                        else if(body.data.motds.length == 3) Tlength = 422
                        while(i != body.data.motds.length) {
                            if(e == i) ctx.globalAlpha = 0.25
                            else ctx.globalAlpha = 0.6
                            ctx.fillStyle = 'blue'
                            ctx.fillRect(right, 1, Tlength, 50);
                            ctx.globalAlpha = 1
                            ctx.font ="25px Burbank Big Cd Bk";
                            ctx.fillStyle = '#ffffff';
                            let title = body.data.motds[i].tabTitle
                            if(body.data.motds[i].tabTitle == null) title = body.data.motds[i].title
                            ctx.fillText(title.toUpperCase(), (Tlength-ctx.measureText(title.toUpperCase()).width)/2 +right, 35)
                            right = right + Tlength + 2
                            i++
                        }
                        encoder.addFrame(ctx);
                        e++;
                    }
                    FortniteData.news = body.data.hash
                    fs.writeFile('./final/dataFortnite.json', JSON.stringify(FortniteData), function writeJSON(err) {
                        if (err) return console.log(err);
                    })
                    encoder.finish();        
                    resolve(`./final/brNews.gif`)
                }
                resolve(`./final/brNews.gif`)
            })
        })
    }
}