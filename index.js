const Discord = require("discord.js");
const fs = require("fs");
const utils = require("./utils.js");
const schedule = require('node-schedule');
const bot = new Discord.Client();

require("dotenv").config()

const data = require('./functions/dataFortnite.js');

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
    await data.reloadData(bot)
});


schedule.scheduleJob('1 0 2 * * *', async function(){
    await data.reloadShop(bot)
});