const Setup = require("../../schemas/setupData")
const Emojies = require("../../../emojies.json")
const { ButtonStyle, ActionRowBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'ban',
    description: 'Sunucu için ayarlamalar komutu.',
    aliases: ['ban'],
    usage: '.ban',
    cooldown: 5,
    /**
     * @param {Array} args
     * @param {Discord.Client} client
     */

async execute(message, args, client, embedm) {

const setupData = await Setup.findOne({guildID: message.guild.id})
const guildData = await Guild.findOne({guildID: message.guild.id})

if (![...setupData.botCommands, ...setupData.registerStaff].some(x => message.member.roles.cache.has(x)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.react(Emojies.Red)

},
async execute(message, args, client, embedm) {
      if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply({content: `Bu Komutu Kullanabilmeniz İçin **BAN** Yetkisine Sahip Olmanız Gerekmektedir.`})


    let user = message.mentions.users.first();
    let sebep = args[1]
    if(!user) return message.reply("Lütfen Banlanacak Kişiyi Belirtiniz.")
    if(!sebep) return message.reply("Lütfen Sebep Belirtiniz")

const üye = message.guild.members.cache.get(user.id)

try {
    await üye.ban({reason: sebep})
    const embed = new EmbedBuilder()
    .setColor("#000001")
    .setDescription(`${user}, isimli Kişi Sunucudadan Banladı!
    Sebebi: ${sebep}`)
    .setFooter({ text: `${message.author.username} Tarafından İstendi.`, iconURL: message.author.displayAvatarURL({dynamic:true}) })

    message.reply({embeds: [embed]})
        } catch {
   message.channel.send
   const ramalcik = new EmbedBuilder()
   .setColor("#000001")
   .setDescription(`${user} Adlı Kullanıcıyı Banlayamıyorum. Galiba Yetkim Yetmiyor Veya Sunucuda Bulunmuyor!!!`)
   .setFooter({ text: `${message.author.username} Tarafından İstendi.`, iconURL: message.author.displayAvatarURL({dynamic:true}) })

   message.reply({embeds: [ramalcik]})
}
},
}