const connection = require('../../database.js');
const { getServerConfig } = require('../../utils/serverConfig');

module.exports = {
    name: 'clearsuggs',
    description: 'Emptys the Suggestion Database.',
    usage: `/clearsuggs`,
    modOnly: 1,
    async execute(interaction) {

        const serverConfig = getServerConfig(interaction.guild.id);
        if (!serverConfig) {
            return interaction.reply({content: 'This command is not configured for this server.', flags: Discord.MessageFlags.Ephemeral});
        }

        connection.query(`TRUNCATE TABLE Suggs;`);
        const fetchedChannel = interaction.guild.channels.cache.get(serverConfig.suggestionsChannelId);
        fetchedChannel.bulkDelete(99, true);

        interaction.reply({content: 'I have deleted everything from the server AND the database! If there are any messages left, that is because they are older than 14 days old.'})

    }
};