const Discord = require("discord.js");
const Client = require("../class/Client");

module.exports = {
    name: "ping",
    /**
     * @param {Client} client
     * @param {Discord.CommandInteraction} interaction 
     */
    execute(client, interaction) {
        return interaction.reply(`:ping_pong: ${Date.now() - interaction.createdTimestamp}ms.`);
    }
}