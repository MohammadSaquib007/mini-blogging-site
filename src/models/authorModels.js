const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema(
    {
        
        fName: {
            type: String,
            required: true,
            trim: true
        },
        lName : {
            type : String,
            required: true,
            trim: true
        },
       title: {
            type:String,
            enum: ['mr','mrs','miss'],
            required: true,
            trim: true
       },
        email: {
            type: String,
            required: true,
            trim: true,
            unique:true
        },
        password : {
            type: String,
            required:true,
            trim:true
        }

        } ,{timestamps:true})

        module.exports = mongoose.model('author',authorSchema)