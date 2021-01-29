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
db.owner = require('./owner.model')(sequelize, Sequelize);
db.home = require('./home.model')(sequelize, Sequelize);
db.renter = require('./renter.model')(sequelize, Sequelize);
db.bill = require('./bill.model')(sequelize, Sequelize)
db.owner.hasMany(db.home, { as: "home" });
db.home.belongsTo(db.owner, {
    foreignKey: "ownerId",
    as: "owner"
});
db.user.hasMany(db.renter, { as: "renter" })
db.renter.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user"
});
db.home.hasMany(db.renter, { as: "renter" })
db.renter.belongsTo(db.home, {
    foreignKey: "homeId",
    as: 'home'
})
db.user.hasMany(db.owner, { as: "owner" });
db.owner.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user"
})
db.bill.belongsTo(db.renter, {
    foreignKey: 'renterId',
    as: 'renter'
})

module.exports = db;