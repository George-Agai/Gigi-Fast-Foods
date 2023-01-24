const express = require('express')
const Template = require('../models/OrdersModel')
const router = express.Router()

router.post('https://gigi-fast-foods.vercel.app/Home', (request, response) => {
    // Get the attribute values from the request body
    const { contact, orders, cartTotal, status } = request.body;
    const completedOrder = new Template.ordersMade(
        {
            contact,
            orders,
            cartTotal,
            status
        }
    )
    completedOrder.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
});

router.post('https://gigi-fast-foods.vercel.app/Income', (req, res)=>{
    const {inputValue, incomeAmount, transactionType} = req.body;
    const offlineOrder = new Template.incomeTemplate({
        inputValue,
        incomeAmount,
        transactionType
    })
    offlineOrder.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    })
})

module.exports = router