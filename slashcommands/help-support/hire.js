module.exports = {
    name: 'hire',
    description: 'Refers people to the appropriate channel to hire someone.',
    usage: `/hire [user]`,
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
            content: `Hey, ${user}! It looks like you are requesting for someone to help you individually. Please check our support channels for assistance or consider posting your question there for community help.`,
            flags: 64
        });
    }
};
