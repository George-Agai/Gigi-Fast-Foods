const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')
const WebSocket = require('ws')
dotenv.config()
const orders = require('./models/OrdersModel')


mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))
const wss = new WebSocket.Server({ port: 8080 });
app.use(express.json())//Activating body parser
app.use(cors())
app.use('/app', routesUrls)//All request or reponse urls appended here
app.listen(4000, () => console.log("server is up"))

wss.on('connection', ws => {
    console.log("Socket is connected")
    ws.on('message', async message => {
        const { messageName } = JSON.parse(message)
        if(messageName === 'new_order'){
            console.log("New Order")
        }
        else if(messageName === 'get_pending_order'){
            try{
            const pendingOrders = await orders.getOrderDetailsFromDatabase()
            if(pendingOrders){
                ws.send(JSON.stringify({ messageName: 'pending_order', pendingOrders }))
                console.log('pending order sent to employee')
            }else{
                ws.send(JSON.stringify({ messageName: 'error', message: 'No pending order' }))
            }
            }catch(error){
                console.log(error)
            }
        }
        else if(messageName === 'findAndUpdateOrder'){
            const { _id } = JSON.parse(message)
            const done = await orders.findOrderAndUpdateComplete(_id)
            if(done){
                console.log('Order updated to complete')
            }
        }
        else if(messageName === 'getOfflineOrders'){
            const {dateString} = JSON.parse(message)
            const offlineOrders = await orders.getOfflineOrdersFromDatabase(dateString)
            ws.send(JSON.stringify({messageName: "offline_orders", offlineOrders}))
        }
        else if(messageName === 'getExpenses'){
            const {dateString} = JSON.parse(message)
            const expenses = await orders.getExpensesFromDatabase(dateString)
            ws.send(JSON.stringify({messageName: 'expenses', expenses}))
        }
        else if(messageName === 'get_todays_transactions'){
            const {dateString} = JSON.parse(message)
            const onlineOrders = await orders.getTodaysOnlineOrdersFromDB(dateString)
            const offlineOrders = await orders.getOfflineOrdersFromDatabase(dateString)
            const expenses = await orders.getExpensesFromDatabase(dateString)
            ws.send(JSON.stringify({messageName: "todays_transactions", onlineOrders, offlineOrders, expenses}))
        }
        else if(messageName === 'getSpecifiedDateOrders'){
            const {dateString} = JSON.parse(message)
            const specifiedDateOnlineOrders = await orders.getSpecifiedDateOnlineOrders(dateString)
            const specifiedDateOfflineOrders = await orders.getSpecifiedDateOfflineOrders(dateString) 
            const specifiedDateExpenses = await orders.getSpecifiedDateExpenses(dateString)
            ws.send(JSON.stringify({messageName: 'SpecifiedDateOrders', specifiedDateOnlineOrders, specifiedDateOfflineOrders, specifiedDateExpenses}))
        }
        else if(messageName === 'getSpecifiedMonthOrders'){
            const {mon} = JSON.parse(message)
            const specifiedMonthlyOnlineOrders = await orders.getSpecifiedMonthlyOnlineOrders(mon)
            const specifiedMonthlyOfflineOrders = await orders.getSpecifiedMonthlyOfflineOrders(mon)
            const specifiedMonthlyExpenses = await orders.getSpecifiedMonthlyExpenses(mon)
            ws.send(JSON.stringify({messageName: 'specifiedMonthlyOrders', specifiedMonthlyOnlineOrders, specifiedMonthlyOfflineOrders, specifiedMonthlyExpenses}))
        }
    });
}); 