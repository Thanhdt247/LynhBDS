const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js')
const { DisTube } = require("distube");
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');

const {Guilds, GuildMembers, GuildMessages, GuildVoiceStates} = GatewayIntentBits
const {User, Message, GuildMember, ThreadMember, Channel} = Partials

const {loadEvents} = require('./src/functions/handlers/handleEvents')
const {loadCommands} = require('./src/functions/handlers/handleCommands')

const client = new Client({
    intents: [GuildMembers, Guilds, GuildMessages, GuildVoiceStates],
    partials: [User, Message, GuildMember, ThreadMember]
})

client.commands = new Collection()
client.config = require('./config.json')

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
  });

module.exports = client


client.login(client.config.token).then(() => {
    loadEvents(client)
    loadCommands(client)
})