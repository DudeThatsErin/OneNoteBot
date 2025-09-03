const { EmbedBuilder } = require('discord.js');
const config = require('../../config/embed.json');

module.exports = {
    name: 'riddle',
    description: 'Get a brain-teasing riddle to solve!',
    usage: `/riddle`,
    botSpamOnly: 1,
    execute(interaction) {
        const riddles = [
            { question: "I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?", answer: "An echo" },
            { question: "The more you take, the more you leave behind. What am I?", answer: "Footsteps" },
            { question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", answer: "A map" },
            { question: "What has keys but no locks, space but no room, and you can enter but can't go inside?", answer: "A keyboard" },
            { question: "I'm tall when I'm young, and short when I'm old. What am I?", answer: "A candle" },
            { question: "What gets wet while drying?", answer: "A towel" },
            { question: "I have branches, but no fruit, trunk, or leaves. What am I?", answer: "A bank" },
            { question: "What can travel around the world while staying in a corner?", answer: "A stamp" },
            { question: "I'm light as a feather, yet the strongest person can't hold me for five minutes. What am I?", answer: "Your breath" },
            { question: "What has hands but can't clap?", answer: "A clock" },
            { question: "I go up but never come down. What am I?", answer: "Your age" },
            { question: "What has a head and a tail but no body?", answer: "A coin" },
            { question: "What gets bigger the more you take away from it?", answer: "A hole" },
            { question: "I'm found in socks, scarves, and mittens, and often in the paws of playful kittens. What am I?", answer: "Yarn" },
            { question: "What has one eye but cannot see?", answer: "A needle" }
        ];
        
        const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];
        
        const embed = new EmbedBuilder()
            .setColor(parseInt(config.turquoise_color, 16))
            .setTitle('🧩 Riddle Time!')
            .setDescription(randomRiddle.question)
            .addFields({ name: 'Think you know?', value: 'Reply with your answer! (The answer is hidden below)' })
            .setTimestamp()
            .setFooter({ text: `Riddle for ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        // Send the riddle first
        interaction.reply({ embeds: [embed], flags: 64 }).then(() => {
            // Send the answer in a follow-up after 30 seconds
            setTimeout(() => {
                const answerEmbed = new EmbedBuilder()
                    .setColor(parseInt(config.magenta_color, 16))
                    .setTitle('💡 Answer')
                    .setDescription(`**${randomRiddle.answer}**`)
                    .setFooter({ text: 'Did you get it right?' });
                
                interaction.followUp({ embeds: [answerEmbed], flags: 64 });
            }, 30000);
        });
    }
};
