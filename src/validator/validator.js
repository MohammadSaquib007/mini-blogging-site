const mongoose = require('mongoose')


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value === 'string' && value.trim().length === 0) return false

    return true;
}



const isValidRequestBody = function
    (requestBody) {
    return Object.keys(requestBody).length >
        0;
}



function isValidtitle(title) {
    return ["mr", "mrs", "miss"].indexOf(title) !== -1
}




function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const isValidObjectId = function (Id) { return mongoose.Types.ObjectId.isValid(Id) }


module.exports = { isValidEmail, isValid, isValidRequestBody, isValidtitle, isValidObjectId }                       