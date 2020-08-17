const Discord = require("discord.js");

module.exports = {
    name: "pfc",
    execute(message, args, bot, prefix) {
        let pfc = ["pierre","feuille","ciseaux"]
        let random = pfc[Math.floor(Math.random() * pfc.length)];
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .addField("Toi", args[0].toUpperCase(), true)
        .addField("Moi", random.toUpperCase(), true)
        .setTimestamp()
        .setColor("#bf9322")

        let resE = ["Ouais égalité, t'as de la chance, c'est tout, rien de plus...","**Arrêtes de me copier !!!** :face_with_symbols_over_mouth:","Mouais... Je t'ai à l'oeil ! :eyes:"]
        let randomEqu = resE[Math.floor(Math.random() * resE.length)];

        let resV = ["Ahahaha !!! T'es trop null(e) ! :rofl:","Tu veux que je te dise ?\nPoint faible ? Trop fort écoutes, c'est comme ça, j'y peux rien ! ^^","Je savais que t'allais jouer "]
        let randomVic = resV[Math.floor(Math.random() * resV.length)];

        let resD = ["Mais arrêtes de tricher !!!","T'as juste eu de la chance, calme toi... :triumph:","Je savais que t'allais jouer "]
        let randomDef = resD[Math.floor(Math.random() * resD.length)];

        if(args[0].toLowerCase() === random) {
            embed.addField("Égalité", randomEqu)
        } else if(args[0].toLowerCase() === "pierre" && random === "feuille") {
            embed.addField("Tu as perdu", randomVic)
        } else if(args[0].toLowerCase() === "pierre" && random === "ciseaux") {
            embed.addField("Tu as gagné", randomDef)
        } else if(args[0].toLowerCase() === "feuille" && random === "pierre") {
            embed.addField("Tu as gagné", randomDef)
        } else if(args[0].toLowerCase() === "feuille" && random === "ciseaux") {
            embed.addField("Tu as perdu", randomVic)
        } else if(args[0].toLowerCase() === "ciseaux" && random === "pierre") {
            embed.addField("Tu as perdu", randomVic)
        } else if(args[0].toLowerCase() === "ciseaux" && random === "feuille") {
            embed.addField("Tu as gagné", randomDef)
        }
        else {
            return message.reply("essaie pas de tricher !\nJe sais jouer à pfc, c'est soit Pierre, soit Feuille ou soit Ciseaux et rien d'autre ! <a:shakeeyes:729436288599720028>")
        }
        message.channel.send(embed)
    }
}
