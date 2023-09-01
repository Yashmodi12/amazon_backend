const express = require("express")
const productController = require("./product/ProductController")
const cors = require("cors")
const ConnectDb = require("./connection")
const userController = require("./User/UserController")
const env = require("dotenv")
env.config()



const app = express()
ConnectDb()

app.use(express.json())
app.use(cors())



app.get("/", (req, res) => {
    return res.status(200).send({ message: "success" })
})


app.get("/product", productController.getProduct)
app.get("/product/:id", productController.getProductById)
app.post("/Addtocart", productController.getcart)
// app.get("/api/product/insertMany", productController.insertProdcuts),
// app.post("/user", userController.InsertUser)
app.post("/user/login", userController.userLogin)
app.post("/user/register", userController.userRegister)

app.listen(5000, () => {
    console.log("server started")
})

