const Discord = require("discord.js");
module.exports = (bot, member) => {
  var msg = [
    `**${member.user.tag}** est allé(e) cueillir des fleurs.`,
    `NON !\n**${member.user.tag}** a appuyé(e) sur le bouton **Quitter le serveur**...`,
    `**${member.user.tag}** a quitté(e) le serveur.\nMinute ! C'était qui en fait !? :thinking:`,
    `1,2,... 8, 14,... C'est bien ce qu'il me semblait !\n**${member.user.tag}** a quitté(e) le serveur ! :sob:`,
    `**${member.user.tag}** est parti(e) ! Hourra !\nEnfin des vacances !!!`,
    `**${member.user.tag}** est passé(e) où ? Ah bah à pu ! :upside_down:`,
    ];
    let gb = msg[Math.floor(Math.random() * msg.length)];
    let embed = new Discord.MessageEmbed()
    .setTitle(member.user.username)
    .setColor('D0021B')
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .setDescription(gb)
    .setTimestamp()
    bot.channels.cache.get("729283396500586538").send(embed)
}
