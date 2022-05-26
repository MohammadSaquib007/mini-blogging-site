
const authorModels = require('../models/authorModels')
const blogsModels = require('../models/blogsModels')
const validator = require('../validator/validator')

const createBlog = async function (req, res) {
    try {
        const blogData = req.body
        const requestBody = blogData
        let { title, body, tags, category, subCategory, authorId } = blogData

        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: 'pls provide request body' })
        }
        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, msg: "pls provide valid title" })

        }
        if (!validator.isValid(body)) {
            return res.status(400).send({ status: false, msg: "pls provide body" })
        }

        if (!validator.isValid(tags)) {
            return res.status(400).send({ status: false, msg: "pls provide tags" })
        }
        if (!validator.isValid(category)) {
            return res.status(400).send({ status: false, msg: "pls provide category" })
        }
        if (!validator.isValid(subCategory)) {
            return res.status(400).send({ status: false, msg: "pls provide subCategory" })
        }
        if (!validator.isValid(authorId)) {
            return res.status(400).send({ status: false, msg: 'pls provide author id' })
        }
        const Id = req.body.authorId
        if (!validator.isValidObjectId(Id)) {
            return res.status(400).send({ status: false, msg: 'not a valid object id' })
        }
        const validId = await authorModels.findById(Id)
        if (validId) {
            const newBlog = await blogsModels.create(blogData)
            return res.status(201).send({ status: true, msg: 'blog created succesfully ', data: newBlog })

        } else { res.status(400).send({ statusbar: false, msg: 'invalid authorid' }) }
    }


    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}

//fetch 
const blogDetails = async function (req, res) {
    try {
        //const getDetails = req.query.Id
        if (req.query.authorId || req.query.tags || req.query.category || req.query.subCategory) {
            let authorId = req.query.authorId
            let tags = req.query.tags
            let category = req.query.category
            let subCategory = req.query.subCategory
            let obj = {}
            if (authorId) {
                obj.authorId = authorId

            }
            if (tags) {
                obj.tags = tags
            }
            if (category) {
                obj.category = category
            }
            if (subCategory) {
                obj.subCategory = subCategory
            }
            obj.isDeleted = false
            obj.isPublished = true
            const detail = await blogsModels.find(obj)
            if (!detail) {
                return res.status(404).send({ status: false, msg: "given data is invalid " })
            }
            else {
                return res.status(200).send({ status: true, msg: "data fetch successfully", data: detail })
            }
        }

        else {
            return res.status(400).send({ status: false, msg: "mandatory body not given" })
        }

    }
    catch (err) {
        return res.status(404).send({ status: false, msg: err.msg })
    }
}

//update
const blogUpdate = async function (req, res) {
    try {

        const requestBody = req.body

        const blogId = req.params.blogId





        const { title, body, tags, subCategory, isPublished } = requestBody

        //validation starts

        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(404).send({ status: false, msg: 'pls provide request body' })
        }
        if (!validator.isValid(title)) {
            return res.status(404).send({ status: false, msg: "pls provide title" })
        }
        if (!validator.isValid(body)) {
            return res.status(404).send({ status: false, msg: "pls provide body" })
        }
        if (!validator.isValid(tags)) {
            return res.status(404).send({ status: false, msg: "pls provide tags" })

        }


        if (!validator.isValid(subCategory)) {
            return res.status(404).send({ status: false, msg: "pls provide subCategory" })
        }
        if (!validator.isValid(isPublished)) {
            return res.status(404).send({ status: false, msg: "pls provide Published" })
        }
        //validation end

        let obj = {}
        if (title) {
            obj.title = title
        }
        if (body) {
            obj.body = body
        }
        if (tags) {
            obj.tags = tags
        }

        if (subCategory) {
            obj.subCategory = subCategory
        }
        if (isPublished) {
            obj.isPublished = isPublished
        }
        obj.isDeleted = false
        
        

        const updating = await blogsModels.findByIdAndUpdate({ _id: blogId, isDeleted: false }, { title: title, body: body, tags: tags, subCategory: subCategory, isPublished: isPublished },{ new: true })
      
        if (!updating) {
            return res.status(404).send({ status: false, msg: "given data is invalid " })
        }
       

        else {
            return res.status(201).send({ status: true, msg: "data update successfully", data: updating })
        }
    
    
   
       


        //}


        //v

    
    }
    catch (err) {
        return res.status(404).send({ status: false, msg: err.msg })
    }
}


//delete

const deleted = async function (req, res) {
    try {
        if (req.query.authorId || req.query.tags || req.query.category || req.query.subCategory) {
            let authorId = req.query.authorId
            let tags = req.query.tags
            let category = req.query.category
            let subCategory = req.query.subCategory
            let obj = {}
            if (authorId) {
                obj.authorId = authorId

            }
            if (tags) {
                obj.tags = tags
            }
            if (category) {
                obj.category = category
            }
            if (subCategory) {
                obj.subCategory = subCategory
            }

            const remove = req.query.blogId
           
            const removeData = await blogsModels.findOneAndDelete({ _id: remove })
            return res.status(201).send({ status: true, msg: "delete succesfully", removeData })

        }
    }
    catch (err) {
        return res.status(404).send({ status: false, msg: err.msg })
    }
}





module.exports = { createBlog, blogDetails, blogUpdate, deleted }