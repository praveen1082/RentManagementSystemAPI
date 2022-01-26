module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        isOwner: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    });

    return user;
};