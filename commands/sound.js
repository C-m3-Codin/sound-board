const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sound')
		.setDescription('Set sound for each button.')
		.addStringOption(option =>
			option.setName('number')
				.setDescription('Button number (1-9)'))
		.addStringOption(option =>
			option.setName('link')
				.setDescription('URL for the sound')),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};