import React from 'react'
import axios from 'axios';
import './GigiFastFoods.css'
import WithClickOutside from './WithClickOutside';
import { useState, useEffect } from 'react';
import kitten from './images/kitten.png'
import {BsArrowRight} from 'react-icons/bs'

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
const ws = new WebSocket('wss://gigifoods.herokuapp.com')
ws.onopen = function(){
    console.log('ws connected')
}
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
    console.log(completedOrder)
}
const websocketSend=(messageObject)=>{
    ws.send(JSON.stringify(messageObject));
    return true;
}
const handleExpandButtonClicked =(e)=>{
    e.preventDefault()
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
        websocketSend(messageObject)
    }
    else{
        messageName = 'getExpenses'
        messageObject ={
            messageName,
            dateString
        }
        websocketSend(messageObject)
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
                        >+</button>
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
            <button onClick={handleExpandButtonClicked}><p>View all <BsArrowRight style={{fontSize: '16px'}}/></p></button>
        </div>
        {Income && IncomeFlag ? <div>
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
        {Expenses && ExpensesFlag ? <div>
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
