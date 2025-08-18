const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'all-projects',
    description: 'Displays all of Erin\'s projects in one message',
    usage: '/all-projects',
    ownerOnly: 1,
    data: {
        name: 'all-projects',
        description: 'Displays all of Erin\'s projects in one message'
    },
    
    async execute(interaction) {
        const projectsEmbed = new Discord.EmbedBuilder()
            .setColor(0x30d0e8)
            .setTitle('These are my projects!')
            .setDescription('These are all of the projects I am currently working on.');

        const noteHostEmbed = new Discord.EmbedBuilder()
            .setColor(0xFFA550)
            .setTitle('What is NoteHost?')
            .setDescription('NoteHost is a free way to host your notion sites on a `.com` or `.net` domain name that you own. An alternative to Notion\'s paid site service. The docs are located on my [Notion Site](https://dudethatserin.notion.site/NoteHost-982d31fcc8dd4799a18efcb074b0e63c?pvs=74).');

        const quartzNotesEmbed = new Discord.EmbedBuilder()
            .setColor(0x992acc)
            .setTitle('What is QuartzNotes?')
            .setDescription('QuartzNotes is a website that allows users to create and manage their own notes. It is a simple and easy to use website that allows users to create and manage their own notes. You can visit [QuartzNotes](https://quartznotes.com) to learn more.');

        const fileCreatorEmbed = new Discord.EmbedBuilder()
            .setColor(0xd1bb57)
            .setTitle('What is FileCreator?')
            .setDescription('FileCreator is an open-source Obsidian Plugin that allows me to quickly create PDFs or Markdown files in any folder and prepend or append the current date to them. You can visit the [FileCreator GitHub](https://github.com/DudeThatsErin/FileCreator) to learn more.');

        const ghostyPostyEmbed = new Discord.EmbedBuilder()
            .setColor(0x193591)
            .setTitle('What is GhostyPosty?')
            .setDescription('GhostyPosty is an open-source Obsidian Plugin that allows users to draft blog posts from their Obsidian vault and then upload them as drafts to your Ghost blog. It was an idea [Matt Birchler from A Better Computer](https://birchtree.me/) had back in 2020 but never ended up releasing. I decided to release it when I switched my blog from WordPress to Ghost this year! You can visit the [GhostyPosty GitHub](https://github.com/DudeThatsErin/GhostyPosty) to learn more.');

        const syncthingSyncEmbed = new Discord.EmbedBuilder()
            .setColor(0x973131)
            .setTitle('What is SyncthingSync?')
            .setDescription('SyncthingSync is an open-source (desktop only) Obsidian Plugin that enables the ability to sync with syncthing directly inside Obsidian so you don\'t need to run syncthing separately. You can visit the [SyncthingSync GitHub](https://github.com/DudeThatsErin/SyncthingSync) to learn more.');

        const attachmentOrganizerEmbed = new Discord.EmbedBuilder()
            .setColor(0x5bd622)
            .setTitle('What is Attachment Organizer?')
            .setDescription('Attachment Organizer is an open-source Obsidian Plugin that allows me to quickly organize all of the PDFs in my vault. You can visit the [Attachment Organizer GitHub](https://github.com/DudeThatsErin/attachment-organizer) to learn more.');

        const appSeekerEmbed = new Discord.EmbedBuilder()
            .setColor(0x3855e3)
            .setTitle('What is AppSeeker?')
            .setDescription('AppSeeker is **coming soon**. It will be a website you can use to compare productivity, task management, journaling, email, and more apps to find the perfect one *for you*.');

        const tbeEmbed = new Discord.EmbedBuilder()
            .setColor(0xb321b5)
            .setTitle('What is Tech By Erin (TBE)?')
            .setDescription('Tech By Erin (TBE) is my [blog](https://techbyerin.com). I run it using [ghost](https://ghost.org) and I plan to make an Obsidian plugin soon to make the process even smoother.');

        const sashaAiEmbed = new Discord.EmbedBuilder()
            .setColor(0x2eea80)
            .setTitle('What is Sasha AI?')
            .setDescription('Sasha AI is my open-source [AI Chatbot](https://github.com/DudeThatsErin/Sasha-AI) that I am coding from scratch. It is currently on hiatus while I learn more higher level maths (Discrete Algebra, Calculus, Linear Algebra, etc.) and learn more about AI and how it functions.');

        const fetchedChannel = interaction.guild.channels.cache.get('1406089652854591559'); // announcements channel
        
        try {
            await fetchedChannel.send({ embeds: [projectsEmbed, noteHostEmbed, quartzNotesEmbed, fileCreatorEmbed, ghostyPostyEmbed, syncthingSyncEmbed, attachmentOrganizerEmbed, appSeekerEmbed, tbeEmbed, sashaAiEmbed] });
            interaction.reply({content: `All projects info posted to announcements!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#1406089652854591559>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    }
};
