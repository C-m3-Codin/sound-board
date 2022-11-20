const { SlashCommandBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Setup the server to use this bot.'),
	async execute(interaction) {
		let channel = interaction.guild.channels.cache.find(c => c.name.toLowerCase() === 'soundboard');
		if (channel) {
			channel.delete();
			// interaction.reply('The SoundBoard channel already exists in this guild.').catch(console.error);
		}

		channel = await interaction.guild.channels.create({
			name: 'SoundBoard',
			type: ChannelType.GuildText,
		});

		const row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder().setCustomId('play1').setLabel('1').setStyle(ButtonStyle.Primary),
				new ButtonBuilder().setCustomId('play2').setLabel('2').setStyle(ButtonStyle.Primary),
				new ButtonBuilder().setCustomId('play3').setLabel('3').setStyle(ButtonStyle.Primary),
			);
		const row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder().setCustomId('play4').setLabel('4').setStyle(ButtonStyle.Primary),
				new ButtonBuilder().setCustomId('play5').setLabel('5').setStyle(ButtonStyle.Primary),
				new ButtonBuilder().setCustomId('play6').setLabel('6').setStyle(ButtonStyle.Primary),
			);
		const row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder().setCustomId('play7').setLabel('7').setStyle(ButtonStyle.Primary),
				new ButtonBuilder().setCustomId('play8').setLabel('8').setStyle(ButtonStyle.Primary),
				new ButtonBuilder().setCustomId('play9').setLabel('9').setStyle(ButtonStyle.Primary),
			);

		channel.send({ content: 'SoundBoard buttons', components: [row1, row2, row3] });
		await interaction.reply('Created Channel');
		setTimeout(() => interaction.deleteReply(), 10000);
	},
};