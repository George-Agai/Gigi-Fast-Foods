const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('OrdersModel Connected to the database!');
});

const arraySchema = new mongoose.Schema({
    food:  String,
    itemTotal: Number,
    quantity: Number
});

const completeOrderTemplate = new mongoose.Schema({   
    contact: {
        type: Number
    },
    orders: [arraySchema],
    cartTotal: {
        type: Number
    },
    status: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const incomeSchema = new mongoose.Schema({
    inputValue: {
        type: String,
        required: true
    },
    incomeAmount: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const ordersMade = mongoose.model('ordersMade', completeOrderTemplate)
const incomeTemplate = mongoose.model('incomeTemplate', incomeSchema)
const getOrderDetailsFromDatabase = async () => {
    try{
        const pendingOrder = await ordersMade.find({status: "Pending"}).exec()
        return pendingOrder;
    }catch(error){
        console.log(error)
    }  
}
const findOrderAndUpdateComplete = async(_id)=>{
    try{
        ordersMade.findOneAndUpdate({_id}, {$set: {status: 'Complete'}}, {new: true}).exec()
        return true;
    }catch(error){
        console.log(error)
    }
}

const getOfflineOrdersFromDatabase = async(dateString)=>{
    let date = new Date(dateString)
    let start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    let startISO = start.toISOString();
    let endISO = end.toISOString();
    try{
        const incomeData = await incomeTemplate.find({$and: [{transactionType: "Income"},{ date: { $gte: startISO, $lt: endISO }}]}).limit(10).exec()
        return incomeData
    }catch(error){
        console.log(error)
    }
}

const getExpensesFromDatabase = async(dateString)=>{
    let date = new Date(dateString)
    let start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    let startISO = start.toISOString();
    let endISO = end.toISOString();
    try{
        const expenses = await incomeTemplate.find({$and: [{transactionType: "Expenses"},{ date: { $gte: startISO, $lt: endISO }}]}).limit(10).exec()
        return expenses
    }catch(error){
        console.log(error)
    }
}
const getTodaysOnlineOrdersFromDB =async(dateString)=>{
    let date = new Date(dateString)
    let start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    let startISO = start.toISOString();
    let endISO = end.toISOString();
    try{
        const onlineOrders = ordersMade.find({$and: [{status: "Complete"}, { date: { $gte: startISO, $lt: endISO }}]}).exec()
        return onlineOrders;
    }catch(error){
        console.log(error)
    }
}
const getSpecifiedDateOnlineOrders =async(dateString)=> {
    let date = new Date(dateString)
    let start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    let startISO = start.toISOString();
    let endISO = end.toISOString();
    
    try{
        const specifiedDateOnlineOrders = await ordersMade.find({$and: [{status: "Complete"}, { date: { $gte: startISO, $lt: endISO } }]}).exec()
        console.log(specifiedDateOnlineOrders)
        return specifiedDateOnlineOrders;
    }catch(error){
        console.log(error)
    }
}
const getSpecifiedDateOfflineOrders =async(dateString)=> {
    let date = new Date(dateString)
    let start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    let startISO = start.toISOString();
    let endISO = end.toISOString();
    try{
        const specifiedDateOfflineOrders = await incomeTemplate.find({$and: [{transactionType: "Income"}, { date: { $gte: startISO, $lt: endISO } }]}).exec()
        return specifiedDateOfflineOrders;
    }catch(error){
        console.log(error)
    }
}
const getSpecifiedDateExpenses =async(dateString)=> {
    let date = new Date(dateString)
    let start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    let startISO = start.toISOString();
    let endISO = end.toISOString();
    try{
        const specifiedDateExpenses = await incomeTemplate.find({$and: [{status: "Complete"}, { date: { $gte: startISO, $lt: endISO } }]}).exec()
        return specifiedDateExpenses;
    }catch(error){
        console.log(error)
    }
}
const getSpecifiedMonthlyOnlineOrders =async(mon)=>{
    let selectedMonth = new Date(mon)
    let startOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    let endOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    let startISO = startOfMonth.toISOString();
    let endISO = endOfMonth.toISOString();
    try{
        const monthlyOnlineOrders = await ordersMade.find({$and: [{status: 'Complete'},{ date: { $gte: startISO } },{ date: { $lt: endISO }}]}).exec()
        return monthlyOnlineOrders;
    }catch(error){
        console.log(error)
    }
}
const getSpecifiedMonthlyOfflineOrders =async(mon)=>{
    let selectedMonth = new Date(mon)
    let startOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    let endOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    let startISO = startOfMonth.toISOString();
    let endISO = endOfMonth.toISOString();
    try{
        const monthlyOfflineOrders = await incomeTemplate.find({$and: [{transactionType: 'Income'},{ date: { $gte: startISO } },{ date: { $lt: endISO }}]}).exec()
        return monthlyOfflineOrders;
    }catch(error){
        console.log(error)
    }
}
const getSpecifiedMonthlyExpenses =async(mon)=>{
    let selectedMonth = new Date(mon)
    let startOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    let endOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    let startISO = startOfMonth.toISOString();
    let endISO = endOfMonth.toISOString();
    try{
        const monthlyExpenses = await incomeTemplate.find({$and: [{transactionType: 'Expenses'},{ date: { $gte: startISO } },{ date: { $lt: endISO }}]}).exec()
        return monthlyExpenses;
    }catch(error){
        console.log(error)
    }
}
module.exports = {
    ordersMade,
    incomeTemplate,
    getOrderDetailsFromDatabase,
    findOrderAndUpdateComplete,
    getOfflineOrdersFromDatabase,
    getExpensesFromDatabase,
    getTodaysOnlineOrdersFromDB,
    getSpecifiedDateOnlineOrders,
    getSpecifiedDateOfflineOrders,
    getSpecifiedDateExpenses,
    getSpecifiedMonthlyOnlineOrders,
    getSpecifiedMonthlyOfflineOrders,
    getSpecifiedMonthlyExpenses
};