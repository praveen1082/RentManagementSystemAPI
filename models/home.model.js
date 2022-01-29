module.exports = (sequelize, Sequelize) => {
    const Home = sequelize.define("Home", {
        noofFloors: {
            type: Sequelize.INTEGER,
            default: 1,
        },
        availableNumber: {
            type: Sequelize.INTEGER,
            default: 1,
        },
        ownerStays: {
            type: Sequelize.BOOLEAN,
            default: true,
        },
    });

    return Home;
};