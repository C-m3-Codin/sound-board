const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Setup the server to use this bot.'),
	async execute(interaction) {
		await interaction.reply('Setting up!');
	},
};