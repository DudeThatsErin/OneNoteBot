const Discord = require("discord.js");
const ee = require('../../config/embed.json');

module.exports = {
	name: 'help',
	description: 'This allows users to find out more information on all of our commands.',
	options: [
		{
			name: 'commandname',
			description: 'Type command name here or leave blank to see all commands.',
			required: false,
			type: 3
		}
	],
	usage: '/help or /help [command name here]',
	botSpamOnly: 1,
	async execute(interaction) {
		const createCommandHelpEmbed = ({
			title,
			description = `These are all of the commands the OneNote bot can do. If you want to get more information you can do \`/help <command>\`.`,
			fields }) => {
				return new Discord.EmbedBuilder()
					.setColor(parseInt(ee.light_green_color, 16))
					.setTitle(title)
					.setDescription(description)
					.addFields(fields)
			};

		const embed1 = createCommandHelpEmbed({
			title: 'Help Menu - General Commands',
			fields: [
				{
					name: 'General utility commands',
					value: '```css\nping\navatar\ninvite\ncoinflip\n```'
				}
			]
		});

		const embed2 = createCommandHelpEmbed({
			title: 'Help Menu - Fun Commands',
			fields: [
				{
					name: 'Entertainment and interactive commands',
					value: '```css\n8ball\nchoose\ncompliment\ndice\nfact\njoke\nlearn\nmeme\nquote\nriddle\nroast\nrps\ntrivia\n```'
				}
			]
		});

		const embed3 = createCommandHelpEmbed({
			title: 'Help Menu - Message Issue Commands',
			fields: [
				{
					name: 'Commands to help with common message issues',
					value: '```css\nbin\nelaborate\nerror\nfaq\nformat\ngettinganswers\nhire\njust-ask\nlines\npatience\npoor-phrase\nread-err\nrules\nshare-code\ntry\nwrong-channel\n```'
				}
			]
		});

		const embed4 = createCommandHelpEmbed({
			title: 'Help Menu - Thanks System',
			fields: [
				{
					name: 'Commands for the thanks system',
					value: '```css\nthanks\nunthanks\nthanks-leaderboard\n```'
				}
			]
		});

		const embed5 = createCommandHelpEmbed({
			title: 'Help Menu - Suggestion System',
			fields: [
				{
					name: 'Commands for the suggestion system',
					value: '```css\nsuggestions\nstatusugg\neditsugg\ncompletedsugg\ndenied-sugg\nsuggestionprogress\n```'
				}
			]
		});

		let cmdd = interaction.options.getString('commandname');
		//console.log('cmdd',cmdd)

		if (cmdd) { //WORKS

			const cmd = client.slashCommands.get(cmdd) || client.commands.get(cmdd) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdd));
			//console.log('cmd ',cmd)
			if (!cmd) return interaction.reply({ content: "That command could not be found!", flags: Discord.MessageFlags.Ephemeral });

			const emb = new Discord.EmbedBuilder()
				.setColor(parseInt(ee.light_green_color, 16))
				.setTitle(`Help for \`${cmd.name}\``);
			if (cmd.description) {
				emb.setDescription(cmd.description);
			} else {
				emb.setDescription("No description could be found");
			}
			if(cmd.aliases) {
				if (Array.isArray(cmd.aliases) && cmd.aliases.length > 0) {
					emb.addFields({name: "Aliases", value: cmd.aliases.join(", ")});
				}
			}
			if (cmd.cooldown) {
				emb.addFields({name:"You need to wait this long between usages of this command:", value: `${cmd.cooldown} seconds`})
			}
			if (cmd.usage) {
				emb.addFields({name: "Usage", value: cmd.usage});
			}
			if (cmd.example) {
				emb.addFields({name: "Example Usage", value: cmd.example});
			}
			if (cmd.ownerOnly) {
				emb.addFields({name: "THIS IS ONLY A COMMAND ERIN CAN USE. Right?", value: 'yes'});
			}
			if(cmd.options){
				for(i = 0; i < cmd.options.length; i++){
					//console.log('i ', cmd.options)
					emb.addFields({name: `These are the additional fields for this command:`, value: `Option Name: ${cmd.options[i].name}\nDescription: ${cmd.options[i].description}\nIs this option required? ${cmd.options[i].required}`});
				}
			}
			if (cmd.note) {
				emb.addFields({name: "Note:", value: cmd.note});
			}
			emb.setFooter({ text: ee.footertext, iconURL: ee.footericon });
			//console.log(emb.toJSON());

			interaction.reply({ embeds: [emb], flags: Discord.MessageFlags.Ephemeral })

		} else {
			interaction.reply({ content: `Here are the available commands for the OneNote bot.`, embeds: [embed1, embed2, embed3, embed4, embed5], flags: Discord.MessageFlags.Ephemeral})
		}

	},
};