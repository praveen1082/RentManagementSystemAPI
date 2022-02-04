const db = require("../models");
const User = db.user;
const Owner = db.owner;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ code: 400, message: "entire body cannot be empty, firstname,lastname,phone are required field" });
        return;
    }
    if (!req.body.firstName) {
        res.status(400).send({ code: 400, message: "firstName is required" });
        return;
    }
    if (!req.body.lastName) {
        res.status(400).send({ code: 400, message: "lastName is required" });
        return;
    }
    if (!req.body.phone) {
        res.status(400).send({ code: 400, message: "phone is required" });
        return;
    }
    if (!req.body.password) {
        return res.status(400).send({
            code: 400,
            response: {
                message: "Password field is required"
            }
        })
    }

    const userobj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        image: req.body.image,
        isOwner: false,
        gender: req.body.gender,
        password: req.body.password,

    };
    User.create(userobj).then(data => {

        res.status(200).send({ code: 200, response: { message: "Successfully created user", data: data } });
    }).catch(err => {
        res.status(500).send({ code: 500, response: { message: "Error while creating user", data: err } });
    })
};

exports.findAll = (req, res) => {
    User.findAll().then(data => {
        var dataList = data;
        res.status(200).send({
            code: 200,
            message: dataList
        });
    }).catch(err => {
        res.status(500).send({ code: 500, message: "Cannot fetch all users from database" })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.userId;
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send({ code: 200, message: "Success", data: data });
            } else {
                res.status(404).send({
                    code: 404,
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};
exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email.trim().isEmpty || email.isEmpty) {
        return res.status(400).send({ message: "email is required" });
    }
    if (password.trim().isEmpty || password.isEmpty) {
        return res.status(400).send({ message: "cannot login without password" })
    }
    User.findOne({ where: { email: email, password: password } })
        .then(data => {
            if (data) {

                res.status(200).send({ code: 200, message: "Success", isOwner: data.isOwner });
            } else {
                res.status(404).send({
                    code: 404,
                    message: `Cannot find user with id=${email}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.userId;
    console.log(req.params.userId);
    User.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "user was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

exports.delete = (req, res) => {

};