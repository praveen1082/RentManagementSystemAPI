// const { user } = require("../models");
const db = require("../models");
// const User = db.user;
const Home = db.home;
const Owner = db.owner;
// const Op = db.Sequelize.Op;


// Create and Save a new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ code: 400, message: "entire body cannot be empty, firstname,lastname,phone are required field" });
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
                    return res.status(200).send({ code: 200, response: { "message": "Successfully created home", data: homedata } })
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
            return res.status(500).send({ code: 500, response: { "message": "error while creating house", data: err } })
        })
        // User.findByPk(req.body.userId).then(data => {
        //         if (data) {
        //             // var isOwner = dataCheck.isOwner;
        //             // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", dataCheck);
        //             if (data.isOwner) {



    //             } else {
    //                 res.status(404).send({ code: 404, response: { " message": "user who is not owner cannot have house" } })
    //             }
    //         } else {
    //             return res.status(404).send({
    //                 code: 404,
    //                 message: "user cannot be found in database"
    //             })
    //         }
    //     }).catch(err => {
    //         return "user is not detected"
    //     })
    //     //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", await dataCheck);


    // // Home.create(homeObj).then(homedata => {
    // //     console.log(req.body.userId)
    // //     user.findByPk(req.body.userId)
    // //         .then(data => {
    // //             console.log("working till here", data.isOwner);
    // //             if (data) {
    // //                 console.log("<MMMMMMMMMMMMMMMMMMMMMMMM>")
    // //                 if (data.isOwner) {
    // //                     console.log("<MMMMMMMMMMMMMMMMMMMMMMMM>")
    // //                     return res.status(200).send({ code: 200, message: "Success", data: data });
    // //                 } else {
    // //                     return res.status(404).send({ code: 404, message: "only owners can have house" });
    // //                 }

    // //             } else {
    // //                 res.status(404).send({
    // //                     code: 404,
    // //                     message: `Cannot find user with id=${id}. unable to create home`
    // //                 });
    // //             }
    // //         })
    // //         .catch(err => {
    // //             res.status(500).send({
    // //                 message: err.message
    // //             });
    // //         });

    // // }).catch(err => {
    // //     res.status(500).send({ code: 500, message: "not found user with the given id" });
    // // })
};