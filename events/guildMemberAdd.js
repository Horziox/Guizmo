const Discord = require("discord.js");
module.exports = (bot, member) => {
  var msg = [
    `Oh !\nUn(e) ${member.user} vient d\'apparaitre sur le serveur !:scream:`,
    `Hey salut !:partying_face:\nJ'espère que tu as pensé(e) à la pizza ${member.user} ?:sweat_smile:`,
    `Hé ! Écoutez ! ${member.user} nous a rejoint !`,
    `Où est ${member.user} ? Dans le serveur !`,
    `**Swoooosh** !!! ${member.user} vient juste d'atterrir ! 🚀`,
    `${member.user} vient de rejoindre le serveur ! \\o/`,
    `Bah tiens mais qui voilage ? Petit(e) ${member.user}... :musical_note:`,
    `La légende disait donc vraie !!?\n${member.user} viens juste de rejoindre le serveur ! :scream:`
  ];
  member.roles.add("729242344733278249")
  let bvn = msg[Math.floor(Math.random() * msg.length)];
  let embed = new Discord.MessageEmbed()
  .setTitle(member.user.username)
  .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
  .setDescription(bvn)
  .setColor("7ED321")
  .setTimestamp()
  bot.channels.cache.get("729283396500586538").send(embed)
}
