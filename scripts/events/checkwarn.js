module.exports = {
	config: {
		name: "checkwarn",
		version: "1.3",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			warn: "Thành viên %1 đã bị cảnh cáo đủ 3 lần trước đó và bị ban khỏi box chat\n- Name: %1\n- Uid: %2\n- Để gỡ ban vui lòng sử dụng lệnh \"%3warn unban <uid>\" (với uid là uid của người muốn gỡ ban)",
			needPermission: "Bot cần quyền quản trị viên để kick thành viên bị ban"
		},
		en: {
			warn: "العضو %1 تم warned 3 times سابقًا و تم محظور من ال chat المجموعة\n- الاسم: %1\n- Uid: %2\n- إلى إلغاء الحظر, يرجى use ال \"%3تحذير إلغاء الحظر <uid>\" الأمر (مع uid هو ال uid من ال الشخص أنت want إلى إلغاء الحظر)",
			needPermission: "البوت يحتاج إلى المشرف صلاحية إلى طرد محظور الأعضاء"
		}
	},

	onStart: async ({ threadsData, message, event, api, client, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const { threadID } = event;
				const { data } = await threadsData.get(event.threadID);
				const { warn: warnList } = data;
				if (!warnList)
					return;
				const { addedParticipants } = event.logMessageData;
				for (const user of addedParticipants) {
					const findUser = warnList.find(user => user.userID == user.userID);
					if (findUser && findUser.list >= 3) {
						const userName = user.fullName;
						const uid = user.userFbId;
						message.send({
							body: getLang("warn", userName, uid, client.getPrefix(threadID)),
							mentions: [{
								tag: userName,
								id: uid
							}]
						}, function () {
							api.removeUserFromGroup(uid, threadID, (err) => {
								if (err)
									return message.send(getLang("needPermission"));
							});
						});
					}
				}
			};
	}
};