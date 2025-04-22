const express = require('express');
const app = express();
const db = require('./models/index');
const bodyParser = require('body-parser');
const AuthRouter = require('./routes/school.routes')
require('dotenv').config();

app.use(express.json());
const port = process.env.PORT;
app.use('/api/schools', AuthRouter);

db.sequelize.sync({force: false})
.then(() => {
    console.log("Database connected successfully...");
})
.catch( (error) => {
    console.log("Error: " + error);
});

app.listen(port, () => {
    console.log(`Server is listed on port ${port}`);
});