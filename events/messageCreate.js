require('dotenv').config();
const me = require('../config/owner.json');
const Discord = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        //console.log(message);
        //console.log('My ID should match this: 455926927371534346', message.mentions.repliedUser.id); // how I get the user ID on new replies.

        // delete slash commands
        //message.guild.commands.set([])
        //console.log(await message.guild.commands.fetch());

        if (message.author.bot) {
            //console.log('bot message');
            return;
        };
        if (!message.content.startsWith(process.env.PREFIX)) {
            //console.log('does not start with prefix.');
            return;
        };
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return message.channel.send({ content: `That command does not exist. Run \`/help\` to see all of my commands.` });
        //console.log(command);

        // owner only
        if (command.ownerOnly === 1) {
            if (message.author.id != me.id) {
                return message.reply({ content: `This is only a command Erin (<@${me.id}>) can use.` });
            }
        }


        const modRoles = ['718253309101867008'];
        const modIDs = ['455926927371534346'];
        const isMod = modIDs.reduce((alrdyGod, crr) => alrdyGod || message.content.toLowerCase().split(' ').includes(crr), false);
        let value = 0;
        if (message.channel.parentID === '382210817636040706') {
            for (const ID of modRoles) {
                if (!message.member.roles.cache.has(ID)) {
                    value++
                }
                //message.channel.parentID === '382210817636040706' &&
                if (value != modRoles.length && isMod) {
                    message.react('❌');
                    message.reply({ content: `Please do not ping the mods. If you need to contact them, please message <@575252669443211264> to open a ModMail ticket. Thank you!` });
                }
            }
        }

        if (command.modOnly === 1) {
            for (const ID of modRoles) {
                if (!message.member.roles.cache.has(ID)) {
                    value++
                }

                if (value == modRoles.length) {
                    message.react('❌');
                    message.reply({ content: `This is a command only moderators can use. You do not have the required permissions. Moderators have the \`@Team\` role.` });
                    return;
                }
            }
        }

        // command cooldowns
        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply({content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`});
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // actually running the commands.
        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            const embed = {
                color: 0xAA2C2C,
                title: 'Oh no! An _error_ has appeared!',
                description: `**Contact Bot Owner:** <@${me.id}>`,
                fields: [
                    {
                        name: '**Error Name:**',
                        value: `\`${error.name}\``
                    }, {
                        name: '**Error Message:**',
                        value: `\`${error.message}\``
                    }, 
                ],
                timestamp: new Date(),
                footer: {
                    text: `Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`,
                    icon_url: `${client.user.displayAvatarURL()}`
                }
            };
            message.channel.send({ embeds: [embed] });
        }
    }
}// end client.on message