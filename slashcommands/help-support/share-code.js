module.exports = {
    name: 'share-code',
    description: 'Tells people to share their code properly.',
    usage: `/share-code [user]`,
    options: [
        {
            name: 'user',
            description: 'Who needs help sharing code?',
            required: false,
            type: 6
        }
    ],
    execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        
        try {
            user.send({ content: `Hey, ${user}! Please share your code properly formatted with backticks. If it is too long for Discord, please upload it to a place like CodeShare.io, GitHub Gist, or Pastebin and share the link to the code here so we can take a look at it. Thank you!` });
            interaction.reply({ content: `📨 Hey, I just sent ${user} a DM about sharing code properly!`, flags: 64 });
        } catch (error) {
            interaction.reply({ content: `${user}, please share your code properly formatted with backticks. If it is too long for Discord, please upload it to a place like CodeShare.io, GitHub Gist, or Pastebin and share the link to the code here so we can take a look at it. Thank you!`, flags: 64 });
        }
    }
};
