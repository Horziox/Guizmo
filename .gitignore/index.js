const Discord = require("discord.js");
const fs = require("fs");
const utils = require("./utils.js");

const bot = new Discord.Client();

bot.commands = new Discord.Collection();

// Enregistrement des évènements
console.info("=====================[START REGISTERING EVENTS]=====================");
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
console.info("=====================[START REGISTERING COMMANDS]=====================");
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