module.exports = (sequelize, Sequelize) => {
    const owner = sequelize.define("owner", {
        noofHouse: {
            type: Sequelize.INTEGER,

        },
        location: {
            type: Sequelize.STRING,
        },
    });

    return owner;
};