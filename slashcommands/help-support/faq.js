const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'faq',
    description: 'Tells users to check out our FAQ channel and docs to get their simple questions answered.',
    usage: `/faq [user]`,
    botSpamOnly: 1,
    options: [
        {
            name: 'user',
            description: 'User to send FAQ info to',
            type: 6,
            required: false
        }
    ],
    execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Discord Server')
                    .setStyle(5)
                    .setURL('https://discord.gg/zgkMsNcBPT')
            );

        const user = interaction.options.getUser('user') || interaction.user;
        
        try {
            user.send({ 
                content: `Hey, ${user.username}! Please check out our support channels as we have a lot of questions answered in those places. If it isn't answered there then you may leave your question here for others to help you answer. Thank you!`,
                components: [row] 
            });
            interaction.reply({ content: `📨 Hey, ${user} I just sent you a DM with helpful info! Please check it!`, flags: 64 });
        } catch (error) {
            interaction.reply({ content: `${user}, please check out our support channels as we have a lot of questions answered in those places. If it isn't answered there then you may leave your question here for others to help you answer. Thank you!`, flags: 64 });
        }
    }
};
