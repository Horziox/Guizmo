const Discord = require("discord.js");
const Client = require("../class/Client");

module.exports = {
    name: "info",
    /**
     * @param {Client} client
     * @param {Discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {

        const embed = new Discord.MessageEmbed()
        .setColor("#bf9322")
        .setTimestamp()
        .setFooter(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))

        if(interaction.options.getSubcommand() === 'membre') {
            const user = interaction.options.getUser('cible') || interaction.user;
            await user.fetch();
            const member = client.guilds.cache.get(interaction.guild.id).members.cache.get(user.id);

            embed.setTitle("Informations membre")
            if(member.nickname != null) embed.addField("Surnom", member.nickname, true)
            .addField("Compte", `${user.tag}\n\`${user.id}\``, true)
            .addField("Création compte", `<t:${user.createdTimestamp.toString().substring(0, 10)}:R>`)
            .addField("Serveur rejoint", `<t:${member.joinedTimestamp.toString().substring(0, 10)}:R>`, true)

            for(const activity of member.presence.activities) {
                if(activity.type == "CUSTOM") {
                    embed.addField("Statut personnalisé", `${activity.emoji.id === undefined ? activity.emoji.name : "" } ${activity.state}`)
                }
                else if(activity.type === "LISTENING") {
                    if(activity.name === "Spotify") {
                        embed.addField(`Écoute ${activity.name}`, `[${activity.details}](https://open.spotify.com/track/${activity.syncId})\nDe ${activity.state}`)
                    }
                }
                else if(activity.type === "PLAYING") {
                    if(activity.name === "Fortnite") {
                        embed.addField(`Joue à ${activity.name}`, `${activity.details}\n${activity.state} (${activity.party.size[0]} sur ${activity.party.size[1]})`)
                    }
                }
            }

            embed.setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setImage(user.bannerURL({ dynamic: true }))
        }
        else if(interaction.options.getSubcommand() === 'bot') {
            embed.setTitle(client.user.username + " Informations")
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`Salut !\nJe suis ${client.user.username}, un bot multi-fonctions développé pour vous rendre service !\n[Code source](https://github.com/Horziox/Guizmo) !`)
            .addField("Versions Logiciel/Librairies", `NodeJS : \`\`${process.version}\`\`\nDiscord.js : \`\`${Discord.version}\`\``, true)
            .addField("Utilisation Ressources", "OS : "+process.platform+"\nRAM : ``"+`${(process.memoryUsage().heapUsed/1000000).toFixed(2)}`+" Mo``", true)
            .addField("Ping", `Bot : ${Date.now() - interaction.createdTimestamp}`+"ms", true)
        }
        else {
            const guild = await interaction.guild.fetch();
            
            embed.setTitle(guild.name)
            .addField("Propriétaire", `<@${guild.ownerId}>`, true)
            .addField("Identifiant", "`"+guild.id+"`")
            .addField("Membres", `${guild.memberCount}`, true)
            .addField("Roles", `${guild.roles.cache.size}`, true)
            .addField("Salons", `${guild.channels.cache.size}`, true)
            .addField("Boosts", `Niveau ${guild.premiumTier.replace('TIER_', '')} (${guild.premiumSubscriptionCount} boosts)`)
            .addField("Création", `<t:${guild.createdTimestamp.toString().substring(0, 10)}:R>`)

            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setImage(guild.bannerURL())
        }

        return interaction.reply({ embeds: [ embed ] });
    }
}
