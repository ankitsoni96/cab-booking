var apolloServer = require('apollo-server-express');
var express = require('express');
var typeDefs = require("./api/v1/schema");
var resolvers = require("./api/v1/resolvers");
var db = require("./api/v1/models");
const config = require('./api/utils/config')
var http = require('http')
const listenAt = 'http'

var server;

const apollo = new apolloServer.ApolloServer({
    cors: {
        origin: '*',			// <- allow request from all domains
        credentials: true
    },
    typeDefs: apolloServer.gql(typeDefs),     // Schema
    resolvers,                                // Resolver
    context: ({ req }) => {
        return { db, token: req.headers.authorization }
    }
})

const app = express();



apollo.applyMiddleware({
    app,
    bodyParserConfig: {
        limit: '100mb',
    },
})

server = http.createServer(app)

app.use(express.static("app/public"));

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, token, language');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use((req, res, next) => {
    req.db = db
    next()
})

db.sequelize.sync().then(() => {
    server.listen(config.port, () => {
         console.log(`Server Started at ${listenAt}://${config.host}:${config.port}`)
//  CREATE USER FOR FIRST TIME JUST FOR TESTING
        db.users.findOrCreate({
            where: {
                email: "test@gmail.com"
              },
              defaults: { 
                email:"test@gmail.com",
                first_name:"test",
                last_name:"testing",
                password:"123456"
              }
        })
//  CREATE CAB FOR FIRST TIME JUST FOR TESTING
        db.cabs.findOrCreate({
            where: {
                title: "test cab"
              },
              defaults: { 
                "title": "test cab",
                "driver_name": "t for test",
                "latitude": "23.0676",
                "longitude": "72.5667",
                "car_number": "GJ1AB1234",
                "car_type": "1"
              }
        })
    });
});
