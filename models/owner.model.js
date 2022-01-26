module.exports = (sequelize, Sequelize) => {
    const owner = sequelize.define("owner", {
        noofHouse: {
            type: Sequelize.INTEGER,
            default: 1,

        },
        location: {
            type: Sequelize.STRING,
            default: "Kathmandu"
        },
        userId: {
            type: Sequelize.INTEGER,
            nullable: false,
        }

    });

    return owner;
};