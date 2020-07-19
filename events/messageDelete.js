const Discord = require("discord.js");
module.exports = (bot, message) => {
    const hook = new Discord.WebhookClient('715329479777583175', 'bCPRXYBK67vD_3EVc6kn6MXG4LGOkePPg65VegCrDBAyABTgibiHvVG7Eil0twYio72O');
    bot.guilds.cache.get("551394507007197194").fetchAuditLogs({limit: 1, type: 'MESSAGE_DELETE'})
    .then(audit => {
        var log = audit.entries.first() 
        sendLogs(log)
        //console.log(message.attachments)
    })
    var attach = new Map(message.attachments)
    let data = attach.keys()
    console.log(data)
    //console.log(message.attachments[attach.keys()])
    async function sendLogs(log) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Message supprimé")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(message.content)
        .addField("Salon", "<#"+message.channel.id+">", true)
        .addField("Auteur", "<@"+message.author.id+">\n`"+message.author.id+"`", true)
        if(message.author.id === log.target.id) embed.addField("Modérateur", `${log.executor}\n\`${log.executor.id}\``)
        if(data) {
            let text = `[${data[0].name}](${data[0].url})`
            let e = 1
            while(message.attachments.lenght != e) {
                e++
                text = text+`\n[${message.attachments[e].name}](${message.attachments[e].url})`
            }
            embed.addField("Fichier(s)", text)
        }
        embed.setColor("#d1310d")
        .setTimestamp()
        hook.send(embed)
    }
}