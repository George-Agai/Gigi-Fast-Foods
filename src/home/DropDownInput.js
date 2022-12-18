import React from 'react'
import './GigiFastFoods.css'
import WithClickOutside from './WithClickOutside';
import { useState, useEffect } from 'react';
import { CompletedOrdersView } from './CompletedOrdersView';

//Getting the values of local storage
const getDatafromLS = () => {
    const data = localStorage.getItem('completedOrders');
    if (data) {
        return JSON.parse(data);
    }
    else {
        return []
    }
}

const DropDownInput = React.forwardRef(({
    options,
    placeholder = "",
    onChange,
    selectedKey,
    setOpen
}, ref) => {

    const [inputValue, setInputValue] = useState('');
    const [onText, setOnText] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    
    //main array of completedOrders objects state
    const [completedOrders, setCompletedOrders] = useState(getDatafromLS());

    //Saving data to local storage
    useEffect(() => {
        if (selectedKey) {
            setInputValue(options.find(o => o.key === selectedKey).value);
            setOpen(false);
        }
        localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
    }, [selectedKey, options, setOpen, completedOrders]);

    const onInputChange = (e) => {
        setInputValue(e.target.value);
        setOnText(true);
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

    const HandleAddCompletedOrder = (e) => {
        e.preventDefault();

        //creating an object
        const completedOrder = {
            inputValue,
            incomeAmount
        }
        
        console.log(completedOrder)
        
        //setCompletedOrders([...completedOrders, completedOrder]);
        setInputValue('');
        setIncomeAmount('');
    }
    
    

    const onAmountChange = (e) => {
        setIncomeAmount(e.target.value);
    }

    return (
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
                        />
                        <input
                            type="text"
                            placeholder='Amount'
                            id='income-amount'
                            onClick={AmountClick}
                            onChange={onAmountChange}
                            value={incomeAmount}

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
            </div>: null}
            <div id="inputValue">
                <CompletedOrdersView completedOrders={completedOrders} />
            </div>

        </div>
    );
}
);
export default WithClickOutside(DropDownInput);
