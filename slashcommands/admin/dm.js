const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const bot = require('../../config/bot.json');
const color = require('../../config/embed.json');

module.exports = {
    name: 'dm',
    description: 'Sends an official embed to a user.',
    usage: `/dm <user> <message>`,
    ownerOnly: 1,
    options: [
        {
            name: 'user',
            description: 'User to send DM to',
            type: 6,
            required: true
        },
        {
            name: 'message',
            description: 'Message to send',
            type: 3,
            required: true
        }
    ],
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const message = interaction.options.getString('message');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Discord Server')
                    .setStyle(5)
                    .setURL(bot.inviteLink)
            );

        const dmEmbed = new EmbedBuilder()
            .setColor(parseInt(color.deep_purple_color, 16))
            .setTitle(`You received a DM from Erin's Helper Bot`)
            .setDescription(`${interaction.user} sent you the following message:\n\`\`\`${message}\`\`\`\n\nIf you have any questions, please send a message to <@575252669443211264>.`)
            .setTimestamp()
            .setFooter({ text: 'This is not an official warning.', iconURL: bot.avatar, timestamp: new Date() });

        try {
            await user.send({ content: `Hey, ${user.username}!`, embeds: [dmEmbed], components: [row] });
            interaction.reply({ content: `✅ Successfully sent DM to ${user.username}!`, flags: 64 });
        } catch (error) {
            console.error('Error sending DM:', error);
            interaction.reply({ content: `❌ Failed to send DM to ${user.username}. They may have DMs disabled.`, flags: 64 });
        }
    }
};
