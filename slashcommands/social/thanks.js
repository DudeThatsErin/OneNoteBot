const connection = require('../../database.js');

module.exports = {
    name: 'thanks',
    usage: `/thanks <@username or ID>`,
    example: `/thanks @username`,
    description: 'Allows our users to thank other members for their help.',
    data: {
        name: 'thanks',
        description: 'Allows our users to thank other members for their help.',
        options: [
            {
                name: 'user',
                description: 'Who would you like to thank?',
                required: true,
                type: 6
            }
        ]
    },
    async execute(interaction, client) {
        const mention = interaction.options.getUser('user');
        const thankee = mention.id;
        const thanker = interaction.user.id;

        if (mention.bot || thankee === thanker || thankee === client.user.id) {
            interaction.reply({content: 'It looks like you were trying to thank yourself or a bot. That is not the appropriate way to use this system.', flags: 64});
            return;
        }

        try {
            await connection.run(
                `INSERT INTO Thanks (userId, user, thanks) VALUES (?, ?, ?)`,
                [thanker, thankee, 1]
            );

            const results = await connection.get(
                `SELECT SUM(thanks) as total FROM Thanks WHERE user = ?`,
                [thankee]
            );
            const total = results?.total || 1;

            interaction.reply({ content: `You thanked ${mention.username}! They now have ${total} thanks. Use the \`/thanks-leaderboard\` command to see where you stand.`, flags: 64});
        } catch (error) {
            console.error('Error with thanks command:', error);
            interaction.reply({ content: 'There was an error processing your thanks. Please try again later.', flags: 64 });
        }
    }
};
