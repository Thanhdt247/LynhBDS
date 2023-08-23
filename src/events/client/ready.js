const { ActivityType } = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} đã trực tuyến !`)

        // Bot Status
        const activities = [
            `Javascipt | /help`,
            `Python | /help`,
            `Spotify | /help`,
            `Youtube | /help`,
            `Naraka | /help`
        ]

        setInterval(() => {
            const status = activities[Math.floor(Math.random() * activities.length)]
            client.user.setPresence({ activities: [{ name: `${status}`, type: ActivityType.Watching }], status: 'idle' })
        }, 10000) // dnd, idle, offline
    }
}