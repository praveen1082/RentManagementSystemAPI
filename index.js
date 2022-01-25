const express = require('express');
const cors = require('cors');
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};
global.__basedir = __dirname;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "Hello world" });
})
const db = require("./models");

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
require("./routes/user.routes")(app);
require("./routes/file.route")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});