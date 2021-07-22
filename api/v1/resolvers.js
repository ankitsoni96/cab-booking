 const BookingsController = require('./controllers/bookings')
 const UserController = require('./controllers/user')
 
const resolver = {
   Bookings:{
       user: (parent, args, context, info) => parent.getUser(),
       cab:(parent, args, context, info) => parent.getCab(),
   },
    Query: {
        ...BookingsController.query,
        ...UserController.query
    },
    Mutation: {
        ...UserController.mutation
    }


};

module.exports = resolver;