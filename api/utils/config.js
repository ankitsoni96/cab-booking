module.exports = (function () {
   process.env.NODE_ENV='development';
  console.log('Node Environment :', process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') {
    return {
      // Database configuration
      db: {
        host: 'localhost',
        database: 'cab_booking',
        user: 'root',
        password: 'root',
      },
      host: 'localhost',
      port: 3005,
    }
  }
  else if (process.env.NODE_ENV === 'sandbox') {
    return {
      // Database configuration
      db: {
        host: 'localhost',
        database: 'cab_booking',
        user: 'root',
        password: 'root',
      },
      host: 'localhost',
      port: 3005,
    }
  }
  else {
    // return if development
    return {
      // Database configuration
      db: {
        host: 'localhost',
        database: 'cab_booking',
        user: 'root',
        password: 'root',
      },
      host: 'localhost',
      port: 3005,
    }
  }
})()
