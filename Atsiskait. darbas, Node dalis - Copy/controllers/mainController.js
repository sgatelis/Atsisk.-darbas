const userDb = require("../schemas/userSchema")
const sendRes = require("../modules/sendRes")
const bcrypt = require("bcrypt")

module.exports = {
    register: async (req, res) => {
        const {username, password1, city, gender, age} = req.body

        const password = await bcrypt.hash(password1, 10)

        const user = new userDb({
            username,
            password,
            city,
            gender, 
            age
        })
       
        try {
            await user.save()
        } catch(e) {
            console.log("error =>")
            console.log(e)
        }        

        sendRes(res, "registration ok", false)
    },
    login: async (req, res) => {
        const {username, password} = req.body

        const user = await userDb.findOne({username})

        if (!user) return sendRes(res, "user not found", true)

        const compare = await bcrypt.compare(password, user.password)

        if (!compare) return sendRes(res, "bad password", true)

        req.session.user = user
        
        if(user) return sendRes(res, "login is ok", false, user)
        
        sendRes(res, "bad credentials", true)
    },
    autoLogin: async (req, res) => {

        if(req.session.user) {
            const {username} = req.session.user
            const user = await userDb.findOne({username})
             return sendRes(res, "login is ok", false, {user})
        }

        sendRes(res, "no user session", true, null)
        
    },
    logout: async (req, res) => {
        delete req.session.user
        sendRes(res, "session removed", false, null)
    }, 
    updateUser: async (req, res) => {
        const {username, newPhoto} = req.body
        console.log(username, newPhoto);

        // const user = await userDb.findOne({username})
        // if (user.photo.includes("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"))
        // {
        // user.photo.shift()
        // }
        // user.photo.push(newPhoto)
        // await user.save

        const user = await userDb.findOneAndUpdate({username: username}, {$addToSet: {photo: newPhoto}}, {new: true})

        sendRes(res, "login is ok", false, user)
    }
}




//     productUpload: async(req, res) => {
//     const { image, title, price } = req.body

//     const product = new productSchema({
//         image,
//         title,
//         price
//     })

//     await product.save()

//     sendRes(res, "upload ok", false)
//     },

//     getProducts: async (req, res) => {
//     const products = await productSchema.find()

//     console.log(products);

//     sendRes(res, "all good", false, products)
// },
 
//     getProduct: async (req, res) => {
//         const {id} = req.params
//         const product = await productSchema.findOne({_id: id})
//         sendRes(res, "all good", false, product)
//         console.log(product);
//     }
// }