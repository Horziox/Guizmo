const Discord = require("discord.js");
const axios = require("axios");

const { generateGifNews } = require('../../functions/news.js')

module.exports = {
    name: "news",
    async execute(message, args, bot, prefix) {

        message.channel.startTyping()

        var request = await axios({
            method: 'get',
            url: 'https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game',
            headers: { 
                'Accept-Language': 'fr-FR', 
            }
        })
        
        if(request.data.battleroyalenews.news.motds.length == 0) {
            await message.channel.stopTyping()
            return message.reply("il n'y a actuellement aucune actualité en jeu")
        }

        generateGifNews(request.data.battleroyalenews).then(async (value) => {
            let embed = new Discord.MessageEmbed()
            .setTitle("Actualités Fortnite Battle Royale")
            .setColor('#bf9322')
            .attachFiles(value)
            .setImage('attachment://br-news.gif')
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            await message.channel.stopTyping()
            return await message.channel.send(embed)
        })
    }
}
