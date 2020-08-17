const Discord = require("discord.js");
const fs = require("fs");

const { generateNews } = require("../../utils.js")

module.exports = {
    name: "news",
    async execute(message, args, bot, prefix) {
        message.channel.startTyping()
        await generateNews().then((resolve) => {
            let embed = new Discord.MessageEmbed()
            .setTitle("Actualités Fortnite Battle Royale")
            .setTimestamp()
            .setColor('#bf9322')
            .attachFiles([resolve])
            .setImage('attachment://brNews.gif')
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(embed)
        })
        message.channel.stopTyping()
    }
}
