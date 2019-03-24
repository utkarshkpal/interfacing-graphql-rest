const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const {createStore} = require('./utils');

const store = createStore();

const server = new ApolloServer({
    typeDefs,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({store})
    })
});

server
    .listen()
    .then(({url}) => {
        console.log(`🚀 Server ready at ${url}`);
    });
