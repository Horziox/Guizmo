const Discord = require('discord.js');
const Client = require('./class/Client');

module.exports = {

    /**
     * @param {Client} client
     * @param {Discord.CommandInteraction} interaction 
    */
    async cmds(client, interaction) {
        const command = client.commands.get(interaction.commandName);
        if(!command) return;

        try {
            command.execute(client, interaction)
        }
        catch (error) {
            interaction.reply('Oups...\nUne erreur est arrivée !\n```javascript\n' + error + '```');
        }
        return
    },

    /**
     * @param {Client} client
     * @param {Discord.SelectMenuInteraction} interaction 
    */
    async roles(client, interaction) {
        const ids = [ '632512461026754562', '632512397265076264', '632513604339367956', '762220248404328488', ];
        const guild = client.guilds.cache.get('551394507007197194');
        const member = await guild.members.cache.get(interaction.user.id).fetch();

        let result = "";

        for(const id of ids) {
            const role = guild.roles.cache.get(id);

            if(interaction.values.includes(id)) {
                if(!member.roles.cache.has(id)) {
                    await member.roles.add(id)
                    result += `**${role.name}** ajouté\n`;
                }
            }
            else {
                if(member.roles.cache.has(id)) {
                    await member.roles.remove(id)
                    result += `**${role.name}** retiré\n`;
                }
            }
        }

        return interaction.reply({ content: result, ephemeral: true });
    }
}