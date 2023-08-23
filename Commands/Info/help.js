const {
    ComponentType,
    EmbedBuilder,
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Nhận danh sách tất cả các lệnh"),
    async execute(interaction) {

        const { client } = interaction

        const emojis = {
            admin: '<a:Arrow_Right_RGB:1114537987573813288>',
            fun: '<a:Arrow_Right_RGB:1114537987573813288>',
            info: '<a:Arrow_Right_RGB:1114537987573813288>',
            moderation: '<a:Arrow_Right_RGB:1114537987573813288>',
            music: '<a:Arrow_Right_RGB:1114537987573813288>',
            misc: '<a:Arrow_Right_RGB:1114537987573813288>',
            search: '<a:Arrow_Right_RGB:1114537987573813288>',
            tools: '<a:Arrow_Right_RGB:1114537987573813288>',

        };

        function getCommand(name) {
            const getCommandID = client.application.commands.cache
                .filter((cmd) => cmd.name === name) // Filter by command name
                .map((cmd) => cmd.id); // Map to just the ID property

            return getCommandID;
        }

        const directories = [
            ...new Set(client.commands.map((cmd) => cmd.folder)),
        ];

        const formatString = (str) =>
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

        const categories = directories.map((dir) => {
            const getCommands = client.commands
                .filter((cmd) => cmd.folder === dir)
                .map((cmd) => {
                    return {
                        name: cmd.data.name,
                        description:
                            cmd.data.description ||
                            "Không có mô tả cho lệnh này.",
                    };
                });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const embed = new EmbedBuilder()
            .setDescription("Xem danh sách các lệnh bằng cách chọn một danh mục bên dưới!")
            .setColor('Random')
            .setImage('https://wallpaperwaifu.com/wp-content/uploads/2023/06/alisa-echo-punishing-gray-raven-thumb.jpg')
            .setAuthor({ name: `${client.user.username}'s Commands`, iconURL: client.user.avatarURL() })
            .setTimestamp()

        const components = (state) => [
            new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("help-menu")
                    .setPlaceholder("Tìm một danh mục")
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Lệnh từ danh mục ${cmd.directory}`,
                                emoji: emojis[cmd.directory.toLowerCase() || null],
                            }
                        })
                    )
            ),
        ]

        const initialMessage = await interaction.reply({
            embeds: [embed],
            components: components(false),
        })

        const filter = (interaction) =>
            interaction.user.id === interaction.member.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: ComponentType.StringSelect,
        })

        collector.on("collect", (interaction) => {
            const [directory] = interaction.values
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            )

            const categoryEmbed = new EmbedBuilder()
                .setAuthor({
                    name: `Lệnh mà ${client.user.username} có thể thực hiện !`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle(`${emojis[directory.toLowerCase() || null]}  ${formatString(directory)} commands`)
                .setDescription(
                    `Một danh sách tất cả các lệnh được phân loại theo ${directory}.`
                )
                .setColor('Random')
                .setImage('https://wallpaperwaifu.com/wp-content/uploads/2023/06/alisa-echo-punishing-gray-raven-thumb.jpg')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `</${cmd.name}:${getCommand(cmd.name)}>`,
                            value: `\`${cmd.description}\``,
                            inline: true,
                        }
                    })
                )
                .setTimestamp()

            interaction.update({ embeds: [categoryEmbed] })
        })

        collector.on("end", () => {
            initialMessage.edit({ components: components(true) })
        })
    },
}