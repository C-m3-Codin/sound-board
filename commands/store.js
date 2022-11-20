const { SlashCommandBuilder } = require('discord.js');
const { setLink } = require('../DB/db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('store')
		.setDescription('Set sound for each button.')
		.addIntegerOption(option =>
			option.setName('num')
				.setDescription('Button number (1-9)')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('link')
				.setDescription('URL for the sound')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('label')
				.setDescription('Button label')),
	async execute(interaction) {
		try {
			const num = await interaction.options.get('num').value;
			const label = await interaction.options.get('label') ? interaction.options.get('label').value : num.toString();
			const link = await interaction.options.get('link').value;
			const guildId = await interaction.guild.id;
			if (!num) return await interaction.reply('Something\'s not right');

			const res = await setLink(guildId, num, label, link);
			if (res == 'success') {
				await interaction.reply(`Successfully mapped button ${num} to ${link}`);
			}
			else {
				await interaction.reply('Something went wrong. Please try again.');
			}
		}
		catch (error) {
			console.log(error);
			await interaction.reply('Something went wrong. Try again later.');
		}
		finally {
			setTimeout(() => interaction.deleteReply(), 10000);
		}
	},
};