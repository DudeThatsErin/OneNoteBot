module.exports = {
    name: 'wiki',
    description: 'Links to our wiki',
    usage: '/wiki',
    botSpamOnly: 1,
    execute(interaction) {
        interaction.reply({ 
            content: 'Check out our wiki for helpful information and guides: https://onenote-wiki.vercel.app',
            flags: 64 
        });
    }
}