const getTodayISOString = require("../../utils/getTodayISOString");
const getBaseExpiryISOTime = require("../../utils/getBaseExpiryISOTime");

module.exports = () => {
	const initialExpiryDate = getTodayISOString();
	const initialExpiryTime = getBaseExpiryISOTime();

	const modal = {
		type: "modal",
		title: {
			type: "plain_text",
			text: "Update Your Slack Status",
		},
		submit: {
			type: "plain_text",
			text: "Update",
		},
		close: {
			type: "plain_text",
			text: "Cancel",
		},
		blocks: [
			{
				type: "input",
				block_id: "status_text_and_emoji",
				label: {
					type: "plain_text",
					text: "Status Emoji & Text",
				},
				element: {
					action_id: "status_text_and_emoji",
					type: "plain_text_input",
					placeholder: {
						type: "plain_text",
						text: "For Example: Cycling",
					},
					multiline: false,
				},
			},
			{
				type: "input",
				block_id: "status_expiry_time",
				label: {
					type: "plain_text",
					text: "Status Expiry Date",
				},
				element: {
					action_id: "status_expiry_time",
					type: "timepicker",
					initial_time: initialExpiryTime,
				},
			},
			{
				type: "input",
				block_id: "status_expiry_date",
				label: {
					type: "plain_text",
					text: "Status Expiry Date",
				},
				element: {
					action_id: "status_expiry_date",
					type: "datepicker",
					initial_date: initialExpiryDate,
				},
			},
		],
	};
	return modal;
};
