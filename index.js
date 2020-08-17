const Discord = require("discord.js");
const fs = require("fs");
const utils = require("./utils.js");
const schedule = require('node-schedule');
const request = require("request");
const bot = new Discord.Client();

require("dotenv").config()

const FortniteData = require('./final/dataFortnite.json');

bot.commands = new Discord.Collection();

// Enregistrement des évènements
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    try {
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        bot.on(eventName, event.bind(null, bot));
        console.info(`${eventName} event has been successfully loaded !`);
    } catch (e) {
        console.error(`Error when loading ${file} !`);
        console.error(e);
    }
}
console.log(" ");

// Enregistrement des commandes
let commandFolder = fs.readdirSync('./commands');

commandFolder.forEach(file => {
    if (file.endsWith('.js')) {
        utils.importFile(bot, `commands/${file}`);
    } else {
        utils.cycleDir(bot, `./commands/${file}`);
    }
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {

    } catch (e) {
        console.error(`Error when loading ${file} !`);
        console.error(e);
    }
}

bot.login(process.env.discordToken);

setInterval(function() {
	let game = ["TE surveiller ;)", "!help", "Fortnite", "Apex Legends", "s'admirer", "rigoler à mes blagues", "point faible ? Trop fort !"]
	let status = game[Math.floor(Math.random() * game.length)];
	bot.user.setActivity(status , {type : "PLAYING"});
}, 5000)

schedule.scheduleJob('*/10 * * * * *', async function(){
    await utils.generateNews(bot).then((resolve) => {
        let channel = bot.channels.cache.get('551673005689012229')
        if(FortniteData.news != channel.topic) {
            let embed = new Discord.MessageEmbed()
            .setTitle("Actualités Fortnite Battle Royale")
            .attachFiles([resolve])
            .setImage('attachment://brNews.gif')
            .setColor('#bf9322')
            .setTimestamp()
            channel.send(embed).then(message => {
                request({
                    method: 'POST',
                    url: `https://discord.com/api/v6/channels/${channel.id}/messages/${message.id}/crosspost`,
                    headers: {
                        "Authorization" : `Bot ${process.env.discordToken}`
                    }
                })
            })
            channel.setTopic(FortniteData.news)
        }
    })
});
