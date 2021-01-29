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