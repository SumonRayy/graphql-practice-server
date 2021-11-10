const express = require('express');
const app = express();
const PORT = process.env.PORT || 6969;
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schemas/Schema.js');


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.get('/', (req, res) => {
    res.send('Hello World!<br /> This is a GraphQL Practice Server!');
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});