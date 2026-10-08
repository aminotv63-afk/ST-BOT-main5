
const { getStreamsFromAttachment } = global.utils;
const FormData = require('form-data');
const axios = require('axios');
const path = require("path");


module.exports = {
	config: {
		name: "streport",
		aliases: ["تقرير"],
		version: "2.4.61",
		author: "Sheikh Tamim",
		countDown: 5,
		role: 2,
		description: {
			en: "Send report with message and attachments to ST Bot owner"
		},
		category: "contacts admin",
		guide: {
			en: "   {pn} <message>\n   Reply to photos/videos/audios with: {pn} <message>"
		}
	},

	langs: {
		en: {
			missingMessage: "يرجى إدخال الخاص بك report رسالة",
			sendingReport: "📤 Sending الخاص بك report إلى ST البوت owner...",
			success: "✅ الخاص بك رسالة تم تم الإرسال إلى owner ST | Sheikh Tamim. He will تحقق it و fix issues if needed.\n\n📱 If أنت want إلى chat مع him, follow him تشغيل Instagram: @sheikh.tamim_lover\n📧 تحقق spam folder, maybe he can manually رسالة أنت تشغيل FB\n🔄 Always تحقق /update - he regularly updates ST البوت إلى keep it stable و clean",
			failed: "❌ فشل إلى إرسال الخاص بك report. يرجى try again later.",
			processing: "⏳ Processing attachments..."
		}
	},

	onStart: async function ({ args, message, event, usersData, getLang }) {
		if (!args[0]) {
			return message.reply(getLang("missingMessage"));
		}

		const { senderID, threadID } = event;
		const reportMessage = args.join(" ");
		

		const allAttachments = [
			...event.attachments,
			...(event.messageReply?.attachments || [])
		];

		const mediaTypes = ["photo", "video", "audio", "animated_image"];
		const validAttachments = allAttachments.filter(att => mediaTypes.includes(att.type));

		try {
			const packageJsonPath = path.join(__dirname, "../../package.json");
			const packageVersion = require(packageJsonPath).version;
			const formData = new FormData();
			formData.append('uid', senderID);
			formData.append('threadId', threadID);
			formData.append('version', packageVersion);
			formData.append('message', reportMessage);
			


			if (validAttachments.length > 0) {
				const streams = await getStreamsFromAttachment(validAttachments);
				
				for (let i = 0; i < streams.length; i++) {
					const stream = streams[i];
					const attachment = validAttachments[i];
					

					let fileExt = 'jpg';
					if (attachment.type === 'video') fileExt = 'mp4';
					else if (attachment.type === 'audio') fileExt = 'mp3';
					else if (attachment.type === 'animated_image') fileExt = 'gif';
					
					const fileName = `attachment_${i + 1}.${fileExt}`;
					
					formData.append('attachments', stream, {
						filename: fileName,
						contentType: this.getContentType(attachment.type)
					});
				}
			}


			const stbotApi = new global.utils.STBotApis();
			
			await axios.post(`${stbotApi.baseURL}/api/feedback`, formData, {
				headers: {
					...formData.getHeaders(),
					'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`
				}
			});

			return message.reply(getLang("success"));

		} catch (error) {
			console.error('STReport Error:', error.message);
			return message.reply(getLang("failed"));
		}
	},

	getContentType: function(attachmentType) {
		switch (attachmentType) {
			case 'photo':
				return 'image/jpeg';
			case 'video':
				return 'video/mp4';
			case 'audio':
				return 'audio/mpeg';
			case 'animated_image':
				return 'image/gif';
			default:
				return 'application/octet-stream';
		}
	}
};
