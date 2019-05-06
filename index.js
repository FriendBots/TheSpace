const { RichEmbed } = require('discord.js'); //importind embeds from discord.js

module.exports = {  //starting of a commanf handler
    name: 'giveaway',  //command name
    description: 'does a giveaway',  //command description
    async execute(client, message, args) {  //command execution
        var item = "";
        var time;
        var winnerCount;

        for (var i = 3; i < args.length; i++){
            item += (args[i] + " ");
        }
        winnerCount = Number(args[1]);
        time = Number(args[2]);
        var embed = new RichEmbed();
        embed.setDescription(item);
        var embedSent = await message.channel.send(embed);
        embedSent.react("🎉");
        setTimeout(function() {
            var peopleReacted = embedSent.reactions.get("🎉").users;
            var index = Math.floor(Math.random() * peopleReacted.length);
            var winners = [];
            var winnerMessage = "";
            for (var i = 0; i < winnerCount; i++){
                winners.push(peopleReacted[index]);
                index = Math.floor(Math.random() * peopleReacted.length);
            }
            for (var i = 0; i <winners.length; i++){
                if (winners[i].id == client.user.id){
                    winners[i].slice(i, 1);
                    continue;
                }
                winnerMessage += (winners[i].toString() + " ");
            }
            var haveHas = "has";
            if (winners.length == 1){
                haveHas = "has";
            }
            else {
                haveHas = "have";
            }
            message.channel.send(winnerMessage + " " + haveHas + `won ${item}`);
        }, time * 1000);
    },
};
//command ends
