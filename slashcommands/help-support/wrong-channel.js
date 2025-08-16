module.exports = {
    name: 'wrong-channel',
    description: 'Tells people to ask in a different channel.',
    usage: `/wrong-channel [user]`,
    options: [
        {
            name: 'user',
            description: 'Who needs to be redirected?',
            required: false,
            type: 6
        }
    ],
    execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        interaction.reply({ 
            content: `Hey, ${user}! This isn't the correct channel for your question. Please check our channel list and repost in a different channel. Thank you!`,
            flags: 64
        });
    }
};
