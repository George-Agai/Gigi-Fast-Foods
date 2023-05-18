import React from 'react'
import axios from 'axios';
import './GigiFastFoods.css'
import WithClickOutside from './WithClickOutside';
import { useState, useEffect } from 'react';
import kitten from './images/kitten.png'
import {BsArrowRight} from 'react-icons/bs'
import save from './images/floppy-disk.png'
import LoadingBlue from './LoadingBlue';

const DropDownInput = React.forwardRef(({
    options,
    placeholder = "",
    onChange,
    selectedKey,
    setOpen,
    incomeMessage,
    expensesMessage
}, ref) => {
console.log(incomeMessage)
console.log(expensesMessage)
const [inputValue, setInputValue] = useState('');
const [onText, setOnText] = useState('');
const [incomeAmount, setIncomeAmount] = useState('');
const [Income, setIncome] = useState()
const [Expenses, setExpenses] = useState()
const [IncomeFlag, setIncomeFlag] = useState()
const [ExpensesFlag, setExpensesFlag] = useState()
const [ContinueTextFlag, setContinueTextFlag] = useState(true)

useEffect(() => {
    if (selectedKey) {
        setInputValue(options.find(o => o.key === selectedKey).value);
        setOpen(false);
    }
    
}, [selectedKey, options, setOpen]);

const onInputChange = (e) => {
    setInputValue(e.target.value);
    setOnText(true);
}
const onAmountChange = (e) => {
    setIncomeAmount(e.target.value);
}
const AmountClick = (e) => {
    setOnText(false);
}
const onItemSelected = (option) => {
    onChange !== undefined && onChange(option.key);
    onChange !== undefined && setInputValue(option.value);
    setOpen(false);
}

const onInputClick = () => {
    setOpen((prevValue) => !prevValue);
}

let ws;
const setUpWebsocketConnection =()=>{
return new Promise((resolve, reject) => {
    ws = new WebSocket('wss://gigifoods.herokuapp.com')

    ws.onopen = function(){
        resolve(ws);
        console.log('ws connected')
    }
    ws.onclose = function(){
        console.log('ws closed')
    }
    ws.onerror = (error) => {
        reject(error); // Reject the promise with the errorF
    };
    ws.onmessage =({data})=>{
        const {messageName, offlineOrders, expenses} = JSON.parse(data)
        if(messageName === "offline_orders"){
            if(offlineOrders.length >= 1){
                setIncome(offlineOrders)
                setIncomeFlag(true)
            }
            else{
                setIncome(offlineOrders)
                setIncomeFlag(false)
            }
        }
        else if(messageName === "expenses"){
            if(expenses.length >= 1){
                setExpenses(expenses)
                setExpensesFlag(true)
            }
            else{
                setExpenses(expenses)
                setExpensesFlag(false)
                console.log(offlineOrders)
            }
        }
        ws.close()
        setContinueTextFlag(true)
    }
});
}


let completedOrder = null
let transactionType = null
let messageName  = null
let messageObject = null

const HandleAddCompletedOrder = async(e) => {
    e.preventDefault();
   
    if(incomeMessage){
        transactionType = "Income"
        completedOrder = {
            inputValue,
            incomeAmount,
            transactionType
        }
    }else{
        transactionType = "Expenses"
        completedOrder = {
            inputValue,
            incomeAmount,
            transactionType
        }
    }
    await axios.post('https://gigifoods.herokuapp.com/app/Income', completedOrder)
    setInputValue("")
    setIncomeAmount("")
}
const websocketSend=(messageObject)=>{
    ws.send(JSON.stringify(messageObject));
    return true;
}
const handleExpandButtonClicked =async(e)=>{
    e.preventDefault()
    setContinueTextFlag(false)
    let date = new Date()
        let dateString = date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    
    if(incomeMessage){
        messageName = 'getOfflineOrders'
        messageObject ={
            messageName,
            dateString
        }
        try{
            const ws = await setUpWebsocketConnection()
            console.log(ws)
            websocketSend(messageObject)
        }
        catch (error) {
            console.error('Error connecting to WebSocket:', error);
            // Handle the error appropriately
        }
        
        
    }
    else{
        messageName = 'getExpenses'
        messageObject ={
            messageName,
            dateString
        }
        try{
            const ws = await setUpWebsocketConnection()
            console.log(ws)
            websocketSend(messageObject)
        }
        catch (error) {
            console.error('Error connecting to WebSocket:', error);
            // Handle the error appropriately
        }
    }
}
    return (
        <div className='dropdown-container-container'>
        <div className='dropdown-container' ref={ref}>
            <div id='input-amount-container'>
                <div className='input-container' onClick={onInputClick}>
                    <form id='form' onSubmit={HandleAddCompletedOrder}>
                        <input
                            type="text"
                            value={inputValue}
                            placeholder={placeholder}
                            onChange={onInputChange}
                            id='income-input'
                            required
                        />
                        <input
                            type="number"
                            placeholder='Amount'
                            id='income-amount'
                            onClick={AmountClick}
                            onChange={onAmountChange}
                            value={incomeAmount}
                            required
                        />
                        <button
                            className='income-add-button'
                            type='submit'
                            value='Submit'
                        ><img src={save} alt='save' className='icons'/></button>
                    </form>
                </div>

            </div>

            {onText ? <div className='dropdown' >
                {options.filter(item => {
                    const searchItem = inputValue.toLocaleLowerCase();
                    const v = item.value.toLocaleLowerCase();

                    if (!searchItem) return true;
                    return v.startsWith(searchItem);
                }).map(opt => {
                    return (
                        <div key={opt.key}
                            onClick={() => onItemSelected(opt)}
                            className='option'>

                            {opt.value}
                        </div>

                    );
                })}
            </div> : null}
           
        </div>
        <div className='expand-button-div'>
            <button onClick={handleExpandButtonClicked}> {ContinueTextFlag ? <div style={{display: 'flex', alignItems: 'center'}}><p>View all</p> <BsArrowRight style={{fontSize: '15px', marginLeft: '1px'}}/></div> : <LoadingBlue />}</button>
        </div>
        {Income && IncomeFlag ? <div className='admin-page-online-orders'>
            <table>
                <tbody>
                    {Income.map(income =>(
                        <tr key={income._id}>
                            <td>{income.inputValue}</td>
                            <td>{income.incomeAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> : Income && !IncomeFlag ? <div><img src={kitten} alt='kitten' className='kitten'/></div> : null}
        {Expenses && ExpensesFlag ? <div className='admin-page-online-orders'>
            <table>
                <tbody>
                    {Expenses.map(expense =>(
                        <tr key={expense._id}>
                            <td>{expense.inputValue}</td>
                            <td>{expense.incomeAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> : Expenses && !ExpensesFlag ? <div><img src={kitten} alt='kitten' className='kitten'/></div> : null}
        </div>
    )
});
export default WithClickOutside(DropDownInput);
