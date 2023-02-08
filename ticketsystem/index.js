const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.on("ready", () => {
	client.user.setStatus(`online`); // bots status 
})

// bot token

const token = '' // bot token here

// channel specifying

const ticketcategory = '' // category id where the ticket bot creates a ticket channel after you use the command

const ticketchannel = '' // channel id where the ticket open command works. (it doesnt work in other channels, only in this channel you specify)

// commands

const ticketopen = '/openticket' // command for ticket opening

const ticketclose = '/closeticket' // command for ticket closing

//

client.on("messageCreate", async message => {
  if (message.channel.id === ticketchannel) {
  if (message.content === ticketopen) {
      const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('TICKET')
      .setDescription(`Welcome to your ticket ${message.author.tag}! Our discord servers discord mods will be helping you as soon as possible`)
      const embed2 = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('TICKET')
      .setDescription('I created a private ticket-channel between you and me.')
      const channel = await message.guild.channels.create({
        name: `ticket ${message.author.tag}`,
        type: 0,
        parent: ticketcategory
      });
      channel.permissionOverwrites.create(message.author.id, {ViewChannel: true, SendMessages: true});
      channel.permissionOverwrites.create(channel.guild.roles.everyone, {ViewChannel: false, SendMessages: false});
      channel.send({ embeds: [embed] });
      message.author.send({ embeds: [embed2] })
      message.delete();
  } else {
      message.delete();
    }
  }
  if(message.channel.parent.id === ticketcategory) {
    if (message.content === ticketclose) { 
      message.channel.delete();
    }
   }
});


client.login(token)
