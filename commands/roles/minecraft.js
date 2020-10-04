const Discord = require("discord.js");

module.exports = {
    name: "minecraft",
    execute(message, args, bot, prefix) {
        if(message.channel.id != '551686769838391306') return message.delete()
        let id = "632513604339367956"
        let user = bot.guilds.cache.get("551394507007197194").members.cache.get(message.author.id)
        let info = user.roles.cache.has(id)
        let role = bot.guilds.cache.get("551394507007197194").roles.cache.get(id)
        if(!info) {
            user.roles.add(role.id)
            message.reply(`a rejoint l'univers de' **${role.name}**.`)
        } else {
            user.roles.remove(role.id)
            message.reply(`a quitté le monde cubique... (spoiler : **${role.name}**)`)
        }
    }
}
