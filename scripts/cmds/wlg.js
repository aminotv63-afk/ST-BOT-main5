const fs = require('fs-extra');
const path = require('path');
const { getTime } = global.utils;

module.exports = {
	config: {
		name: "wlg",
		aliases: ["القائمة"],
		version: "2.4.78",
		author: "ST | Sheikh Tamim",
		countDown: 5,
		role: 1,
		description: {
			vi: "Quản lý hệ thống chào mừng, tạm biệt & thông báo nhóm",
			en: "Manage welcome, leave & group notification system"
		},
		category: "Events configure",
		guide: {
			en:  "   {pn} status: View status of current group"
					+ "\n   {pn} on: Turn on all (welcome + leave + gcnoti) for this group"
					+ "\n   {pn} off: Turn off all (welcome + leave + gcnoti) for this group"
					+ "\n   {pn} all <on|off>: Turn on/off all features for ALL groups"
					+ "\n   {pn} welcome <on|off>: Toggle welcome only"
					+ "\n   {pn} leave <on|off>: Toggle leave only"
					+ "\n   {pn} gcnoti <on|off>: Toggle group notification only"
					+ "\n   {pn} list: View all configured groups"
					+ "\n   {pn} add [tid]: Add group to list (use TID or current group)"
					+ "\n   {pn} remove [tid]: Remove group from list"
					+ "\n   {pn} r <number>: Remove group by serial number from list",
				attachment: {}
			
		}
	},

	langs: {
		vi: {
			status: "📊 **TRẠNG THÁI NHÓM**\n\n🔔 Welcome: **%1**\n👋 Leave: **%2**\n📢 GcNoti: **%3**\n🆔 ThreadID: **%4**\n📝 Nhóm: **%5**",
			enabledText: "✅ BẬT",
			disabledText: "❌ TẮT",
			turnedOn: "✅ Đã bật tất cả (welcome + leave + gcnoti) cho **%1** (TID: `%2`)",
			turnedOff: "❌ Đã tắt tất cả (welcome + leave + gcnoti) cho **%1** (TID: `%2`)",
			welcomeOn: "✅ Đã bật welcome cho **%1** (TID: `%2`)",
			welcomeOff: "❌ Đã tắt welcome cho **%1** (TID: `%2`)",
			leaveOn: "✅ Đã bật leave cho **%1** (TID: `%2`)",
			leaveOff: "❌ Đã tắt leave cho **%1** (TID: `%2`)",
			gcnotiOn: "✅ Đã bật group notification cho **%1** (TID: `%2`)",
			gcnotiOff: "❌ Đã tắt group notification cho **%1** (TID: `%2`)",
			addedCurrent: "✅ Đã thêm nhóm hiện tại vào danh sách.\nThread ID: %1\nTên nhóm: %2",
			addedSpecific: "✅ Đã thêm nhóm vào danh sách.\nThread ID: %1\nTên nhóm: %2",
			removed: "✅ Đã xóa nhóm khỏi danh sách.\nThread ID: %1",
			removedBySerial: "✅ Đã xóa nhóm khỏi danh sách.\nThread ID: %1\nTên nhóm: %2",
			alreadyExists: "⚠️ Nhóm này đã có trong danh sách rồi.",
			notInList: "⚠️ Nhóm này không có trong danh sách.",
			invalidSerial: "❌ Số thứ tự không hợp lệ. Vui lòng dùng số từ danh sách.",
			emptyList: "📋 Danh sách nhóm trống.\n\nDùng '{pn} add' để thêm nhóm.",
			listHeader: "📋 **DANH SÁCH NHÓM CÓ CẤU HÌNH**\n━━━━━━━━━━━━━━━━━━━━━\n\n",
			listItem: "%1. %2\n   TID: `%3`\n   W: %4 | L: %5 | G: %6\n",
			listFooter: "\n━━━━━━━━━━━━━━━━━━━━━\n💡 Dùng '{pn} r <số>' để xóa theo số thứ tự",
			noThreadName: "Nhóm không xác định",
			invalidThreadId: "❌ Thread ID không hợp lệ.",
			cannotGetThreadInfo: "⚠️ Không thể lấy thông tin nhóm: %1",
			syntaxError: "❌ Lệnh không hợp lệ",
			restartRequired: "\n⚠️ Vui lòng khởi động lại bot để áp dụng thay đổi gcnoti."
		},
		en: {
			status: "📊 **المجموعة STATUS**\n\n🔔 مرحبًا: **%1**\n👋 Leave: **%2**\n📢 GcNoti: **%3**\n🆔 ThreadID: **%4**\n📝 المجموعة: **%5**",
			enabledText: "✅ تشغيل",
			disabledText: "❌ إيقاف",
			turnedOn: "✅ Turned تشغيل الكل (welcome + leave + gcnoti) لـ **%1** (TID: `%2`)",
			turnedOff: "❌ Turned إيقاف الكل (welcome + leave + gcnoti) لـ **%1** (TID: `%2`)",
			welcomeOn: "✅ Turned تشغيل welcome لـ **%1** (TID: `%2`)",
			welcomeOff: "❌ Turned إيقاف welcome لـ **%1** (TID: `%2`)",
			leaveOn: "✅ Turned تشغيل leave لـ **%1** (TID: `%2`)",
			leaveOff: "❌ Turned إيقاف leave لـ **%1** (TID: `%2`)",
			gcnotiOn: "✅ Turned تشغيل المجموعة notification لـ **%1** (TID: `%2`)",
			gcnotiOff: "❌ Turned إيقاف المجموعة notification لـ **%1** (TID: `%2`)",
			addedCurrent: "✅ تمت الإضافة الحالي المجموعة إلى قائمة.\nمعرف المجموعة: %1\nاسم المجموعة: %2",
			addedSpecific: "✅ تمت الإضافة المجموعة إلى قائمة.\nمعرف المجموعة: %1\nاسم المجموعة: %2",
			removed: "✅ تمت الإزالة المجموعة من قائمة.\nمعرف المجموعة: %1",
			removedBySerial: "✅ تمت الإزالة المجموعة من قائمة.\nمعرف المجموعة: %1\nاسم المجموعة: %2",
			alreadyExists: "⚠️ هذا المجموعة هو بالفعل في ال قائمة.",
			notInList: "⚠️ هذا المجموعة هو ليس في ال قائمة.",
			invalidSerial: "❌ غير صالح serial الرقم. يرجى use a الرقم من ال قائمة.",
			emptyList: "📋 المجموعة قائمة هو empty.\n\nاستخدم '{pn} إضافة' إلى إضافة groups.",
			listHeader: "📋 **CONFIGURED GROUPS قائمة**\n━━━━━━━━━━━━━━━━━━━━━\n\n",
			listItem: "%1. %2\n   TID: `%3`\n   W: %4 | L: %5 | G: %6\n",
			listFooter: "\n━━━━━━━━━━━━━━━━━━━━━\n💡 استخدم '{pn} r <number>' إلى إزالة by serial",
			noThreadName: "غير معروف المجموعة",
			invalidThreadId: "❌ غير صالح thread المعرف.",
			cannotGetThreadInfo: "⚠️ لا يمكنك الحصول على thread info: %1",
			syntaxError: "❌ غير صالح الأمر",
			restartRequired: "\n⚠️ يرجى إعادة تشغيل البوت إلى apply gcnoti changes."
		}
	},

	ST: async function ({ args, threadsData, message, event, getLang, api }) {
		const { threadID } = event;
		const action = args[0]?.toLowerCase();

		try {
			switch (action) {
				// View current thread status
				case "status": {
					const threadData = await threadsData.get(threadID);
					const welcome = threadData.settings?.sendWelcomeMessage !== false ? getLang("enabledText") : getLang("disabledText");
					const leave = threadData.settings?.sendLeaveMessage !== false ? getLang("enabledText") : getLang("disabledText");
					const gcnoti = threadData.settings?.sendGcNoti !== false ? getLang("enabledText") : getLang("disabledText");

					return message.reply(getLang("status", welcome, leave, gcnoti, threadID, threadData.threadName));
				}

				// Turn on all features for ALL groups
				case "all": {
					if (!args[1] || !["on", "off"].includes(args[1].toLowerCase()))
						return message.SyntaxError();

					const isOn = args[1].toLowerCase() === "on";
					const allThreadsData = global.db?.allThreadData || [];
					let count = 0;

					for (const thread of allThreadsData) {
						try {
							thread.settings = thread.settings || {};
							thread.settings.sendWelcomeMessage = isOn;
							thread.settings.sendLeaveMessage = isOn;
							thread.settings.sendGcNoti = isOn;
							await threadsData.set(thread.threadID, { settings: thread.settings });
							count++;
						} catch (e) {
							// Skip threads that fail
						}
					}

					return message.reply(isOn ? `✅ Turned on all features for ${count} groups` : `❌ Turned off all features for ${count} groups`);
				}

				// Turn on all features
				case "on": {
					const threadData = await threadsData.get(threadID);
					threadData.settings = threadData.settings || {};
					threadData.settings.sendWelcomeMessage = true;
					threadData.settings.sendLeaveMessage = true;
					threadData.settings.sendGcNoti = true;
					await threadsData.set(threadID, { settings: threadData.settings });

					return message.reply(getLang("turnedOn", threadData.threadName, threadID));
				}

				// Turn off all features
				case "off": {
					const threadData = await threadsData.get(threadID);
					threadData.settings = threadData.settings || {};
					threadData.settings.sendWelcomeMessage = false;
					threadData.settings.sendLeaveMessage = false;
					threadData.settings.sendGcNoti = false;
					await threadsData.set(threadID, { settings: threadData.settings });

					return message.reply(getLang("turnedOff", threadData.threadName, threadID));
				}

				// Toggle welcome only
				case "welcome": {
					if (!args[1] || !["on", "off"].includes(args[1].toLowerCase()))
						return message.SyntaxError();

					const threadData = await threadsData.get(threadID);
					threadData.settings = threadData.settings || {};
					threadData.settings.sendWelcomeMessage = args[1].toLowerCase() === "on";
					await threadsData.set(threadID, { settings: threadData.settings });

					return message.reply(args[1].toLowerCase() === "on" ? getLang("welcomeOn", threadData.threadName, threadID) : getLang("welcomeOff", threadData.threadName, threadID));
				}

				// Toggle leave only
				case "leave": {
					if (!args[1] || !["on", "off"].includes(args[1].toLowerCase()))
						return message.SyntaxError();

					const threadData = await threadsData.get(threadID);
					threadData.settings = threadData.settings || {};
					threadData.settings.sendLeaveMessage = args[1].toLowerCase() === "on";
					await threadsData.set(threadID, { settings: threadData.settings });

					return message.reply(args[1].toLowerCase() === "on" ? getLang("leaveOn", threadData.threadName, threadID) : getLang("leaveOff", threadData.threadName, threadID));
				}

				// Toggle gcnoti only
				case "gcnoti":
				case "noti": {
					if (!args[1] || !["on", "off"].includes(args[1].toLowerCase()))
						return message.SyntaxError();

					const threadData = await threadsData.get(threadID);
					threadData.settings = threadData.settings || {};
					threadData.settings.sendGcNoti = args[1].toLowerCase() === "on";
					await threadsData.set(threadID, { settings: threadData.settings });

					return message.reply(args[1].toLowerCase() === "on" ? getLang("gcnotiOn", threadData.threadName, threadID) : getLang("gcnotiOff", threadData.threadName, threadID));
				}

				// Add thread to tracking list
				case "add": {
					const threadIdToAdd = args[1] || threadID;

					if (!/^\d+$/.test(threadIdToAdd)) {
						return message.reply(getLang("invalidThreadId"));
					}

					const threadData = await threadsData.get(threadIdToAdd);
					
					// Check if already configured
					const hasWelcomeLeave = threadData.settings?.sendWelcomeMessage !== undefined || threadData.settings?.sendLeaveMessage !== undefined;
					const hasGcnoti = threadData.settings?.sendGcNoti !== undefined;

					if (hasWelcomeLeave && hasGcnoti) {
						return message.reply(getLang("alreadyExists"));
					}

					// Add all features
					threadData.settings = threadData.settings || {};
					threadData.settings.sendWelcomeMessage = true;
					threadData.settings.sendLeaveMessage = true;
					threadData.settings.sendGcNoti = true;
					await threadsData.set(threadIdToAdd, { settings: threadData.settings });

					const threadName = threadData.threadName || getLang("noThreadName");

					if (args[1]) {
						return message.reply(getLang("addedSpecific", threadIdToAdd, threadName));
					} else {
						return message.reply(getLang("addedCurrent", threadIdToAdd, threadName));
					}
				}

				// Remove thread from tracking
				case "remove": {
					const threadIdToRemove = args[1] || threadID;

					if (!/^\d+$/.test(threadIdToRemove)) {
						return message.reply(getLang("invalidThreadId"));
					}

					const threadData = await threadsData.get(threadIdToRemove);
					
					// Check if in list
					const hasWelcomeLeave = threadData.settings?.sendWelcomeMessage !== undefined || threadData.settings?.sendLeaveMessage !== undefined;
					const hasGcnoti = threadData.settings?.sendGcNoti !== undefined;

					if (!hasWelcomeLeave && !hasGcnoti) {
						return message.reply(getLang("notInList"));
					}

					// Remove all features
					threadData.settings = threadData.settings || {};
					delete threadData.settings.sendWelcomeMessage;
					delete threadData.settings.sendLeaveMessage;
					delete threadData.settings.sendGcNoti;
					await threadsData.set(threadIdToRemove, { settings: threadData.settings });

					return message.reply(getLang("removed", threadIdToRemove));
				}

				// Remove by serial number
				case "r": {
					const serial = parseInt(args[1]);
					
					// Get all configured threads
					const allThreadsData = global.db?.allThreadData || [];
					const configuredThreads = allThreadsData.filter(t => {
						const hasWelcomeLeave = t.settings?.sendWelcomeMessage !== undefined || t.settings?.sendLeaveMessage !== undefined;
						const hasGcnoti = t.settings?.sendGcNoti !== undefined;
						return hasWelcomeLeave || hasGcnoti;
					});

					if (isNaN(serial) || serial < 1 || serial > configuredThreads.length) {
						return message.reply(getLang("invalidSerial"));
					}

					const threadToRemove = configuredThreads[serial - 1];
					const threadIdToRemove = threadToRemove.threadID;
					const threadName = threadToRemove.threadName || getLang("noThreadName");

					// Remove all features
					threadToRemove.settings = threadToRemove.settings || {};
					delete threadToRemove.settings.sendWelcomeMessage;
					delete threadToRemove.settings.sendLeaveMessage;
					delete threadToRemove.settings.sendGcNoti;
					await threadsData.set(threadIdToRemove, { settings: threadToRemove.settings });

					return message.reply(getLang("removedBySerial", threadIdToRemove, threadName));
				}

				// List all configured threads
				case "list":
				default: {
					// Get all configured threads
					const allThreadsData = global.db?.allThreadData || [];
					const configuredThreads = allThreadsData.filter(t => {
						const hasWelcomeLeave = t.settings?.sendWelcomeMessage !== undefined || t.settings?.sendLeaveMessage !== undefined;
						const hasGcnoti = t.settings?.sendGcNoti !== undefined;
						return hasWelcomeLeave || hasGcnoti;
					});

					if (configuredThreads.length === 0) {
						return message.reply(getLang("emptyList"));
					}

					let msg = getLang("listHeader");

					for (let i = 0; i < configuredThreads.length; i++) {
						const thread = configuredThreads[i];
						const threadName = thread.threadName || getLang("noThreadName");
						const welcome = thread.settings?.sendWelcomeMessage !== false ? "✅" : "❌";
						const leave = thread.settings?.sendLeaveMessage !== false ? "✅" : "❌";
						const gcnoti = thread.settings?.sendGcNoti !== false ? "✅" : "❌";

						msg += getLang("listItem", i + 1, threadName, thread.threadID, welcome, leave, gcnoti);
					}

					msg += getLang("listFooter");

					return message.reply(msg);
				}
			}
		} catch (err) {
			console.error("wlg error:", err);
			return message.reply(getLang("syntaxError"));
		}
	}
};
