const Discord = require("discord.js");
const fs = require("fs");

const { generateNews } = require("../utils")

module.exports = {
    name: "news",
    async execute(message, args, bot, prefix) {
        message.channel.startTyping()
        let embed = new Discord.MessageEmbed()
        .setTitle("Actualités Fortnite Battle Royale")
        .setTimestamp()
        .setColor('#bf9322')
        if(args[0] == 'reload') {
            await generateNews().then((resolve) => {
                embed.attachFiles([resolve])
            })
        } else {
            embed.attachFiles(['./final/brNews.gif'])
        }
        embed.setImage('attachment://brNews.gif')
        .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true})
        message.channel.send(embed)
        message.channel.stopTyping()
    }
}
