const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.owner = require('./owner.model')(sequelize, Sequelize)
db.Home = require('./home.model')(sequelize, Sequelize)
db.renter = require('./renter.model')(sequelize, Sequelize)
db.user.hasMany(db.owner, { as: "owner" });
db.owner.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user"
})
db.owner.hasMany(db.Home, { as: "Home" })
db.Home.belongsTo(db.owner, {
    foreignKey: "ownerId",
    as: "owner"
})
db.user.hasMany(db.renter, { as: "renter" })
db.renter.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user"
})
db.Home.hasMany(db.renter, { as: "renter" })
db.renter.belongsTo(db.Home, {
    foreignKey: "HomeId",
    as: 'Home'
})
module.exports = db;