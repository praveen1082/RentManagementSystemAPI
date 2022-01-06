const db = require("../models");
const Renter = db.renter;
const Bill = db.bill;

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ code: 400, response: { message: "entire body cannot be empty", data: null } });
        return;
    }
    if (!req.body.renterId) {
        res.status(400).send({ code: 400, response: { message: "renterId  is required to create a owner", data: null } });
        return;
    }
    if (!req.body.billFrom || !req.body.billTo) {
        return res.status(400).send({ code: 400, response: { message: "Bill from and to are required fields", data: null } })
    }

    const billObj = {
        renterId: req.body.renterId,
        billFrom: Date(req.body.billFrom),
        billTo: Date(req.body.billTO),
    };
    Renter.findByPk(req.body.renterId).then(data => {
        if (data.dateOfEntry == null) {
            Renter.update({ dateofEntry: req.body.billFrom }, { where: { id: req.body.renterId } }).then(data => {

            }).catch(err => {
                return res.status(404).send({ code: 404, response: { message: "cannot find renter with given id" } });
            })
        }
    }).catch(err => {
        res.status(404).send({ code: 404, response: { message: "Renter with given id was not found", data: err } })
    })
    Bill.create(billObj).then(billdata => {
        Renter.findByPk(req.body.renterId).then(renterData => {
            if (renterData) {
                return res.status(200).send({ code: 200, response: { message: "Successfully created bill for the renter", data: billdata } })
            }
        }).catch(err => {
            return res.status(404).send({
                code: 404,
                response: {
                    "message": 404,
                    "data": err
                }
            })
        })
    }).catch(err => {
        return res.status(500).send({ code: 500, response: { message: "error while creating bill", data: err } })
    })
    exports.findOne = (req, res) => {
        const id = req.params.renterId;
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
                            message: `Cannot find bill with id=${id}.`,
                            data: null
                        }
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    code: 500,
                    response: {
                        message: "Error retrieving bill with id=" + id,
                        data: err
                    }
                });
            });
    };
};