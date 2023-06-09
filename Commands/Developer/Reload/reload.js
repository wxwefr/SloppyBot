const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setName("reload")
        .setDescription("Reload the bots commands/events")
        .addSubcommand((options) => options
            .setName("events")
            .setDescription("Reload the bots events")
            )

        .addSubcommand((options) => options
            .setName("commands")
            .setDescription("Reload the bots commands")
            )
}