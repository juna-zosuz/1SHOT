const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "status",
        category: "fun",
        noalias: [""],
        description: "Shows status of users",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {

        let user = message.mentions.users.first() || message.author;
        if (!user.presence.activities.length) {
        const sembed = new MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL())
            .setColor("GREEN")
            .setThumbnail(user.displayAvatarURL())
            .addField("**No Status**", 'This user does not have any custom status!')
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
          message.channel.send(sembed)
          return undefined;
        }

        user.presence.activities.forEach((activity) => {

            if (activity.type === 'CUSTOM_STATUS') {
                const embed = new MessageEmbed()
                    .setAuthor(user.username, user.displayAvatarURL())
                    .setColor("GREEN")
                    .addField("**Status**", `Custom status ${activity.emoji || "No Emoji"} | ${activity.state}`)
                    .setThumbnail(user.displayAvatarURL())
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                message.channel.send(embed)
            }
            else if (activity.type === 'PLAYING') {
                let name1 = activity.name
                let details1 = activity.details
                let state1 = activity.state
                let image = user.displayAvatarURL()

                const sembed = new MessageEmbed()
                    .setAuthor(`${user.username}'s Activity`)
                    .setColor(0xFFFF00)
                    .setThumbnail(image)
                    .addField("**Type**", "Playing")
                    .addField("**App**", `${name1}`)
                    .addField("**Details**", `${details1}`)
                    .addField("**Working on**", `${state1}`)
                message.channel.send(sembed);
            }
            else if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {

                let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
                let trackURL = `https://open.spotify.com/track/${activity.syncID}`;

                let trackName = activity.details;
                let trackAuthor = activity.state;
                let trackAlbum = activity.assets.largeText;

                const embed = new MessageEmbed()
                    .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                    .setColor("GREEN")
                    .setThumbnail(trackIMG)
                    .addField('Song Name', trackName, true)
                    .addField('Album', trackAlbum, true)
                    .addField('Author', trackAuthor, false)
                    .addField('Listen to Track', `${trackURL}`, false)
                    .setFooter(message.member.displayName, message.author.displayAvatarURL())
                message.channel.send(embed);
            }
        })
    }
}