const db = require("../models");
const User = db.user;
const Owner = db.owner;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ code: 400, message: "entire body cannot be empty" });
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
        console.log(req.body.userId)
        User.findByPk(req.body.userId)
            .then(data => {
                console.log(data);
                if (data) {
                    var updateValues = { isOwner: true };
                    User.update(updateValues, { where: { id: req.body.userId } }).then(a => {
                        res.status(200).send({ code: 200, message: "Successfully created owner", data: { userId: data.id, email: data.email } });
                    }).catch(err => {
                        res.status(500).send({ code: 500, message: "here.." });
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
                    message: "Error retrieving user with id during owner creation=" + req.body.userId
                });
            });

    }).catch(err => {
        res.status(500).send({ code: 500, message: "not found user with the given id" });
    })
};