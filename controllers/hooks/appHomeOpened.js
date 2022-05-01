/* Slash Command to toggle presence status for a user. */
const axios = require("axios");

module.exports = async (req, res) => {
	const message = (text) =>
		res.json({
			text,
			response_type: "ephemeral",
		});
	try {
		res.send(req.body.challenge);
	} catch (err) {
		console.log(err);
		res.send("");
	}
};
