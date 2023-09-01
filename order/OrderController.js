const { default: orderModel } = require("./OrderModel")

class OrderController {
    async createOrder(req, res) {
        try {
            const { products, user, paymentMethod, shippingAddress, totalprice } = req.body
            cosnole.log(req.body)

            if (!products || products.lenght <= 0) {
                return res.status(400).send({ message: "Misssing dependecy Product" })
            }
            if (!user) {
                return res.status(400).send({ message: "Misssing dependecy user" })
            }
            if (!paymentMethod) {
                return res.status(400).send({ message: "Misssing dependecy paymentMethod" })
            }

            if (!shippingAddress) {
                return res.status(400).send({ message: "Misssing dependecy shippingAddress" })
            }

            const deliveryDate = new Date()
            deliveryDate.setDate(deliveryDate.getDate() + DeliverDay)

            const orderDetails = {
                products,
                user,
                paymentMethod,
                shippingAddress,
                deliverdIn: deliveryDate,
                totalprice
            }
            console.log(orderDetails)

            let order = await orderModel.create(orderDetails)
            order = { ...order._doc, RazorpatDetails: null }

            if (paymentMethod === "cod") {
                if (!order) return res.status(500).send({ message: "something went wrong" })
                return res.status(200).send({ message: "success", order })
            }
            else {

                const option = {

                    amount: totalPrice * 100,
                    currency: "INR",
                    receipt: "rcpt_id_" + order._id
                }

                const Razorpayresult = await CreateRozorPayORder(option)

                if (!Razorpayresult) {
                    return res.status(500).send({ message: "something went wrong" })
                }
                order = {
                    ...order, RazorpayDetails: { ...Razorpayresult, apikey: process.env.API_KEY }
                }
                return res.status(200).send({ message: "success", order })

            }


        }

        catch (error) {
            console.log(error)
        }
    }
}
