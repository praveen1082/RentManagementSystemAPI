const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Home = db.Home;
const Op = db.Sequelize.Op;


// Create and Save a new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ code: 400, message: "entire body cannot be empty, firstname,lastname,phone are required field" });
        return;
    }
    if (!req.body.userId) {
        res.status(400).send({ code: 400, message: "userId  is required to create a owner" });
        return;
    }
    const homeObj = {
        noofFloors: req.body.noofFloors == null ? 1 : req.body.noofFloors,
        availableNumber: req.body.availableNumber,
        ownerStays: req.body.ownerStays,
        userId: req.body.userId,

    };
    Home.create(homeObj).then(homedata => {
        console.log(req.body.userId)
        User.findByPk(req.body.userId)
            .then(data => {
                console.log("working till here", data.isOwner);
                if (data) {
                    console.log("<MMMMMMMMMMMMMMMMMMMMMMMM>")
                    if (data.isOwner) {
                        console.log("<MMMMMMMMMMMMMMMMMMMMMMMM>")
                        return res.status(200).send({ code: 200, message: "Success", data: data });
                    } else {
                        return res.status(404).send({ code: 404, message: "only owners can have house" });
                    }

                } else {
                    res.status(404).send({
                        code: 404,
                        message: `Cannot find user with id=${id}. unable to create home`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });

    }).catch(err => {
        res.status(500).send({ code: 500, message: "not found user with the given id" });
    })
};