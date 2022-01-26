const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Owner = db.owner;
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
    if (!req.body.location) {
        res.status(400).send({ code: 400, message: "location is required" });
        return;
    }

    const ownerObj = {
        noofHouse: req.body.noofHouse == null ? 1 : req.body.noofHouse,
        location: req.body.location,
        userId: req.body.userId,

    };
    Owner.create(ownerObj).then(ownerdata => {
        console.log(data.userId)
            // if (userobj.isOwner) {
            //     const ownerObj = {
            //         noofHouse: req.body.noofHouse,
            //         location: req.body.location,
            //         userId: data.userId,
            //     }
            //     Owner.create(ownerObj).then(ownerdata => {
            //         res.status(200).send({ code: 200, message: { "location": ownerdata.location, "isOwner": data.isOwner, "firstName": data.firstName, "email": data.email, "phone": data.phone } })
            //     })
            // }
        User.findByPk(ownerdata.userId)
            .then(data => {
                if (data) {
                    User.update({ isOwner: true }).then(a => {
                        res.status(200).send({ code: 200, message: "Successfully created owner", data: { userId: data.userId, email: data.email } });
                    }).catch(err => {
                        res.status(500).send({ code: 500, message: err });
                    })

                } else {
                    res.status(404).send({
                        code: 404,
                        message: `Cannot find user with id=${id}. unable to create owner`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving user with id during owner creation=" + data.userId
                });
            });

    }).catch(err => {
        res.status(500).send({ code: 500, message: err });
    })
};