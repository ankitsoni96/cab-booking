const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const bookingHelper = {
    bookings: async (parent, args, { db }, info) => {
        let query = {
            include: [{
                model: db.users,
                as: 'user',
            }],
            include: [{
                model: db.cabs,
                as: 'cab',
            }],
           where :{
               user_id:+args.user_id
           },
            offset: args.offset ? +args.offset : undefined,
            limit: args.limit ? +args.limit : undefined,
        }
        let data = await db.bookings.findAndCountAll(query)
        return { total_count: data.count, bookings: data.rows };
    }
}

module.exports = bookingHelper;