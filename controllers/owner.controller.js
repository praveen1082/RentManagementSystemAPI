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
                        res.status(200).send({
                            code: 200,
                            response: {
                                message: "Successfully created owner",
                                data: { userId: data.id, email: data.email }
                            }
                        });
                    }).catch(err => {
                        res.status(500).send({
                            code: 500,
                            response: {
                                messgae: "Error while updating user isOwner value",
                                data: err
                            }
                        });
                    })

                } else {
                    res.status(404).send({
                        code: 404,
                        response: {
                            message: `Cannot find owner with id=${id}. unable to create owner`,
                            data: null
                        }

                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    code: 500,
                    response: {
                        message: "Error retrieving owner with id during owner creation=" + req.body.userId,
                        data: err
                    }
                });
            });

    }).catch(err => {
        res.status(500).send({
            code: 500,
            response: {
                message: "not found user with the given id",
                data: err
            }
        });
    })



};
exports.update = (req, res) => {
    const id = req.params.ownerId;
    // console.log(req.params.userId);
    User.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    code: 200,
                    response: {
                        message: "owner updated successfully",
                    }
                });
            } else {
                res.status(500).send({
                    code: 500,
                    response: {
                        message: `Cannot update owner with id=${id}. Maybe owner was not found or req.body is empty!`,
                        data: null
                    }
                });

            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                response: {
                    message: `Cannot update owner with id=${id}. Maybe owner was not found or req.body is empty!`,
                    data: err
                }
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.ownerId;
    Owner.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send({
                    code: 200,
                    response: {
                        message: "Success",
                        data: data
                    }
                });
            } else {
                res.status(404).send({
                    code: 404,
                    response: {
                        message: `Cannot find owner with id=${id}.`,
                        data: null
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                response: {
                    message: "Error retrieving owner with id=" + id,
                    data: err
                }
            });
        });
};
exports.findAll = (req, res) => {
    Owner.findAll().then(data => {
        var dataList = data;
        res.status(200).send({
            code: 200,
            response: {
                message: "Successfully fetched all owners",
                data: dataList
            }
        });
    }).catch(err => {
        res.status(500).send({
            code: 500,
            response: {
                code: 500,
                message: "Cannot fetch all owners"
            }
        })
    })
}