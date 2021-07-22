const tools = require('graphql-tools');
const GJSON = require('graphql-type-json');

const makeExecutableSchema = tools.makeExecutableSchema;
const GraphQLJSON = GJSON.GraphQLJSON;

const schema = `
    scalar JSON

    type Users {
        id:Int!
        first_name:String!
        last_name:String!
        email:String!
    }

    type Bookings {
        id:Int!
        current_lat:String
        current_long:String
        destination_lat:String
        destination_long:String
        status:Int
        created_at:String
        user:Users
        cab:Cabs
    }

    type Cabs {
        id:Int
        title:String
        driver_name:String
        latitude:String
        longitude:String
        car_number:String
        car_type:String
        is_active:Int
        created_at:String
        updated_at:String
    }


    type AllBookingConnection {
        code:Int
        message:String
        status:String
        total_count:Int
        bookings: [Bookings]
    }

    type AllCabsConnection {
        code:Int
        message:String
        status:String
        total_count:Int
        cabs: [Cabs]
    }
    
    type AllBookCabConnection {
        code:Int
        message:String
        status:String
    }

    scalar data
    
    type Query {
        bookingHistory(offset:Int,limit:Int,user_id:String):AllBookingConnection
        nearByCabs(offset:Int,limit:Int,user_lat:String!,user_long:String!):AllCabsConnection 
    }

    type Mutation {
        bookCab(user_id:String!,cab_id:String!,current_lat:String!,current_long:String!,destination_lat:String!,destination_long:String!):data
    }
`

module.exports = schema;