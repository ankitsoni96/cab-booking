CAB BOOKING

Technology used
 - Node.js
 - GraphQL
 - Sequelize
 - MySQL

Steps to start the project

1. npm instal (It will install all dependencies).
2. node server.js (It will start the server on port 3005). It will automatically insertes one user     and cab just for testing.
3. Enter the URL http://localhost:3005/graphql to test the APIs.

Following are the GraphQL queries.

1. Booking history by user_id

query{
  bookingHistory(offset:0,limit:5,user_id:"1"){
    code
    message
    status
    total_count
    bookings{
      current_lat
      destination_lat
      destination_long
      id
      created_at
      user{
        first_name
        last_name
        email
      }
      cab{
        id
        title
        driver_name
        latitude
        longitude
        car_number
         car_type
        is_active
         created_at
        updated_at
      }
    }
  }
}

2. Get nearby cabs.

query {
  nearByCabs(offset: 0, limit: 1, user_lat: "23.0000", user_long: "70.0000") {
    code
    message
    status
    total_count
    cabs {
      title
      driver_name
      latitude
      longitude
      car_number
      car_type
    }
  }
}


3. Book a cab.

mutation{
  bookCab(user_id:"1",cab_id:"1",current_lat:"10.111",current_long:"12.111",destination_lat:"15.1212",destination_long:"17.2345")
}
 
 