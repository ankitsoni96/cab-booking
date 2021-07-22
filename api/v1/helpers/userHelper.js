const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const userHelper = {
    getNearbyCabs: async (parent, args, { db }, info) =>{       
        let query=`SELECT * FROM cabs WHERE (6371 * acos(cos(radians("${args.user_lat}")) * cos(radians(latitude)) * cos(radians("${args.user_long}") - radians(longitude)) + sin(radians("${args.user_lat}")) * sin(radians(latitude)))) <= 500 AND is_active=1 LIMIT ${args.offset}, ${args.limit}`

        let totalQuery = `SELECT count(*) as total FROM cabs WHERE (6371 * acos(cos(radians("${args.user_lat}")) * cos(radians(latitude)) * cos(radians("${args.user_long}") - radians(longitude)) + sin(radians("${args.user_lat}")) * sin(radians(latitude)))) <= 500`

        let data = await db.sequelize.query(query)
        let total = await db.sequelize.query(totalQuery)

        return {total_count: total[0][0].total, cabs: data[0]}
    },

    bookCab: async (parent, args, { db }, info) => {
         db.bookings.create({
            current_lat:args.current_lat,
            current_long:args.current_long,
            destination_lat:args.destination_lat,
            destination_long:args.destination_long,
            user_id:+args.user_id,
            cab_id:+args.cab_id
        })
    }
}

module.exports=userHelper;