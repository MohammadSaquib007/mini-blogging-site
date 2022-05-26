const mongoose = require('mongoose')
 const objectId = mongoose.Schema.Types.ObjectId
 const blogSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  body:{
      type:String,
      required:true
  },
  authorId:{
      type:objectId,
      required:true,
      refs:"author"
  },
  tags:{
      type:[String],
      required:true
  },
  category:{
      type:[String],
      required:true

  },
  subCategory: {
      type:[String],
     
  },
  deletedAt:{
      type:Date
  },
  isDeleted: {type:Boolean,
     default: false
    },
    
    publishedAt: {
        type: Date
    },
    isPublished:{
        type: Boolean,
        default: false
    }




 },{timestamps:true}
 )
 module.exports=mongoose.model("blogs",blogSchema)