const Discord = require("discord.js");

module.exports = {
    name: "help",
    execute(message, args, bot, prefix) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Liste de mes commandes")
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor('#bf9322')
        .addField("Générales", `**${prefix}help** Affiche ce message ! :tada:\n**${prefix}info** Affiche des informations sur le serveur, toi, un utilisateur et surtout MOI !\n**${prefix}pfc** Pierre, feuille ciseau ? :eyes:`)
        .addField("Roles", `Donnez vous ou retirez vous manuellement des rôles : \n**${prefix}apex**\n**${prefix}fortnite**\n**${prefix}minecraft**\n**${prefix}rocket**`)
        .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        message.channel.send(embed)
    }
}
