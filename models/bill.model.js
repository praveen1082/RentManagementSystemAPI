module.exports = (sequelize, Sequelize) => {
    const bill = sequelize.define("bill", {
        billFrom: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        billTo: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },

    });

    return bill;
};