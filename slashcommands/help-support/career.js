const Discord = require('discord.js');
const config = require('../../config/embed.json');
const ee = require('../../config/embed.json');

module.exports = {
    name: 'career',
    description: 'Allows users to get information on how to get careers in the IT field.',
    usage: `/career`,
    execute(interaction) {
        let embed = new Discord.EmbedBuilder()
            .setColor(parseInt(config.dark_blue_color, 16))
            .setTitle('For a career or internship in computer programming or similar tech-related fields, consider some of the following websites...')
            .addFields(
                {
                    name: 'You can use these sites as an employer or to get hired by an employer!',
                    value: `- Dice: https://dice.com/\n- Glassdoor: https://glassdoor.com/\n- Google Jobs: https://jobs.google.com\n- Gun.io: https://gun.io\n- Indeed: https://indeed.com\n- LinkedIn: https://linkedin.com\n- Monster: https://monster.com\n- TripleByte: https://triplebyte.com\n- ZipRecruiter: https://ziprecruiter.com`
                },
                {
                    name: 'Reminders',
                    value: `For freelancing positions, use the command \`/freelance\` in <#433962402292432896>.`
                }
            )
            .setFooter({ text: 'If you know of other places you can use, please let us know by using ++suggest!', iconURL: ee.footericon });
        interaction.reply({ embeds: [embed] });
    }
}