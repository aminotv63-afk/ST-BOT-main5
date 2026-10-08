odule.exports = {
	config: {
		name: "commandName",
		aliases: ["أمر_جديد"], // Name of command, it must be unique to identify with other commands
		version: "1.1", // Version of command
		author: "NTKhang", // Author of command
		countDown: 5, // Time to wait before executing command again (seconds)
		role: 0, // Role of user to use this command (0: normal user, 1: admin box chat, 2: owner bot)
		shortDescription: {
			vi: "هذا وصف مختصر للأمر",
			en: "هذا وصف مختصر للأمر"
		}, // Short description of command
		description: {
			vi: "هذا وصف تفصيلي للأمر",
			en: "هذا وصف تفصيلي للأمر"
		}, // Long description of command
		category: "categoryName", // Category of command
		guide: {
			vi: "طريقة استخدام الأمر",
			en: "طريقة استخدام الأمر"
		} // Guide of command
	},

	langs: {
		vi: {
			hello: "مرحبًا",
			helloWithName: "مرحبًا، معرّف فيسبوك الخاص بك هو %1"
		}, // Vietnamese language
		en: {
			hello: "مرحبًا بالعالم",
			helloWithName: "مرحبًا، معرّف فيسبوك الخاص بك هو %1"
		} // English language
	},
	usePrefix: true, // so if true then it work as using prefix if false then which only specific command will response without prefix just using cmds name by work.
	premium: true, // if true then only work for premium acess has users .

	// onStart is a function that will be executed when the command is executed
	onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
		// YOUR CODE HERE, use console.log() to see all properties in variables above


		// getLang is a function to get language of command

		// getLang without parameter is a function to get language of command without parameter
		message.reply(getLang("hello"));
		// getLang with parameter is a function to get language of command with parameter (delete // in line below to test)
		// message.reply(getLang("hello", event.senderID));

	}
};