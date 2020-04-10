const cors = require('cors');
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql-schema/schema');

const { port } = require('./config');

const app = express();

app.use(cors());

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});