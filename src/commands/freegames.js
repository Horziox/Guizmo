const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Command = require('../class/Command');

module.exports = new Command({
    name: "freegames",
    async execute(client, interaction) {
        await axios({
            method: "GET",
            url: "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=fr-FR&country=FR"
        })
        .then(function(response) {
            const data = response.data;
    
            let final = [];
    
            for(const game of data.data.Catalog.searchStore.elements) {
                if(game.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]?.discountSetting.discountType === "PERCENTAGE") {
                    const embed = new MessageEmbed()
                    .setTitle(game.title)
                    .setURL(`https://www.epicgames.com/store/fr/p/${game.urlSlug}`)
                    .setDescription(game.description)
                    .setImage(game.keyImages.find(img => img.type === "OfferImageWide").url)
                    .addField("Offre", `Jeu gratuit (prix originel à ${game.price.totalPrice.fmtPrice.originalPrice})\nOffre du <t:${Date.parse(game.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]?.startDate).toString().slice(0, -3)}> au <t:${Date.parse(game.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]?.endDate).toString().slice(0, -3)}>`)
                    .setColor("RANDOM")
                    final.push(embed)
                }
            }
    
            return interaction.reply({ embeds: final });
        })
    }
})