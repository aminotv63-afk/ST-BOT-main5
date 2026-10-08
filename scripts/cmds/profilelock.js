module.exports = {
  config: {
    name: "profilelock",
    aliases: ["plock", "قفل_الملف"],
    version: "2.4.73",
    author: "ST | Sheikh Tamim",
    countDown: 5,
    role: 2,
    description: {
      en: "Lock or unlock your Facebook profile"
    },
    category: "owner",
    guide: {
      en: "{pn} on → Lock your profile\n"
        + "{pn} off → Unlock your profile\n"
        + "{pn} → Check current profile lock status"
    }
  },

  langs: {
    en: {
      invalidArgs: "⚠️ Use: {pn} تشغيل/إيقاف أو leave empty إلى تحقق status",
      locked: "🔒 الخاص بك profile هو currently LOCKED.",
      unlocked: "🔓 الخاص بك profile هو currently UNLOCKED.",
      successLock: "✅ Successfully LOCKED الخاص بك profile!",
      successUnlock: "✅ Successfully UNLOCKED الخاص بك profile!",
      error: "❌ فشل إلى تغيير profile lock status: %1",
      statusError: "❌ فشل إلى الحصول على profile lock status: %1"
    }
  },

  ST: async function ({ api, event, args, message, getLang }) {
    try {
      const action = args[0]?.toLowerCase();

      if (action && !["on", "off"].includes(action)) {
        return message.reply(getLang("invalidArgs"));
      }

      
      if (!action) {
        api.getProfileLockStatus((err, result) => {
          if (err) return message.reply(getLang("statusError", err.message));

          const msg = result.isLocked
            ? getLang("locked")
            : getLang("unlocked");
          message.reply(msg);
        });
        return;
      }

     
      const shouldLock = action === "off"; 

      api.setProfileLock(shouldLock, (err) => {
        if (err) return message.reply(getLang("error", err.message));

        const msg = shouldLock
          ? getLang("successUnlock")
          : getLang("successLock");
        message.reply(msg);
      });
    } catch (error) {
      message.reply(getLang("error", error.message));
    }
  }
};
