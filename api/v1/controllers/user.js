const responseHelper = require('../../utils/responseHelper')
const userValidator = require('../validators/userValidation')
const userHelper = require('../helpers/userHelper')

module.exports = {
    query: {
        async nearByCabs (parent, args, { db }, info) {
            try {
              const data = await userHelper.getNearbyCabs(parent, args, { db }, info);
              return responseHelper.success(null, "en", { total_count: data.total_count, cabs: data.cabs }, "SUCCESS");
            } catch (error) {
              return responseHelper.error(null, "en", error);
            }
          },
    },

    mutation:{
        async bookCab (parent, args, { db }, info) {
            try {
                await userValidator.validateBookCabRequest(args);
                await userHelper.bookCab(parent, args, { db }, info);
              return responseHelper.success(null, "en", {}, "CAB_BOOKED_SUCCESSFULLY");
            }catch(error){
                return responseHelper.error(null, "en", error);
            }
        }
    }
}