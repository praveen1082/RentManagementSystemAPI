module.exports = (sequelize, Sequelize) => {
    const renter = sequelize.define("renter", {
        rentAmt: {
            type: Sequelize.INTEGER,
            default: 0,
            allowNull: false,
        },
        electricityInitialMeter: {
            type: Sequelize.INTEGER,
            default: 0,
        },
        electricityPresentMeter: {
            type: Sequelize.INTEGER,
            default: 1,
        },
        electricityAmt: {
            type: Sequelize.INTEGER,
            default: 0,
        },
        WaterAmt: {
            type: Sequelize.INTEGER,
            default: 0,

        },
        roomType: {
            type: Sequelize.STRING,
        }

    });

    return renter;
};