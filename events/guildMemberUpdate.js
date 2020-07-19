const Discord = require("discord.js")
module.exports = (bot, oldMember, newMember) => {
    const hook = new Discord.WebhookClient('715329479777583175', 'bCPRXYBK67vD_3EVc6kn6MXG4LGOkePPg65VegCrDBAyABTgibiHvVG7Eil0twYio72O');
    let embed = new Discord.MessageEmbed()

    bot.guilds.cache.get("551394507007197194").fetchAuditLogs()
        .then(audit => {
            console.log(audit.entries.first().action)
            if(audit.entries.first().action == 'MEMBER_UPDATE') {
               if(audit.entries.first().changes[0].key == 'nick') {
                    embed.setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL({dynamic: true}))
                    .setTitle("Changement de surnom")
                    .setTimestamp()
                    if(audit.entries.first().changes[0].old == undefined) embed.addField("Ancien surnom", oldMember.user.username, true)
                    else embed.addField("Ancien surnom", audit.entries.first().changes[0].old, true)
                    if(audit.entries.first().changes[0].new == undefined) embed.addField("Nouveau surnom", oldMember.user.username, true)
                    else embed.addField("Nouveau surnom", audit.entries.first().changes[0].new, true)

                    if(audit.entries.first().target.id != audit.entries.first().executor.id) embed.addField("Changé par", audit.entries.first().executor+"\n`"+audit.entries.first().executor.id+"`")
               }
            } else if(audit.entries.first().action == 'MEMBER_ROLE_UPDATE') {
                if(audit.entries.first().changes[0].key == '$add') {
                    embed.setTitle("Nouveau Rôle") 
                } else {
                    embed.setTitle("Rôle supprimé")
                }
                embed.setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL({dynamic: true}))
                .addField('Role', `<@&${audit.entries.first().changes[0].new[0].id}>`)
                if(oldMember.user.id != audit.entries.first().executor.id) embed.addField("Modérateur", audit.entries.first().executor)
                embed.setColor("#d1310d")
                .setTimestamp()
            }  
        })
        return hook.send(embed)
}