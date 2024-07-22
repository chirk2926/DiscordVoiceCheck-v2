const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES
    ] 
});

const TOKEN = 'BOTトークンを入力';
const CHANNEL_ID = 'メッセージを送信するテキストチャンネルのIDを入力';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const textChannel = client.channels.cache.get(CHANNEL_ID);

    if (!textChannel) return;

    let embed;

    if (!oldState.channel && newState.channel) {
        embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('参加しました')
            .setDescription(`${newState.member.user.tag} がボイスチャンネル ${newState.channel.name} に参加しました`)
            .setTimestamp();
    }

    else if (oldState.channel && !newState.channel) {
        embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('退出しました')
            .setDescription(`${oldState.member.user.tag} がボイスチャンネル ${oldState.channel.name} を退出しました`)
            .setTimestamp();
    }

    else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
        embed = new MessageEmbed()
            .setColor('#FFFF00')
            .setTitle('移動しました')
            .setDescription(`${oldState.member.user.tag} がボイスチャンネル ${oldState.channel.name} から ${newState.channel.name} に移動しました`)
            .setTimestamp();
    }

    if (embed) {
        textChannel.send({ embeds: [embed] });
    }
});

client.login(TOKEN);
