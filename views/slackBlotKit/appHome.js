module.exports = () => ({
	type: "home",
	title: {
		type: "plain_text",
		text: "Slack Status Updater",
	},
	blocks: [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "*Welcome!* \nThis is the home for Status Updater app. You can update your slack status here.",
			},
			accessory: {
				type: "button",
				action_id: "open_status_updater_form",
				text: {
					type: "plain_text",
					text: "Update Your Status",
				},
			},
		},
		{ type: "divider" },
	],
});
