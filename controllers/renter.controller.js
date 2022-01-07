const db = require("../models");
const User = db.user;
const Home = db.home;
const Renter = db.renter;

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ code: 400, message: "entire body cannot be empty" });
        return;
    }
    if (!req.body.userId) {
        res.status(400).send({ code: 400, message: "userId  is required to create a owner" });
        return;
    }
    if (!req.body.homeId) {
        res.status(400).send({ code: 400, message: "homeId is required" });
        return;
    }
    if (!req.body.rentAmt) {
        return res.status(400).send({ code: 400, response: { message: "rentAmt per month is required" } })
    }
    if (!req.body.electricityPresentMeter) {
        return res.status(400).senf({ code: 400, response: { message: "please enter present electricity meter" } })
    }

    const renterObj = {
        rentAmt: req.body.rentAmt != null ? req.body.rentAmt : 0,
        electricityInitialMeter: req.body.electricityInitialMeter != null ? req.body.electricityInitialMeter : 0,
        electricityPresentMeter: req.body.electricityPresentMeter != null ? req.body.electricityPresentMeter : 0,
        userId: req.body.userId,
        homeId: req.body.homeId,
        waterAmt: req.body.waterAmt != null ? req.body.waterAmt : 0,
        roomType: req.body.roomType != null ? req.body.roomType : "Not Specified",
    };
    Renter.create(renterObj).then(renterdata => {
        User.findByPk(req.body.userId).then(userdata => {
            Home.findByPk(req.body.homeId).then(homedata => {
                res.status(200).send({
                    code: 200,
                    response: {
                        message: "Successfully created renter",
                        data: renterdata
                    }
                })
            }).catch(err => {
                res.status(404).send({
                    code: 404,
                    response: {
                        message: "cannot find home with the given homeId",
                        data: err
                    }
                })
            })
        }).catch(err => {
            res.status(404).send({
                code: 404,
                response: {
                    message: "cannot find home with the given homeId",
                    data: err
                }
            })
        })
    }).catch(err => {
        res.status(500).send({
            code: 500,
            response: {
                code: 500,
                data: err
            }
        })
    })

};
exports.findAll = (req, res) => {
    Renter.findAll().then(data => {
        var dataList = data;
        res.status(200).send({
            code: 200,
            response: {
                message: "Successfully fetched all renters",
                data: dataList
            }
        });
    }).catch(err => {
        res.status(500).send({
            code: 500,
            response: {
                code: 500,
                message: "Cannot fetch all renters"
            }
        })
    })
}
exports.findOne = (req, res) => {
    const id = req.params.renterId;
    Renter.findByPk(id)
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
                        message: `Cannot find user with id=${id}.`,
                        data: null
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                response: {
                    message: "Error retrieving renter with id=" + id,
                    data: err
                }
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.renterId;
    // console.log(req.params.userId);
    User.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    code: 200,
                    response: {
                        message: "Renter updated successfully",
                    }
                });
            } else {
                res.status(500).send({
                    code: 500,
                    response: {
                        message: `Cannot update renter with id=${id}. Maybe renter was not found or req.body is empty!`,
                        data: null
                    }
                });

            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                response: {
                    message: `Cannot update renter with id=${id}. Maybe renter was not found or req.body is empty!`,
                    data: err
                }
            });
        });
};