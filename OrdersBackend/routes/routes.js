const express = require('express')
const completeOrderTemplate = require('../models/OrdersModel')

const router = express.Router()

router.post('/Home', (request, response) => {
    // Get the attribute values from the request body
    const { contact, orders, cartTotal } = request.body;

    const completedOrder = new completeOrderTemplate(
        {
            contact,
            orders,
            cartTotal
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

router.get('/Home', (request, response) => {
    completeOrderTemplate.find({}, (err, data)=>{
        if(err){
            response.send(err);
        }else{
            response.json(data);
        }
    });
});

module.exports = router