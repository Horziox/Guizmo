const axios = require("axios");
const Discord = require('discord.js');

const news = require('./news.js');
const shop = require('./shop.js')

module.exports = {
    async reloadData(bot) {
        axios({
            method: 'get',
            url: 'https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game',
            headers: { 
                'Accept-Language': 'fr-FR', 
            }
        }).then(async function(response) {
            if(response.status !== 200) return
            var channel = bot.channels.cache.get("551673005689012229")
            var topic = channel.topic.split(" ")

            if(response.data.battleroyalenews["jcr:baseVersion"] !== topic[0] && data.news.motds.length !==0) {
                await news.generateGifNews(response.data.battleroyalenews).then(async (value) => {
                    let attachement = new Discord.MessageAttachment(value)
                    await channel.send(attachement).then(message => {
                        axios({
                            method: 'post',
                            url: `https://discord.com/api/v6/channels/551673005689012229/messages/${message.id}/crosspost`,
                            headers: {
                                "Authorization" : `Bot ${process.env.discordToken}`
                            }
                        })
                    })
                    await channel.setTopic(data["jcr:baseVersion"]+" "+topic[1])
                })
            }
            
            await news.emergencyMessage(bot, response.data.emergencynotice)
            return
        })
    },

    async reloadShop(bot) {
        var channel = bot.channels.cache.get("570353056362004481")
        axios({
            method: 'get',
            url: 'https://fortnite-api.com/v2/shop/br/combined?language=fr',
        }).then(async function(response) {
            if(response.status !== 200) return
            await shop.genratateShop(response.data.data).then(async (value) => {
                let attachement = new Discord.MessageAttachment(value)
                channel.send(attachement)
            })
            return
        })
    },
}