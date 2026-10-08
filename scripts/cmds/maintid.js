
const { writeFileSync } = require("fs-extra");

module.exports = {
	config: {
		name: "maintid",
		aliases: ["معرف_الرئيسي"],
		version: "2.4.68",
		author: "ST | Sheikh Tamim",
		countDown: 5,
		role: 0,
		description: {
			en: "Set or view the main thread ID configuration"
		},
		category: "config",
		guide: {
			en: "   {pn} - View current main thread ID"
				+ "\n   {pn} add - Set current thread as main thread ID"
				+ "\n   {pn} add <threadID> - Set specific thread as main thread ID"
				+ "\n   {pn} remove - Remove main thread ID configuration"
		}
	},

	langs: {
		en: {
			currentMainThreadId: "📌 الحالي Main معرف المجموعة: %1",
			notSet: "⚠️ Main Thread المعرف هو ليس configured!\n\n💡 Use: %1maintid إضافة\nإلى تعيين هذا thread as ال main thread.",
			setSuccess: "✅ Main Thread المعرف تم تعيين إلى: %1\n\n🔄 Restarting البوت إلى apply changes...",
			removeSuccess: "✅ Main Thread المعرف تم تمت الإزالة.\n\n🔄 Restarting البوت...",
			invalidThreadId: "❌ غير صالح thread المعرف provided!",
			alreadySet: "ℹ️ Main Thread المعرف هو بالفعل تعيين إلى هذا thread: %1",
			restartComplete: "✅ | تمت إعادة تشغيل البوت successfully\n⏰ | الوقت: %1s"
		}
	},

	onLoad: function ({ api }) {
		const fs = require("fs-extra");
		const pathFile = `${__dirname}/tmp/maintid_restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`✅ | Bot restarted successfully\n⏰ | Time: ${(Date.now() - time) / 1000}s`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, args, event, getLang }) {
		const config = global.GoatBot.config;
		const prefix = global.utils.getPrefix(event.threadID);
		const subCommand = args[0]?.toLowerCase();

		switch (subCommand) {
			case "add":
			case "set": {
				let threadIdToSet = args[1] || event.threadID;
				
				// Validate thread ID
				if (isNaN(threadIdToSet)) {
					return message.reply(getLang("invalidThreadId"));
				}

				// Check if already set to this thread
				if (config.mainThreadId === threadIdToSet.toString()) {
					return message.reply(getLang("alreadySet", threadIdToSet));
				}

				// Update config
				config.mainThreadId = threadIdToSet.toString();
				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				// Save restart info
				const fs = require("fs-extra");
				const pathFile = `${__dirname}/tmp/maintid_restart.txt`;
				fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);

				await message.reply(getLang("setSuccess", threadIdToSet));
				
				// Restart bot
				setTimeout(() => process.exit(2), 2000);
				break;
			}

			case "remove":
			case "delete": {
				config.mainThreadId = "";
				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				// Save restart info
				const fs = require("fs-extra");
				const pathFile = `${__dirname}/tmp/maintid_restart.txt`;
				fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);

				await message.reply(getLang("removeSuccess"));
				
				// Restart bot
				setTimeout(() => process.exit(2), 2000);
				break;
			}

			default: {
				// Show current config
				if (!config.mainThreadId || config.mainThreadId.trim() === "") {
					return message.reply(getLang("notSet", prefix));
				}
				return message.reply(getLang("currentMainThreadId", config.mainThreadId));
			}
		}
	}
};
