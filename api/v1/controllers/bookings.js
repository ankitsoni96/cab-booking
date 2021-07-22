const responseHelper = require('../../utils/responseHelper');
const bookingHelper = require('../helpers/bookingsHelper')

module.exports = {
    query: {
        async bookingHistory(parent, args, { db }, info) {
            try {
              const data = await bookingHelper.bookings(parent, args, { db }, info);
              return responseHelper.success(null, "en", { total_count: data.total_count, bookings: data.bookings }, "GET_BOOKING_HISTORY_SUCCESSFULLY");
            } catch (error) {
              return responseHelper.error(null, "en", error);
            }
          },
    }
}