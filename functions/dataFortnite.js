const axios = require("axios");

const news = require('./fortnite.js');

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
            await news.generateGifNews(bot, response.data.battleroyalenews)
            await news.emergencyMessage(bot, response.data.emergencynotice)
            return
        })
    },
}