const Command = require("../class/Command");

module.exports = new Command({
    name: "ping",
    execute(client, interaction) {
        return interaction.reply(`:ping_pong: ${client.ws.ping}ms.`);
    }
});