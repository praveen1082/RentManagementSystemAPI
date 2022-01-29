module.exports = (sequelize, Sequelize) => {
    const home = sequelize.define("home", {
        noofFloors: {
            type: Sequelize.INTEGER,
        },
        availableNumber: {
            type: Sequelize.INTEGER,
        },
        ownerStays: {
            type: Sequelize.BOOLEAN,
        },
    });

    return home;
};