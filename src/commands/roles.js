const Discord = require("discord.js");

const Command = require("../class/Command");

module.exports = new Command({
    name: "role",
    async execute(client, interaction) {
        const guild = client.guilds.cache.get('551394507007197194');
        const member = await guild.members.cache.get(interaction.user.id).fetch();

        const ids = [ '632512461026754562', '632512397265076264', '632513604339367956', '762220248404328488', ];
        let roles = []
        for(const id of ids) {
            const role = guild.roles.cache.get(id);
            const hasRole = member.roles.cache.has(id);

            roles.push({
                label: role.name,
                value: role.id,
                default: hasRole
            })
        };

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId("select_roles")
                    .setPlaceholder("Sélectionnez vos rôles")
                    .setMinValues(0)
                    .setMaxValues(ids.length)
                    .addOptions(roles)
            )
        return interaction.reply({ content: "Sélectionnez/déselectionnez vos rôles !", components: [ row ], ephemeral: true });
    }
});