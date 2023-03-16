const { EmbedBuilder } = require('discord.js')
const Emojies = require("../../../emojies.json")
const { PermissionsBitField } = require("discord.js")
const Setup = require("../../schemas/setupData")
const Guild = require("../../schemas/guildData")

module.exports = {
    name: "say",
    description: "say.",
    aliases: ["say"],
    usage: "{prefix}say",
    cooldown: 1,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
    async execute(message, args, client, config) {

        const setupData = await Setup.findOne({guildID: message.guild.id})
        const guildData = await Guild.findOne({guildID: message.guild.id})
        
        if (![...setupData.botCommands, ...setupData.registerStaff].some(x => message.member.roles.cache.has(x)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.react(Emojies.Red)

      let totalMembers = message.guild.memberCount;
      let tag = `${(message.guild.members.cache.filter(b => b.roles.cache.has("1043975322791592006")).size)}`
      let onlineMembers = message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size;
      let totalBooster = message.guild.premiumSubscriptionCount;
      let totalBoosterLevel = message.guild.premiumTier;
      let inVoice = message.guild.members.cache.filter(x => x.voice.channel).size
      let inBotVoice = message.guild.members.cache.filter(x => x.voice.channel && x.user.bot).size

        let embed = new EmbedBuilder({

            
            author: { name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) },
            description: `\` ❯ \` Şu anda toplam **${inVoice - inBotVoice}** (**+${inBotVoice || "0"} bot**) kişi seslide.
            \` ❯ \` Sunucuda **${totalMembers}** adet üye var (**${onlineMembers}** Aktif)
            \` ❯ \` Toplamda **${tag}** kişi tagımızı alarak bizi desteklemiş.
            \` ❯ \` Toplamda **${totalBooster}** adet booster bulunmakta. (**${totalBoosterLevel}** seviye)
            `

        })

        message.channel.send({ embeds: [embed] })

    },
  };