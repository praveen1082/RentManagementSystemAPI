const db = require("../models");
const Home = db.home;
const Owner = db.owner;
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ code: 400, message: "entire body cannot be empty" });
        return;
    }
    if (!req.body.ownerId) {
        res.status(400).send({ code: 400, message: "OwnerId  is required to create a owner" });
        return;
    }

    const homeObj = {
        ownerId: req.body.ownerId,
        noofFloors: req.body.noofFloors == null ? 1 : req.body.noofFloors,
        availableNumber: req.body.availableNumber == null ? 1 : req.body.noofFloors,
        ownerStays: req.body.ownerStays == null ? true : req.body.ownerStays,
    };
    Home.create(homeObj).then(homedata => {
        Owner.findByPk(req.body.ownerId).then(OwnerData => {
            if (OwnerData) {
                return res.status(200).send({ code: 200, response: { message: "Successfully created home", data: homedata } })
            }
        }).catch(err => {
            return res.status(404).send({
                code: 404,
                response: {
                    message: "Owner with given id not found",
                    data: err
                }
            })
        })
    }).catch(err => {
        return res.status(500).send({ code: 500, response: { message: "error while creating house", data: err } })
    })


};
exports.update = (req, res) => {
    const id = req.params.houseId;
    // console.log(req.params.userId);
    User.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    code: 200,
                    response: {
                        message: "house updated successfully",
                    }
                });
            } else {
                res.status(500).send({
                    code: 500,
                    response: {
                        message: `Cannot update house with id=${id}. Maybe house was not found or req.body is empty!`,
                        data: null
                    }
                });

            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                response: {
                    message: `Cannot update house with id=${id}. Maybe house was not found or req.body is empty!`,
                    data: err
                }
            });
        });
};
exports.findAll = (req, res) => {
    Home.findAll().then(data => {
        var dataList = data;
        res.status(200).send({
            code: 200,
            response: {
                message: "Successfully fetched all houses",
                data: dataList
            }
        });
    }).catch(err => {
        res.status(500).send({
            code: 500,
            response: {
                code: 500,
                message: "Cannot fetch all houses"
            }
        })
    })
}
exports.findOne = (req, res) => {
    const id = req.params.homeId;
    Home.findByPk(id)
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
                        message: `Cannot find home with id=${id}.`,
                        data: null
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                response: {
                    message: "Error retrieving home with id=" + id,
                    data: err
                }
            });
        });
};