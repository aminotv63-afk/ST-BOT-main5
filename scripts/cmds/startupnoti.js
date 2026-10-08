
const { writeFileSync } = require("fs-extra");

module.exports = {
	config: {
		name: "startupnoti",
		aliases: ["إشعار_التشغيل"],
		version: "1.0",
		author: "ST | Sheikh Tamim",
		countDown: 5,
		role: 2,
		description: {
			vi: "Cấu hình thông báo khi bot khởi động",
			en: "Configure bot startup notification settings"
		},
		category: "owner",
		guide: {
			en: "   {pn} on/off: Enable/disable startup notifications"
				+ "\n   {pn} thread on/off: Enable/disable thread notifications"
				+ "\n   {pn} thread add <threadID>: Add thread to notification list"
				+ "\n   {pn} thread remove <threadID>: Remove thread from notification list"
				+ "\n   {pn} thread list: Show current thread list"
				+ "\n   {pn} admin on/off: Enable/disable admin notifications"
				+ "\n   {pn} admin set <adminID>: Set admin for notifications"
				+ "\n   {pn} message <message>: Set startup message"
				+ "\n   {pn} info: Show current configuration"
		}
	},

	langs: {
		en: {
			enabled: "✅ البوت startup notifications مفعل",
			disabled: "❌ البوت startup notifications معطل",
			threadEnabled: "✅ Thread notifications مفعل",
			threadDisabled: "❌ Thread notifications معطل",
			threadAdded: "✅ تمت الإضافة thread %1 إلى notification قائمة",
			threadRemoved: "✅ تمت الإزالة thread %1 من notification قائمة",
			threadNotFound: "❌ Thread %1 ليس found في notification قائمة",
			threadList: "📋 الحالي notification threads:\n%1",
			noThreads: "📋 لا threads configured لـ notifications",
			adminEnabled: "✅ المشرف notifications مفعل",
			adminDisabled: "❌ المشرف notifications معطل",
			adminSet: "✅ المشرف المعرف تعيين إلى: %1",
			messageSet: "✅ Startup رسالة تم التحديث إلى:\n%1",
			currentConfig: "🔧 الحالي Startup Notification Configuration:\n\n📢 Main: %1\n📋 Thread notifications: %2\n📝 Thread IDs: %3\n👑 المشرف notifications: %4\n🆔 المشرف المعرف: %5\n💬 رسالة: %6",
			syntaxError: "❌ غير صالح syntax. استخدم {pn} help لـ guide"
		}
	},

	onStart: async function ({ args, message, event, getLang }) {
		const { threadID } = event;
		const { config } = global.GoatBot;
		const startupConfig = config.botStartupNotification;

		if (!args[0]) {
			return message.reply(getLang("syntaxError"));
		}

		switch (args[0].toLowerCase()) {
			case "on":
			case "enable": {
				startupConfig.enable = true;
				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
				return message.reply(getLang("enabled"));
			}

			case "off":
			case "disable": {
				startupConfig.enable = false;
				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
				return message.reply(getLang("disabled"));
			}

			case "thread": {
				if (!args[1]) return message.reply(getLang("syntaxError"));

				switch (args[1].toLowerCase()) {
					case "on":
					case "enable":
						startupConfig.sendToThreads.enable = true;
						writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
						return message.reply(getLang("threadEnabled"));

					case "off":
					case "disable":
						startupConfig.sendToThreads.enable = false;
						writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
						return message.reply(getLang("threadDisabled"));

					case "add":
						if (!args[2]) return message.reply(getLang("syntaxError"));
						const addThreadId = args[2];
						if (!startupConfig.sendToThreads.threadIds.includes(addThreadId)) {
							startupConfig.sendToThreads.threadIds.push(addThreadId);
							writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
							return message.reply(getLang("threadAdded", addThreadId));
						}
						return message.reply("Thread already in list");

					case "remove":
						if (!args[2]) return message.reply(getLang("syntaxError"));
						const removeThreadId = args[2];
						const index = startupConfig.sendToThreads.threadIds.indexOf(removeThreadId);
						if (index > -1) {
							startupConfig.sendToThreads.threadIds.splice(index, 1);
							writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
							return message.reply(getLang("threadRemoved", removeThreadId));
						}
						return message.reply(getLang("threadNotFound", removeThreadId));

					case "list":
						const threads = startupConfig.sendToThreads.threadIds;
						if (threads.length === 0) {
							return message.reply(getLang("noThreads"));
						}
						const threadList = threads.map((id, index) => `${index + 1}. ${id}`).join("\n");
						return message.reply(getLang("threadList", threadList));

					default:
						return message.reply(getLang("syntaxError"));
				}
			}

			case "admin": {
				if (!args[1]) return message.reply(getLang("syntaxError"));

				switch (args[1].toLowerCase()) {
					case "on":
					case "enable":
						startupConfig.sendToAdmin.enable = true;
						writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
						return message.reply(getLang("adminEnabled"));

					case "off":
					case "disable":
						startupConfig.sendToAdmin.enable = false;
						writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
						return message.reply(getLang("adminDisabled"));

					case "set":
						if (!args[2]) return message.reply(getLang("syntaxError"));
						startupConfig.sendToAdmin.adminId = args[2];
						writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
						return message.reply(getLang("adminSet", args[2]));

					default:
						return message.reply(getLang("syntaxError"));
				}
			}

			case "message": {
				if (!args[1]) return message.reply(getLang("syntaxError"));
				const newMessage = args.slice(1).join(" ");
				startupConfig.message = newMessage;
				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
				return message.reply(getLang("messageSet", newMessage));
			}

			case "info": {
				const mainStatus = startupConfig.enable ? "✅ Enabled" : "❌ Disabled";
				const threadStatus = startupConfig.sendToThreads.enable ? "✅ Enabled" : "❌ Disabled";
				const threadIds = startupConfig.sendToThreads.threadIds.length > 0 
					? startupConfig.sendToThreads.threadIds.join(", ") 
					: "None";
				const adminStatus = startupConfig.sendToAdmin.enable ? "✅ Enabled" : "❌ Disabled";
				const adminId = startupConfig.sendToAdmin.adminId || "Not set";
				const currentMessage = startupConfig.message || "Default message";

				return message.reply(getLang("currentConfig", mainStatus, threadStatus, threadIds, adminStatus, adminId, currentMessage));
			}

			default:
				return message.reply(getLang("syntaxError"));
		}
	}
};
