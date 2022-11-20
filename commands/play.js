const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { getList } = require('../DB/db');

// const sources = [
// 	'https://cdn.discordapp.com/attachments/959458937084735648/1043528539762335794/Violin_Gang.mp3',
// 	'https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3',
// 	'https://www.myinstants.com/media/sounds/vine-boom.mp3',
// 	'https://www.myinstants.com/media/sounds/obi-wan-hello-there.mp3',
// 	'https://www.myinstants.com/media/sounds/fortnite-dance-moves-emote-music-tv9iv8cxmo0-1.mp3',
//  'https://www.myinstants.com/media/sounds/tmpbxydyrz3.mp3',
// ];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a sound.')
		.addIntegerOption(option =>
			option.setName('num')
				.setDescription('Button number (1-9)')
				.setRequired(true)),
	async execute(interaction) {
		let reply;
		try {
			const Member = await interaction.guild.members.cache.get(interaction.user.id);
			const num = interaction.isButton() ? interaction.customId.slice(-1) : interaction.options.get('num').value;
			if (!num) return reply = await interaction.reply('Something\'s not right');

			if (Member.voice.channel) {
				const sources = await getList(interaction.guild.id);

				if (sources == 'error') return reply = await interaction.reply('Something went wrong. Please try again.');
				if (sources == null || sources == 'empty') return reply = await interaction.reply('Please map your sounds to the buttons using /store command.');

				const key = 'link' + num.toString();
				if (!(key in sources)) return reply = await interaction.reply('No sound mapped to this button');

				const connection = joinVoiceChannel({
					channelId: Member.voice.channel.id,
					guildId: interaction.guild.id,
					adapterCreator: interaction.guild.voiceAdapterCreator,
				});
				const resource = createAudioResource(sources[key]);
				const player = createAudioPlayer();
				player.play(resource);
				player.on('error', error => {
					console.error(error);
				});
				player.on(AudioPlayerStatus.Idle, () => {
					connection.disconnect();
				});
				connection.subscribe(player);

				reply = await interaction.reply(`${Member.user.tag} played the sound ${sources['label' + num]}!`);
			}
			else {
				reply = await interaction.reply(`${Member.user.tag} is not connected.`);
			}
		}
		catch (error) {
			console.log(error);
		}
		finally {
			setTimeout(() => {if (reply) interaction.deleteReply(); }, 10000);
		}
	},
};