/* Require For Controllers */
const { response, request } = require('express');


/* Controllers App */
const main = async(req = request, res = response) => {
	res.json({
		message: "Main Page"
	});
}

/* Create Exports */
module.exports = {
	main
}