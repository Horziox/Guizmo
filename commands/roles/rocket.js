const Discord = require("discord.js");

module.exports = {
    name: "rocket",
    execute(message, args, bot, prefix) {
        if(message.channel.id != '551686769838391306') return message.delete()
        let id = "762220248404328488"
        let user = bot.guilds.cache.get("551394507007197194").members.cache.get(message.author.id)
        let info = user.roles.cache.has(id)
        let role = bot.guilds.cache.get("551394507007197194").roles.cache.get(id)
        if(!info) {
            user.roles.add(role.id)
            message.reply(`a rejoint le stadium de **${role.name}** !`)
        } else {
            user.roles.remove(role.id)
            message.reply(`est sorti(e) du stadium de **${role.name}**.`)
        }
    }
}