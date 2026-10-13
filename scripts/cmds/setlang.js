const fs = require("fs-extra");

module.exports = {
config: {
name: "setlang",
aliases: ["اللغة"],
version: "2.0",
author: "NTKhang",
countDown: 5,
role: 0,
description: {
en: "Change the bot language"
},
category: "owner",
guide: {
en: "{pn} en"
}
},

langs: {
	en: {
		setLangForAll: "✅ Default bot language changed to: %1",
		setLangForCurrent: "✅ Language for this chat changed to: %1",
		noPermission: "❌ You don't have permission to use this command.",
		langNotFound: "❌ Language not found: %1",
		missingCode: "❌ Please specify a language code. Example: setlang en",
		error: "❌ Failed to change the language."
	}
},

onStart: async function ({ args, threadsData, message, event, getLang }) {
	try {
		const langCode = args[0];

		if (!langCode)
			return message.reply(getLang("missingCode"));

		const langPath = `${__dirname}/../../languages/${langCode}.lang`;

		if (!fs.existsSync(langPath))
			return message.reply(getLang("langNotFound", langCode));

		const adminBot = global.GoatBot?.config?.adminBot || [];
		const isBotAdmin = adminBot.includes(event.senderID);

		if (isBotAdmin) {
			global.GoatBot.config.language = langCode;

			fs.writeFileSync(
				global.client.dirConfig,
				JSON.stringify(global.GoatBot.config, null, 2)
			);

			return message.reply(getLang("setLangForAll", langCode));
		}

		await threadsData.set(event.threadID, langCode, "data.language");

		return message.reply(getLang("setLangForCurrent", langCode));
	}
	catch (err) {
		console.error("setlang error:", err);
		return message.reply(getLang("error"));
	}
}

};
