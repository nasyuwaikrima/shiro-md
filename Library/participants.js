require('../config')
const { WA_DEFAULT_EPHEMERAL } = require('@whiskeysockets/baileys').default

async function GroupParticipants(conn, { id, participants, action, author }) {
  try {
    const meta = await conn.groupMetadata(id)
    const subject = meta.subject
    const totalMember = meta.participants.length

    for (let jid of participants) {

      // ambil avatar user
      let avatar
      try {
        avatar = await conn.profilePictureUrl(jid, 'image')
      } catch {
        avatar = global.thumb
      }

      let sisaMember = action === "remove" ? totalMember - 1 : totalMember

      // External Ad Reply pakai avatar user
      const external = {
        title: subject,
        body: `👥 Member: ${sisaMember}`,
        thumbnailUrl: avatar,
        mediaType: 1,
        renderLargerThumbnail: true
      }

      switch (action) {

        // ===== WELCOME =====
        case "add":
          if (!global.welcome) return
          await conn.sendMessage(id, {
            text: `👋 Selamat datang @${jid.split("@")[0]} di *${subject}*\n\n👥 Total member: ${sisaMember}`,
            contextInfo: {
              mentionedJid: [jid],
              externalAdReply: external
            }
          }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })
        break

        // ===== GOODBYE =====
        case "remove":
          if (!global.goodbye) return
          await conn.sendMessage(id, {
            text: `👋 Selamat tinggal @${jid.split("@")[0]}\n👥 Sisa member: ${sisaMember}`,
            contextInfo: {
              mentionedJid: [jid],
              externalAdReply: external
            }
          }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })
        break

        // ===== PROMOTE =====
        case "promote":
          if (!author) return
          await conn.sendMessage(id, {
            text: `👑 @${author.split("@")[0]} promote @${jid.split("@")[0]} jadi admin`,
            contextInfo: { mentionedJid: [author, jid] }
          })
        break

        // ===== DEMOTE =====
        case "demote":
          if (!author) return
          await conn.sendMessage(id, {
            text: `🚫 @${author.split("@")[0]} demote @${jid.split("@")[0]}`,
            contextInfo: { mentionedJid: [author, jid] }
          })
        break
      }
    }

  } catch (e) {
    console.error("GroupParticipants Error:", e)
  }
}

module.exports = GroupParticipants