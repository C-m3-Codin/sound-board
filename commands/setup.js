const { SlashCommandBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getList } = require('../DB/db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Setup the server to use this bot.'),
	async execute(interaction) {
		let channel = await interaction.guild.channels.cache.find(c => c.name.toLowerCase() === 'soundboard');
		if (channel) {
			channel.delete();
			// interaction.reply('The SoundBoard channel already exists in this guild.').catch(console.error);
		}

		channel = await interaction.guild.channels.create({
			name: 'SoundBoard',
			type: ChannelType.GuildText,
		});
		const sources = await getList(interaction.guild.id);
		const row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder().setCustomId('play1').setLabel(sources.label1 ?? '1').setStyle(ButtonStyle.Primary).setDisabled(!('link1' in sources)),
				new ButtonBuilder().setCustomId('play2').setLabel(sources.label2 ?? '2').setStyle(ButtonStyle.Primary).setDisabled(!('link2' in sources)),
				new ButtonBuilder().setCustomId('play3').setLabel(sources.label3 ?? '3').setStyle(ButtonStyle.Primary).setDisabled(!('link3' in sources)),
			);
		const row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder().setCustomId('play4').setLabel(sources.label4 ?? '4').setStyle(ButtonStyle.Primary).setDisabled(!('link4' in sources)),
				new ButtonBuilder().setCustomId('play5').setLabel(sources.label5 ?? '5').setStyle(ButtonStyle.Primary).setDisabled(!('link5' in sources)),
				new ButtonBuilder().setCustomId('play6').setLabel(sources.label6 ?? '6').setStyle(ButtonStyle.Primary).setDisabled(!('link6' in sources)),
			);
		const row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder().setCustomId('play7').setLabel(sources.label7 ?? '7').setStyle(ButtonStyle.Primary).setDisabled(!('link7' in sources)),
				new ButtonBuilder().setCustomId('play8').setLabel(sources.label8 ?? '8').setStyle(ButtonStyle.Primary).setDisabled(!('link8' in sources)),
				new ButtonBuilder().setCustomId('play9').setLabel(sources.label9 ?? '9').setStyle(ButtonStyle.Primary).setDisabled(!('link9' in sources)),
			);
		const row4 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder().setCustomId('refresh1').setLabel('Refresh').setStyle(ButtonStyle.Success).setEmoji('🔄'),
			);

		channel.send({ content: 'SoundBoard buttons', components: [row1, row2, row3, row4] });
		const reply = await interaction.reply('Created Channel');
		setTimeout(() => {if (reply) interaction.deleteReply(); }, 10000);
	},
};