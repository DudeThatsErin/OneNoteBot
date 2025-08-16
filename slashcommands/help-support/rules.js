const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const rulesLink = 'https://quartznotes.com';
const color = 0x1a1a1a;
//Rule Embeds
const rule1 = {
  color: color,
  title: 'Be Respectful & Helpful',
  url: rulesLink,
  thumbnail: {
    url: 'https://imgur.com/U6cwQxj.png'
  },
  description: `Please be kind and respectful to all community members. We're here to help each other with QuartzNotes and share knowledge. No spam, advertising, or inappropriate content please.`
}

const rule2 = {
  color: color,
  title: 'Ask Questions Freely',
  url: rulesLink,
  thumbnail: {
    url: 'https://imgur.com/U6cwQxj.png'
  },
  description: `Feel free to ask questions about QuartzNotes features, markdown formatting, note sharing, or any issues you're experiencing. No need to ask permission - just ask away! Our community is here to help.`
}

const rule3 = {
  color: color,
  title: 'Share Details When Asking for Help',
  thumbnail: {
    url: 'https://imgur.com/U6cwQxj.png'
  },
  url: rulesLink,
  description: `When asking for help, please provide relevant details like error messages, screenshots, or the specific feature you're having trouble with. This helps our community provide better assistance.`
}

const rule4 = {
  color: color,
  title: 'Use Appropriate Channels',
  url: rulesLink,
  thumbnail: {
    url: 'https://imgur.com/U6cwQxj.png'
  },
  description: `Please use the appropriate channels for different topics. For general support, use the help channels. For feature requests or suggestions, use the feedback channels. This keeps our server organized and helps everyone find what they need.`
}



// Actual Rule Command
module.exports = {
  name: 'rules',
  description: 'Shares our community guidelines with users.',
  usage: `/rules @username or user ID rule number[1-4] or /rules @username or ID all`,
  example: `/rules @user 2 or /rules @user all`,
  modOnly: 1,
  options: [
    {
      name: 'user',
      description: 'Who needs to format their code?',
      required: true,
      type: 6
    },
    {
      name: 'rule',
      description: 'Which rule? If all write all.',
      required: true,
      type: 3
    }
  ],
  execute(interaction) {
    const rules = [rule1, rule2, rule3, rule4]; // Keeps all of the rules inside an array.

    const buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Visit QuartzNotes')
          .setStyle(5)
          .setURL(rulesLink),
        new ButtonBuilder()
          .setLabel('Get Support')
          .setStyle(5)
          .setURL('https://quartznotes.com')

      );


      const user = interaction.options.getUser('user');
      const rule = interaction.options.getString('rule');

      if (rule === 'all') { // Displays all of the rules when ++rules all is run.
        user.send({ content: 'Here are our community guidelines to help make this a welcoming place for everyone:' });
        for (let i = 0; i < rules.length; i++) {
          user.send({ embeds: [rules[i]], components: [buttons] });
        }
      }

      else {
        const nb = parseInt(rule);
        if (nb < 1 || nb > rules.length || isNaN(nb)) { // Gives an error if a correct rule number isn't specified.
          interaction.reply({ content: `Please enter a valid guideline number (1-4). Visit our website for more information.`, components: [buttons] });
          return;
        };

        user.send({ content: `${user}, Here's a helpful community guideline: \n`, embeds: [rules[nb - 1]], components: [buttons] }); // DMs the user.
      }

      interaction.reply({ content: `📨 Hey, ${user} I just sent you a DM with our community guidelines! Please check it!` });

  }
}