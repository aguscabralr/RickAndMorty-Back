const server = require('./app');
const { database } = require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

database.sync({ alter: true })
.then(() => {
    server.listen(PORT, () => {
        console.log(`Listen server on port: ${PORT}`)
    });
})
.catch((error) => {
    console.log(error.message);
});