const common = require('../../utils/common');
const joi = require('@hapi/joi');

class userValidator {
	async validateBookCabRequest(body) {
		const schema = joi.object().keys({
            current_lat:joi.string().strict().trim().required(),
            current_long:joi.string().strict().trim().required(),
            destination_lat:joi.string().strict().trim().required(),
            destination_long:joi.string().strict().trim().required(),
            user_id:joi.string().strict().trim().required(),
            cab_id:joi.string().strict().trim().required(),
		})
		await common.validateJoiSchema(schema, body)
	}

}

module.exports = new userValidator()
