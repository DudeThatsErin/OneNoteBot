const Discord = require('discord.js');
const config = require('../../config/embed.json');
const connection = require('../../database.js');

module.exports = {
    name: 'thanks-leaderboard',
    description: 'This gives users the ability to see the top 10 users on the leaderboard.',
    usage: `/thanks-leaderboard`,
    async execute (interaction, client) {
        let author = interaction.user.id;
        let aUsername = interaction.user.username;

        let userNames = '';
        let points = '';

        try {
            const userThanks = await connection.get(
                `SELECT SUM(thanks) as total FROM Thanks WHERE user = ?`,
                [author]
            );

            const top10 = await connection.all(
                `SELECT user, SUM(thanks) AS total FROM Thanks GROUP BY user ORDER BY total DESC LIMIT 10`
            );

            if (!top10 || top10.length === 0) {
                return interaction.reply({content: 'No one is on the leaderboard yet.', flags: 64});
            }

            for (let i = 0; i < top10.length; i++) {
                const user = top10[i].user;
                let member = await client.users.fetch(user).catch(err => {
                    console.log('Error fetching user:', err);
                    return { username: 'Unknown User' };
                });
                let username = member.username;

                userNames += `${i + 1}. ${username}\n`;
                points += `${top10[i].total}\n`;
            }

            const userTotal = userThanks?.total || 0;

            let embed = new Discord.EmbedBuilder()
                .setTitle('Thanks Leaderboard')
                .setColor(parseInt(config.gold_color, 16))
                .addFields(
                    [{name: `Top 10`, value: userNames, inline: true},
                    {name: 'Thanks', value: points, inline: true},
                    {name: 'Your Thanks', value: `${aUsername}, you currently have \`${userTotal}\` thank(s).`}]
                )
                .setFooter({text:'Thanks for being part of our community!'});

            interaction.reply({ embeds: [embed], flags: 64 });

        } catch (error) {
            console.error('Error with thanks leaderboard:', error);
            interaction.reply({ content: 'There was an error getting the leaderboard. Please try again later.', flags: 64 });
        }
    }
};
