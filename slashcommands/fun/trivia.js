const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'trivia',
    description: 'Test your knowledge with a random trivia question!',
    usage: `/trivia`,
    botSpamOnly: 1,
    execute(interaction) {
        const triviaQuestions = [
            { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
            { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
            { question: "What is the largest mammal in the world?", options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"], answer: "Blue Whale" },
            { question: "In which year did the Titanic sink?", options: ["1910", "1911", "1912", "1913"], answer: "1912" },
            { question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: "Au" },
            { question: "Which programming language was created by Guido van Rossum?", options: ["Java", "Python", "C++", "JavaScript"], answer: "Python" },
            { question: "What is the smallest country in the world?", options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], answer: "Vatican City" },
            { question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: "6" },
            { question: "What is the fastest land animal?", options: ["Lion", "Cheetah", "Leopard", "Tiger"], answer: "Cheetah" },
            { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
            { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language", "Hyperlinking Text Marking Language"], answer: "Hyper Text Markup Language" },
            { question: "Which company developed the Java programming language?", options: ["Microsoft", "Apple", "Sun Microsystems", "Google"], answer: "Sun Microsystems" },
            { question: "What is the largest desert in the world?", options: ["Sahara", "Gobi", "Antarctica", "Arabian"], answer: "Antarctica" },
            { question: "How many bones are in an adult human body?", options: ["206", "208", "210", "204"], answer: "206" },
            { question: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], answer: "Yen" },
            { question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Silver", "Iron"], answer: "Oxygen" },
            { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], answer: "Nile" },
            { question: "In what year was the first iPhone released?", options: ["2006", "2007", "2008", "2009"], answer: "2007" },
            { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"], answer: "Central Processing Unit" },
            { question: "Which country has the most time zones?", options: ["Russia", "USA", "China", "France"], answer: "France" },
            { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: "Diamond" },
            { question: "Which programming language is known as the 'mother of all languages'?", options: ["C", "Assembly", "FORTRAN", "COBOL"], answer: "C" },
            { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
            { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: "Saturn" },
            { question: "What does WWW stand for?", options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"], answer: "World Wide Web" },
            { question: "In which year was Google founded?", options: ["1996", "1997", "1998", "1999"], answer: "1998" },
            { question: "What is the most spoken language in the world?", options: ["English", "Spanish", "Mandarin Chinese", "Hindi"], answer: "Mandarin Chinese" },
            { question: "Which data structure uses LIFO (Last In, First Out)?", options: ["Queue", "Stack", "Array", "Tree"], answer: "Stack" },
            { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Montreal", "Ottawa"], answer: "Ottawa" },
            { question: "How many bits are in a byte?", options: ["4", "8", "16", "32"], answer: "8" }
        ];
        
        const randomTrivia = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        const shuffledOptions = [...randomTrivia.options].sort(() => Math.random() - 0.5);
        
        const embed = new EmbedBuilder()
            .setColor(0xE74C3C)
            .setTitle('🧠 Trivia Question')
            .setDescription(randomTrivia.question)
            .addFields({ name: 'Options:', value: shuffledOptions.map((option, index) => `${index + 1}. ${option}`).join('\n') })
            .setTimestamp()
            .setFooter({ text: `Trivia for ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.reply({ embeds: [embed], flags: 64 }).then(() => {
            setTimeout(() => {
                const answerEmbed = new EmbedBuilder()
                    .setColor(0x27AE60)
                    .setTitle('✅ Correct Answer')
                    .setDescription(`**${randomTrivia.answer}**`)
                    .setFooter({ text: 'How did you do?' });
                
                interaction.followUp({ embeds: [answerEmbed], flags: 64 });
            }, 15000);
        });
    }
};
