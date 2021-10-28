const { join } = require('path');

const Client = require('./class/Client');
const client = new Client({
    intents: [ 'GUILDS', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'GUILD_INTEGRATIONS' ]
})

const handler = require('./handler');

require("dotenv").config();

(async () => {
    await client.registerCommands(join(__dirname, 'commands'));

    client.on("interactionCreate", interaction => {
        if(interaction.isCommand()) {
            handler.cmds(client, interaction);
        }
        else if(interaction.isSelectMenu()) {
            if(interaction.customId === "select_roles") {
                handler.roles(client, interaction)
            };
        }
        return
    })

    client.on('guildMemberAdd', member => {
        const guild = client.guilds.cache.get('551394507007197194');
        const invite = guild.roles.cache.get('729242344733278249');
        const barre = guild.roles.cache.get('829810272231358486');
        return member.roles.add([ invite, barre ]);
    })
    
    client.on('ready', () => console.log(`${client.user.tag} is online!`))
    
    await client.login(process.env.discordToken);
})()

/*setInterval(function() {
	let game = [ "TE surveiller ;)", "Fortnite", "Apex Legends", "s'admirer", "rigoler à mes blagues", "point faible ? Trop fort !", "Rocket League", ]
	let status = game[Math.floor(Math.random() * game.length)];
	bot.user.setActivity(status , { type: "PLAYING" });
}, 5000)*/