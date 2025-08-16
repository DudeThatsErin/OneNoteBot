const connection = require('../../database.js');

module.exports = {
    name: 'unthanks',
    usage: `/unthanks <@username or ID>`,
    example: '/unthanks @username',
    description: 'Allows mods to remove a thanks from a user.',
    modOnly: 1,
    options: [
        {
            name: 'user',
            description: 'Who would you like to remove a thank from?',
            required: true,
            type: 6
        }
    ],
    async execute(interaction) {
        const mention = interaction.options.getUser('user');
        const user = mention.id;

        try {
            await connection.run(
                `DELETE FROM Thanks WHERE user = ? ORDER BY id DESC LIMIT 1`,
                [user]
            );

            const result = await connection.get(
                `SELECT SUM(thanks) as total FROM Thanks WHERE user = ?`,
                [user]
            );
            const total = result?.total || 0;

            interaction.reply({content: `I have removed a thanks from ${mention.username}! They now have ${total} thanks. Use the \`/thanks-leaderboard\` command to see where everyone stands.`, flags: 64});
        } catch (error) {
            console.error('Error with unthanks command:', error);
            interaction.reply({ content: 'There was an error processing the unthanks. Please try again later.', flags: 64 });
        }
    }
};
