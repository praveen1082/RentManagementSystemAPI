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
        totalAmount: {
            type: Sequelize.INTEGER,
        }

    });

    return bill;
};