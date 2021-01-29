const db = require("../models");
const Renter = db.renter;
const Owner = db.owner;
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
    if (!billFrom || !billTo) {
        return res.status(400).send({ code: 400, response: { message: "Bill from and to are required fields", data: null } })
    }

    const billObj = {
        renterId: req.body.renterId,
        billFrom: req.body.billFrom,
        billTo: req.body.billTO,
    };
    Bill.create(billObj).then(billdata => {
        Renter.findByPk(req.body.renterId).then(renterData => {
            if (renterData) {
                return res.status(200).send({ code: 200, response: { message: "Successfully created renter", data: billdata } })
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
        return res.status(500).send({ code: 500, response: { message: "error while creating house", data: err } })
    })
};