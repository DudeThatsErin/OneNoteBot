const { EmbedBuilder } = require('discord.js');
const color = require('../../config/embed.json');

module.exports = {
    name: 'avatar',
    description: 'Displays a user\'s profile picture as well as links to view them in JPEG, PNG, and WEBP.',
    usage: `/avatar or /avatar [other person\'s username]`,
    example: `/avatar or /avatar @DudeThatsErin`,
    botSpamOnly: 1,
    options: [
        {
            name: 'user',
            description: 'Who\'s avatar would you like to see?',
            required: false,
            type: 6
        }
    ],
    execute(interaction) {

        const person = interaction.options.getUser('user');

        const myEmbed = new EmbedBuilder()
            .setColor(parseInt(color.blue_color, 16))
            .setTitle('Your Avatar')
            .addFields(
                {
                    name: 'PNG',
                    value: interaction.user.displayAvatarURL({ extension: 'png' })
                },
                {
                    name: 'JPEG',
                    value: interaction.user.displayAvatarURL({ extension: 'jpeg' })
                },
                {
                    name: 'WEBP',
                    value: interaction.user.displayAvatarURL({ extension: 'webp'})
                }
                )
            .setThumbnail(interaction.user.displayAvatarURL({ extension: 'png'}))
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}`, icon_url: interaction.user.displayAvatarURL({ extension: 'png' })});

        if(!person) return interaction.reply({ embeds: [myEmbed], flags: 64 });

        const theirEmbed = new EmbedBuilder()
            .setColor(parseInt(color.blue_color, 16))
            .setTitle(`${person.username}'s Avatar`)
            .addFields(
                {
                    name: 'PNG',
                    value: person.displayAvatarURL({ extension: 'png' })
                },
                {
                    name: 'JPEG',
                    value: person.displayAvatarURL({ extension: 'jpeg' })
                },
                {
                    name: 'WEBP',
                    value: person.displayAvatarURL({ extension: 'webp'})
                }
            )
            .setThumbnail(person.displayAvatarURL({extension: 'png'}))
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}`, icon_url: interaction.user.displayAvatarURL({ extension: 'png'}) });

        interaction.reply({ embeds: [theirEmbed], flags: 64 });

    }
}