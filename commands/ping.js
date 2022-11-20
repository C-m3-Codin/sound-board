const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const reply = await interaction.reply('Pong!');
		setTimeout(() => {if (reply) interaction.deleteReply(); }, 10000);
	},
};