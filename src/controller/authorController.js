const authorModels = require('../models/authorModels.js');
const validator = require('../validator/validator.js')
const jwt = require("jsonwebtoken")

const createAuthor = async function (req, res) {
    try {
        const requestBody = req.body
        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: 'pls provide msg ' })
        }

        let { fName, lName, title, email, password } = requestBody
        if (!validator.isValid(fName)) {
            return res.status(400).send({ status: false, msg: 'pls provide valid fName' })
        }
        if (!validator.isValid(lName)) {
            return res.status(400).send({ status: false, msg: 'pls provide valid fName' })


        }
        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, msg: 'pls provide valid title' })

        }
        if (!validator.isValidtitle(title)) {
            return res.status(400).send({ status: false, msg: 'pls provide title' })
        }

        if (!validator.isValidEmail(email)) {
            res.status(400).send({ status: false, msg: 'pls provide valid email id' })
        }
        const isEmailAlreadyused = await authorModels.findOne({ email: email })
        if (isEmailAlreadyused) {
            return res.status(400).send({ status: false, msg: 'email is already used' })
        }

        if (!validator.isValid(password)) {
            res.status(400).send({ status: false, msg: 'pls provide password' })
        }
        let saveData = requestBody
        console.log(saveData)
        await authorModels.create(saveData);
        res.status(201).send({ status: true, msg: 'authour created succesfully', data: saveData })


    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}

//Login

const login = async function (req, res) {
    try {
        const email = req.body.email
        const password = req.body.password
        if (!validator.isValidEmail(email)) {
            return res.status(500).send({ status: false, msg: "pls provide valid email" })

        }

        if (!validator.isValid(password)) {
            return res.status(500).send({ status: false, msg: "pls provide password" })

        }

        if (email && password) {
            const authorPassword = await authorModels.findOne({ email: email, password: password })

            if (authorPassword) {
               const token = jwt.sign({ createAuthor: authorPassword._id },'lementis')
                return res.status(200).send({ status: true, token: token })
            }
            else {
                return res.status(500).send({ status: false, msg: "invalid credentials" })
            }
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.msg })
    }
}







module.exports = { createAuthor, login }