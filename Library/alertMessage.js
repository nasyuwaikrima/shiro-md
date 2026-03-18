const replyy = require("./replyy");

class AlertMessage {
  constructor(Shiro, m) {
    this.Shiro = Shiro;
    this.m = m;
  }

  sendAlert(text, thumbnail, title) {
    return replyy(this.Shiro, this.m, title, text, thumbnail);
  }

  ownerAccesAlert(text) {
    return this.sendAlert(
      text,
      "https://files.catbox.moe/i5djoy",
      "👑 OWNER ACCESS ONLY",
    );
  }

  proccessAlert(text) {
    return this.sendAlert(
      text,
      "https://files.catbox.moe/hfsd1x",
      "⏳ PROCESSING REQUEST",
    );
  }

  queryAlert(text) {
    return this.sendAlert(
      text,
      "https://files.catbox.moe/gnszki",
      "⚠️ INPUT REQUIRED",
    );
  }

  premiumAlert(text) {
    return this.sendAlert(
      text,
      "https://files.catbox.moe/7ollwi",
      "💎 PREMIUM FEATURE",
    );
  }

  limitAlert(text) {
    return this.sendAlert(
      text,
      "https://files.catbox.moe/ge5m7p",
      "🚫 LIMIT HABIS",
    );
  }
}

module.exports = { AlertMessage };
