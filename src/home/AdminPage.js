import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'
import { IoMdArrowDropdown } from 'react-icons/io'
import kitten from './images/kitten.png'
import diver from './images/diver.png'
import LogoutIcon from './LogoutIcon';
import { BsShop } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiCoinStack } from 'react-icons/bi';
import LoadingBlue from './LoadingBlue';

const AdminPage = () => {
    const navigate = useNavigate();
    const [onlineOrders, setonlineOrders] = useState('true')
    const [offlineOrders, setofflineOrders] = useState('')
    const [expenses, setexpenses] = useState('')
    const [businessToday, setbusinessToday] = useState(true)
    const [monthlyStatements, setmonthlyStatements] = useState('')
    const [ws, setWs] = useState(null);
    const [OnlineOrdersArray, setOnlineOrdersArray] = useState()
    const [OfflineOrdersArray, setOfflineOrdersArray] = useState()
    const [ExpensesArray, setExpensesArray] = useState()
    const [OnlineOrdersFlag, setOnlineOrdersFlag] = useState(false)
    const [OfflineOrdersFlag, setOfflineOrdersFlag] = useState()
    const [ExpensesFlag, setExpensesFlag] = useState()
    const [monthlyOnlineOrdersArray, setMonthlyOnlineOrdersArray] = useState(null)
    const [monthlyOfflineOrdersArray, setMonthlyOfflineOrdersArray] = useState(null)
    const [monthlyExpensesArray, setMonthlyExpensesArray] = useState(null)
    const [monthlyOnlineOrdersFlag, setMonthlyOnlineOrdersFlag] = useState(null)
    const [monthlyOfflineOrdersFlag, setMonthlyOfflineOrdersFlag] = useState(null)
    const [monthlyExpensesFlag, setMonthlyExpensesFlag] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpenMonthlyStatements, setIsDropdownOpenMonthlyStatements] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [OnlineOrdersLoading, setOnlineOrdersLoading] = useState(true)
    const [monthlyStatementsLoadingFlag, setMonthlyStatementsLoadingFlag] = useState(true)

    const HandleOnlineOrdersButtonClick = (e) => {
        e.preventDefault()
        setonlineOrders(true)
        setofflineOrders(false)
        setexpenses(false)
    }
    const HandleOfflineOrdersButtonClick = (e) => {
        e.preventDefault()
        setofflineOrders(true)
        setonlineOrders(false)
        setexpenses(false)
    }
    const HandleExpensesButtonClick = (e) => {
        e.preventDefault()
        setexpenses(true)
        setofflineOrders(false)
        setonlineOrders(false)
    }
    const HandleBusinessTodayButtonClick = (e) => {
        e.preventDefault()
        setbusinessToday(true)
        setmonthlyStatements(false)
        if (isDropdownOpen) {
            setIsDropdownOpen(false)
        } else if (isDropdownOpenMonthlyStatements) {
            setIsDropdownOpenMonthlyStatements(false)
        }
    }

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const handleDropdownClickMonthlyStatements = () => {
        setIsDropdownOpenMonthlyStatements(!isDropdownOpenMonthlyStatements)
    }
    const setUpWsConnection = (date) => {
        const ws = new WebSocket('wss://gigifoods.herokuapp.com');
        ws.onopen = () => {
            console.log("Admin websocket connected")
            if (ws.readyState === WebSocket.OPEN) {
                let datee = new Date(date)
                let dateString = datee.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });
                ws.send(JSON.stringify({ messageName: 'getSpecifiedDateOrders', dateString }))
            }
        };
        ws.onmessage = ({ data }) => {
            const { messageName, specifiedDateOnlineOrders, specifiedDateOfflineOrders, specifiedDateExpenses } = JSON.parse(data)
            if (messageName === 'SpecifiedDateOrders') {
                if (specifiedDateOnlineOrders.length >= 1 && specifiedDateOfflineOrders.length >= 1 && specifiedDateExpenses.length >= 1) {
                    setOnlineOrdersFlag(true)
                    setOfflineOrdersFlag(true)
                    setExpensesFlag(true)
                    setOnlineOrdersArray(specifiedDateOnlineOrders)
                    setOfflineOrdersArray(specifiedDateOfflineOrders)
                    setExpensesArray(specifiedDateExpenses)
                }
                else if (specifiedDateOnlineOrders.length >= 1 && specifiedDateOfflineOrders.length === 0 && specifiedDateExpenses.length >= 1) {
                    setOnlineOrdersFlag(true)
                    setOfflineOrdersFlag(false)
                    setExpensesFlag(true)
                    setOnlineOrdersArray(specifiedDateOnlineOrders)
                    setOfflineOrdersArray(specifiedDateOfflineOrders)
                    setExpensesArray(specifiedDateExpenses)
                }
                else if (specifiedDateOnlineOrders.length >= 1 && specifiedDateOfflineOrders.length === 0 && specifiedDateExpenses.length === 0) {
                    setOnlineOrdersFlag(true)
                    setOfflineOrdersFlag(false)
                    setExpensesFlag(false)
                    setOnlineOrdersArray(specifiedDateOnlineOrders)
                    setOfflineOrdersArray(specifiedDateOfflineOrders)
                    setExpensesArray(specifiedDateExpenses)
                }
                else if (specifiedDateOnlineOrders.length === 0 && specifiedDateOfflineOrders.length >= 1 && specifiedDateExpenses.length >= 1) {
                    setOnlineOrdersFlag(false)
                    setOfflineOrdersFlag(true)
                    setExpensesFlag(true)
                    setOnlineOrdersArray(specifiedDateOnlineOrders)
                    setOfflineOrdersArray(specifiedDateOfflineOrders)
                    setExpensesArray(specifiedDateExpenses)
                }
                else if (specifiedDateOnlineOrders.length === 0 && specifiedDateOfflineOrders.length >= 1 && specifiedDateExpenses.length === 0) {
                    setOnlineOrdersFlag(false)
                    setOfflineOrdersFlag(true)
                    setExpensesFlag(false)
                    setOnlineOrdersArray(specifiedDateOnlineOrders)
                    setOfflineOrdersArray(specifiedDateOfflineOrders)
                    setExpensesArray(specifiedDateExpenses)
                } else if (specifiedDateOnlineOrders.length === 0 && specifiedDateOfflineOrders.length === 0 && specifiedDateExpenses.length >= 1) {
                    setOnlineOrdersFlag(false)
                    setOfflineOrdersFlag(false)
                    setExpensesFlag(true)
                    setOnlineOrdersArray(specifiedDateOnlineOrders)
                    setOfflineOrdersArray(specifiedDateOfflineOrders)
                    setExpensesArray(specifiedDateExpenses)
                } else if (specifiedDateOnlineOrders.length === 0 && specifiedDateOfflineOrders.length === 0 && specifiedDateExpenses.length >= 1) {
                    setOnlineOrdersFlag(false)
                    setOfflineOrdersFlag(false)
                    setExpensesFlag(true)
                    setOnlineOrdersArray(specifiedDateOnlineOrders)
                    setOfflineOrdersArray(specifiedDateOfflineOrders)
                    setExpensesArray(specifiedDateExpenses)
                } else if (specifiedDateOnlineOrders.length === 0 && specifiedDateOfflineOrders.length === 0 && specifiedDateExpenses.length === 0) {
                    setOnlineOrdersFlag(false)
                    setOfflineOrdersFlag(false)
                    setExpensesFlag(false)
                    setOnlineOrdersArray(specifiedDateOnlineOrders)
                    setOfflineOrdersArray(specifiedDateOfflineOrders)
                    setExpensesArray(specifiedDateExpenses)
                } else if (specifiedDateOnlineOrders.length >= 1 && specifiedDateOfflineOrders.length >= 1 && specifiedDateExpenses.length === 0) {
                    setOnlineOrdersFlag(true)
                    setOfflineOrdersFlag(true)
                    setExpensesFlag(false)
                    setOnlineOrdersArray(specifiedDateOnlineOrders)
                    setOfflineOrdersArray(specifiedDateOfflineOrders)
                    setExpensesArray(specifiedDateExpenses)
                }
            }
            ws.close()
        }
        ws.onclose = function () {
            console.log("ws closeddd")
        }
    }
    let foodTotals = {};
    let cartTotal = 0;
    let monthlyOrdersArray = []

    const calculateMonthlyOnlineTotal = () => {
        monthlyOnlineOrdersArray.forEach((order) => {
            order.orders.forEach((item) => {
                if (!foodTotals[item.food]) {
                    foodTotals[item.food] = { total: 0, itemTotal: 0 };
                }
                foodTotals[item.food].total += item.quantity;
                foodTotals[item.food].itemTotal += item.itemTotal;
            });
            cartTotal += order.cartTotal;
        });
        foodTotals.cartTotal = cartTotal;
        let foodArray = Object.entries(foodTotals).map(([food, { total, itemTotal }]) => [food, total, itemTotal]);
        foodArray = [...foodArray, ['Total', foodTotals.cartTotal]];
        foodArray = foodArray.filter((item, index) => !(item[0] === 'cartTotal' && index < foodArray.length - 1))

        monthlyOrdersArray.push(foodArray)
    }
    if (monthlyOnlineOrdersFlag) {
        calculateMonthlyOnlineTotal()
    }

    let incomeDataCount = {};
    let totalIncome = 0;

    if (monthlyOfflineOrdersFlag) {
        monthlyOfflineOrdersArray.forEach(data => {
            if (incomeDataCount[data.inputValue]) {
                incomeDataCount[data.inputValue].count++;
                incomeDataCount[data.inputValue].totalIncome += data.incomeAmount;
            } else {
                incomeDataCount[data.inputValue] = {
                    count: 1,
                    totalIncome: data.incomeAmount
                };
            }
            totalIncome += data.incomeAmount;
        });

    }
    let expenseDataCount = {}
    let totalExpenses = 0;

    if (monthlyExpensesFlag) {
        monthlyExpensesArray.forEach(data => {
            if (expenseDataCount[data.inputValue]) {
                expenseDataCount[data.inputValue].count++;
                expenseDataCount[data.inputValue].totalExpenses += data.incomeAmount;
            } else {
                expenseDataCount[data.inputValue] = {
                    count: 1,
                    totalExpenses: data.incomeAmount
                };
            }
            totalExpenses += data.incomeAmount;
        });

    }
    const profit = cartTotal + totalIncome - totalExpenses
    const setUpWsConnectionOnMonthlyClicked = (mon) => {
        const ws = new WebSocket('wss://gigifoods.herokuapp.com');
        ws.onopen = () => {
            console.log("Admin websocket connected")
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ messageName: 'getSpecifiedMonthOrders', mon }))
            }
        };
        ws.onmessage = ({ data }) => {
            const { messageName, specifiedMonthlyOnlineOrders, specifiedMonthlyOfflineOrders, specifiedMonthlyExpenses } = JSON.parse(data)
            if (messageName === 'specifiedMonthlyOrders') {
                if (specifiedMonthlyOnlineOrders.length >= 1 && specifiedMonthlyOfflineOrders.length >= 1 && specifiedMonthlyExpenses.length >= 1) {
                    setMonthlyOnlineOrdersFlag(true)
                    setMonthlyOfflineOrdersFlag(true)
                    setMonthlyExpensesFlag(true)
                    setMonthlyOnlineOrdersArray(specifiedMonthlyOnlineOrders)
                    setMonthlyOfflineOrdersArray(specifiedMonthlyOfflineOrders)
                    setMonthlyExpensesArray(specifiedMonthlyExpenses)
                    setMonthlyStatementsLoadingFlag(false)
                }
                else if (specifiedMonthlyOnlineOrders.length >= 1 && specifiedMonthlyOfflineOrders.length === 0 && specifiedMonthlyExpenses.length >= 1) {
                    setMonthlyOnlineOrdersFlag(true)
                    setMonthlyOfflineOrdersFlag(false)
                    setMonthlyExpensesFlag(true)
                    setMonthlyOnlineOrdersArray(specifiedMonthlyOnlineOrders)
                    setMonthlyOfflineOrdersArray(specifiedMonthlyOfflineOrders)
                    setMonthlyExpensesArray(specifiedMonthlyExpenses)
                    setMonthlyStatementsLoadingFlag(false)
                }
                else if (specifiedMonthlyOnlineOrders.length >= 1 && specifiedMonthlyOfflineOrders.length === 0 && expenses.length === 0) {
                    setMonthlyOnlineOrdersFlag(true)
                    setMonthlyOfflineOrdersFlag(false)
                    setMonthlyExpensesFlag(false)
                    setMonthlyOnlineOrdersArray(specifiedMonthlyOnlineOrders)
                    setMonthlyOfflineOrdersArray(specifiedMonthlyOfflineOrders)
                    setMonthlyExpensesArray(specifiedMonthlyExpenses)
                    setMonthlyStatementsLoadingFlag(false)
                }
                else if (specifiedMonthlyOnlineOrders.length === 0 && specifiedMonthlyOfflineOrders.length >= 1 && specifiedMonthlyExpenses.length >= 1) {
                    setMonthlyOnlineOrdersFlag(false)
                    setMonthlyOfflineOrdersFlag(true)
                    setMonthlyExpensesFlag(true)
                    setMonthlyOnlineOrdersArray(specifiedMonthlyOnlineOrders)
                    setMonthlyOfflineOrdersArray(specifiedMonthlyOfflineOrders)
                    setMonthlyExpensesArray(specifiedMonthlyExpenses)
                    setMonthlyStatementsLoadingFlag(false)
                }
                else if (specifiedMonthlyOnlineOrders.length === 0 && specifiedMonthlyOfflineOrders.length >= 1 && specifiedMonthlyExpenses.length === 0) {
                    setMonthlyOnlineOrdersFlag(false)
                    setMonthlyOfflineOrdersFlag(true)
                    setMonthlyExpensesFlag(false)
                    setMonthlyOnlineOrdersArray(specifiedMonthlyOnlineOrders)
                    setMonthlyOfflineOrdersArray(specifiedMonthlyOfflineOrders)
                    setMonthlyExpensesArray(specifiedMonthlyExpenses)
                    setMonthlyStatementsLoadingFlag(false)
                } else if (specifiedMonthlyOnlineOrders.length === 0 && specifiedMonthlyOfflineOrders.length === 0 && specifiedMonthlyExpenses.length >= 1) {
                    setMonthlyOnlineOrdersFlag(false)
                    setMonthlyOfflineOrdersFlag(false)
                    setMonthlyExpensesFlag(true)
                    setMonthlyOnlineOrdersArray(specifiedMonthlyOnlineOrders)
                    setMonthlyOfflineOrdersArray(specifiedMonthlyOfflineOrders)
                    setMonthlyExpensesArray(specifiedMonthlyExpenses)
                    setMonthlyStatementsLoadingFlag(false)
                } else if (specifiedMonthlyOnlineOrders.length === 0 && specifiedMonthlyOfflineOrders.length === 0 && specifiedMonthlyExpenses.length >= 1) {
                    setMonthlyOnlineOrdersFlag(false)
                    setMonthlyOfflineOrdersFlag(false)
                    setMonthlyExpensesFlag(true)
                    setMonthlyOnlineOrdersArray(specifiedMonthlyOnlineOrders)
                    setMonthlyOfflineOrdersArray(specifiedMonthlyOfflineOrders)
                    setMonthlyExpensesArray(specifiedMonthlyExpenses)
                    setMonthlyStatementsLoadingFlag(false)
                } else if (specifiedMonthlyOnlineOrders.length === 0 && specifiedMonthlyOfflineOrders.length === 0 && specifiedMonthlyExpenses.length === 0) {
                    setMonthlyOnlineOrdersFlag(false)
                    setMonthlyOfflineOrdersFlag(false)
                    setMonthlyExpensesFlag(false)
                    setMonthlyOnlineOrdersArray(specifiedMonthlyOnlineOrders)
                    setMonthlyOfflineOrdersArray(specifiedMonthlyOfflineOrders)
                    setMonthlyExpensesArray(specifiedMonthlyExpenses)
                    setMonthlyStatementsLoadingFlag(false)
                } else if (specifiedMonthlyOnlineOrders.length >= 1 && specifiedMonthlyOfflineOrders.length >= 1 && specifiedMonthlyExpenses.length === 0) {
                    setMonthlyOnlineOrdersFlag(true)
                    setMonthlyOfflineOrdersFlag(true)
                    setMonthlyExpensesFlag(false)
                    setMonthlyOnlineOrdersArray(specifiedMonthlyOnlineOrders)
                    setMonthlyOfflineOrdersArray(specifiedMonthlyOfflineOrders)
                    setMonthlyExpensesArray(specifiedMonthlyExpenses)
                    setMonthlyStatementsLoadingFlag(false)
                }
                ws.close()
            }
        }
    }
    const handleDateClick = (date) => {
        setSelectedDate(date);
        setIsDropdownOpen(false)
        setUpWsConnection(date)
    }
    const handleMonthClick = (mon) => {
        setSelectedMonth(mon)
        setIsDropdownOpenMonthlyStatements(false)
        setUpWsConnectionOnMonthlyClicked(mon)
    }
    let todaysTotalObject = {}
    let todaysTotalIncome = 0
    if (OnlineOrdersFlag) {
        OnlineOrdersArray.forEach((order) => {
            order.orders.forEach((item) => {
                if (!todaysTotalObject[item.food]) {
                    todaysTotalObject[item.food] = { total: 0, itemTotal: 0 };
                }
                todaysTotalObject[item.food].total += item.quantity;
                todaysTotalObject[item.food].itemTotal += item.itemTotal;
            });
            todaysTotalIncome += order.cartTotal;
        });
        todaysTotalObject.todaysTotalIncome = todaysTotalIncome;

    }
    console.log('Todays online income', todaysTotalIncome)

    let todaysOfflineObject = {}
    let todaysOfflineIncome = 0
    if (OfflineOrdersFlag) {
        OfflineOrdersArray.forEach(data => {
            if (todaysOfflineObject[data.inputValue]) {
                todaysOfflineObject[data.inputValue].count++;
                todaysOfflineObject[data.inputValue].todaysOfflineIncome += data.incomeAmount;
            } else {
                todaysOfflineObject[data.inputValue] = {
                    count: 1,
                    todaysOfflineIncome: data.incomeAmount
                };
            }
            todaysOfflineIncome += data.incomeAmount;
        });

    }
    console.log('Todays offline income', todaysOfflineIncome)
    let todaysExpensesObject = {}
    let todaysTotalExpenses = 0
    if (ExpensesFlag) {
        ExpensesArray.forEach(data => {
            if (todaysExpensesObject[data.inputValue]) {
                todaysExpensesObject[data.inputValue].count++;
                todaysExpensesObject[data.inputValue].todaysTotalExpenses += data.incomeAmount;
            } else {
                todaysExpensesObject[data.inputValue] = {
                    count: 1,
                    todaysTotalExpenses: data.incomeAmount
                };
            }
            todaysTotalExpenses += data.incomeAmount;
        });

    }
    console.log('Todays expenses', todaysTotalExpenses)

    useEffect(() => {
        const setConnectionToWebserver = () => {
            const ws = new WebSocket('wss://gigifoods.herokuapp.com');
            setWs(ws);
            ws.onopen = () => {
                console.log('Admin WebSocket connection open.');
            };
            ws.onmessage = ({ data }) => {
                const { messageName, onlineOrders, offlineOrders, expenses } = JSON.parse(data)
                if (messageName === "todays_transactions") {
                    if (onlineOrders.length >= 1 && offlineOrders.length >= 1 && expenses.length >= 1) {
                        setOnlineOrdersFlag(true)
                        setOfflineOrdersFlag(true)
                        setExpensesFlag(true)
                        setOnlineOrdersArray(onlineOrders)
                        setOfflineOrdersArray(offlineOrders)
                        setExpensesArray(expenses)
                        setOnlineOrdersLoading(false)
                    }
                    else if (onlineOrders.length >= 1 && offlineOrders.length === 0 && expenses.length >= 1) {
                        setOnlineOrdersFlag(true)
                        setOfflineOrdersFlag(false)
                        setExpensesFlag(true)
                        setOnlineOrdersArray(onlineOrders)
                        setOfflineOrdersArray(offlineOrders)
                        setExpensesArray(expenses)
                        setOnlineOrdersLoading(false)
                    }
                    else if (onlineOrders.length >= 1 && offlineOrders.length === 0 && expenses.length === 0) {
                        setOnlineOrdersFlag(true)
                        setOfflineOrdersFlag(false)
                        setExpensesFlag(false)
                        setOnlineOrdersArray(onlineOrders)
                        setOfflineOrdersArray(offlineOrders)
                        setExpensesArray(expenses)
                        setOnlineOrdersLoading(false)
                    }
                    else if (onlineOrders.length === 0 && offlineOrders.length >= 1 && expenses.length >= 1) {
                        setOnlineOrdersFlag(false)
                        setOfflineOrdersFlag(true)
                        setExpensesFlag(true)
                        setOnlineOrdersArray(onlineOrders)
                        setOfflineOrdersArray(offlineOrders)
                        setExpensesArray(expenses)
                        setOnlineOrdersLoading(false)
                    }
                    else if (onlineOrders.length === 0 && offlineOrders.length >= 1 && expenses.length === 0) {
                        setOnlineOrdersFlag(false)
                        setOfflineOrdersFlag(true)
                        setExpensesFlag(false)
                        setOnlineOrdersArray(onlineOrders)
                        setOfflineOrdersArray(offlineOrders)
                        setExpensesArray(expenses)
                        setOnlineOrdersLoading(false)
                    } else if (onlineOrders.length === 0 && offlineOrders.length === 0 && expenses.length >= 1) {
                        setOnlineOrdersFlag(false)
                        setOfflineOrdersFlag(false)
                        setExpensesFlag(true)
                        setOnlineOrdersArray(onlineOrders)
                        setOfflineOrdersArray(offlineOrders)
                        setExpensesArray(expenses)
                        setOnlineOrdersLoading(false)
                    } else if (onlineOrders.length === 0 && offlineOrders.length === 0 && expenses.length >= 1) {
                        setOnlineOrdersFlag(false)
                        setOfflineOrdersFlag(false)
                        setExpensesFlag(true)
                        setOnlineOrdersArray(onlineOrders)
                        setOfflineOrdersArray(offlineOrders)
                        setExpensesArray(expenses)
                        setOnlineOrdersLoading(false)
                    } else if (onlineOrders.length === 0 && offlineOrders.length === 0 && expenses.length === 0) {
                        setOnlineOrdersFlag(false)
                        setOfflineOrdersFlag(false)
                        setExpensesFlag(false)
                        setOnlineOrdersArray(onlineOrders)
                        setOfflineOrdersArray(offlineOrders)
                        setExpensesArray(expenses)
                        setOnlineOrdersLoading(false)
                    } else if (onlineOrders.length >= 1 && offlineOrders.length >= 1 && expenses.length === 0) {
                        setOnlineOrdersFlag(true)
                        setOfflineOrdersFlag(true)
                        setExpensesFlag(false)
                        setOnlineOrdersArray(onlineOrders)
                        setOfflineOrdersArray(offlineOrders)
                        setExpensesArray(expenses)
                        setOnlineOrdersLoading(false)
                    }
                    ws.close()
                }
            };
            ws.onclose = () => {
                console.log('WebSocket connection closed.');
            };
            return ws;
        }
        const setConn = setConnectionToWebserver()
        if (setConn) {
            console.log("Connection set")
        }
        else setConnectionToWebserver()

    }, []);
    const todaysTotalProfit = todaysTotalIncome + todaysOfflineIncome - todaysTotalExpenses
    console.log('Todays Profit babyy', todaysTotalProfit)
    const today = new Date();
    const previousDates = [today];
    for (let i = 1; i <= 30; i++) {
        let prevDate = new Date();
        prevDate.setDate(prevDate.getDate() - i);
        previousDates.push(prevDate);
    }

    const currentDate = new Date()
    const months = Array.from({ length: 12 }, (_, i) => {
        let month = new Date(currentDate)
        month.setMonth(month.getMonth() - i)
        return month;
    })
    const HandleMonthlyStatementsButtonClick = (e) => {
        e.preventDefault()
        setmonthlyStatements(true)
        setbusinessToday(false)
        setUpWsConnectionOnMonthlyClicked(currentDate)
        if (isDropdownOpen) {
            setIsDropdownOpen(false)
        } else if (isDropdownOpenMonthlyStatements) {
            setIsDropdownOpenMonthlyStatements(false)
        }
    }
    useEffect(() => {
        if (ws) {
            ws.addEventListener('open', () => {
                let date = new Date()
                let dateString = date.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });
                ws.send(JSON.stringify({ messageName: "get_todays_transactions", dateString }))
            });
        } else {
            console.log("Web socket didn't connect")
        }
    }, [ws]);

    return (
        <div className='AdminPage'>
            <div className='admin-page-top-flex-container'>
                <div className='admin-page-back-button-and-amount-container'>

                    <button className='back-arrow-buttons' id='admin-page-back-button' onClick={() => navigate('/Home')}><BiArrowBack /></button>

                    {businessToday ? <div className='today-amount'>
                        {selectedDate ? <p style={{ color: 'rgba(179, 188, 76, 1)', fontSize: '12px' }}>{selectedDate.toLocaleDateString("en-US", { weekday: 'long' })}</p> : <p style={{ color: 'rgba(179, 188, 76, 1)', fontSize: '12px' }}>Today</p>}
                        <p style={{ color: 'rgba(232, 232, 232, 1)', fontSize: '34px' }}>{todaysTotalProfit}</p>
                    </div> : monthlyStatements ? <div className='today-amount'>
                        {selectedMonth ? <p style={{ color: 'rgba(179, 188, 76, 1)', fontSize: '12px' }}>{selectedMonth.toLocaleDateString("en-US", { month: 'short' })}</p> : <p style={{ color: 'rgba(179, 188, 76, 1)', fontSize: '12px' }}>{currentDate.toLocaleDateString("en-US", { month: 'short' })}</p>}
                        <p style={{ color: 'rgba(232, 232, 232, 1)', fontSize: '34px' }}>{profit}</p>
                    </div> : null}
                    <LogoutIcon />
                </div>
                <div className='business-today-and-statements-container'>
                    <button onClick={HandleBusinessTodayButtonClick} style={{ backgroundColor: businessToday ? '#8a2be2' : 'rgb(247, 245, 245)', color: businessToday ? 'rgb(231, 226, 226)' : 'grey', display: "flex" }}>Business Today<div id="today-button" onClick={handleDropdownClick} style={{ marginLeft: "5px", display: "flex", justifyContent: "center", alignItems: "center", width: "20px", height: "25px" }}><IoMdArrowDropdown style={{ width: "20px", height: "20px" }} /></div></button>
                    <button onClick={HandleMonthlyStatementsButtonClick} style={{ backgroundColor: monthlyStatements ? '#8a2be2' : 'rgb(247, 245, 245)', color: monthlyStatements ? 'rgb(231, 226, 226)' : 'grey' }}>Monthly Statements<div id="today-button" onClick={handleDropdownClickMonthlyStatements} style={{ marginLeft: "5px", display: "flex", justifyContent: "center", alignItems: "center", width: "20px", height: "25px" }}><IoMdArrowDropdown style={{ width: "20px", height: "20px" }} /></div></button>
                </div>
                <div className='date-dropdown-div'>
                    <div className='dateopendiv'>
                        {isDropdownOpen ? <div id="date-dropdown" >
                            <ul style={{ listStyleType: "none" }}>
                                {previousDates.map((date) => (
                                    <li key={date} onClick={() => handleDateClick(date)} style={{ display: "flex", borderBottom: "0.5px solid grey", marginBottom: "5px", marginLeft: "-20px" }}>
                                        {date.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', year: 'numeric', month: 'short' })}
                                    </li>
                                ))}
                            </ul>

                        </div> : null}
                    </div>
                    <div className='monthopendiv'>
                        {isDropdownOpenMonthlyStatements ? <div id='month-dropdown'>
                            <ul style={{ listStyleType: "none" }}>
                                {months.map((mon, index) => (
                                    <li key={index} onClick={() => handleMonthClick(mon)} style={{ display: "flex", borderBottom: "0.5px solid grey", marginBottom: "5px", marginLeft: "-10px" }}>
                                        {mon.toLocaleString("en-US", { month: "short" })}, {mon.getFullYear() % 100}
                                    </li>
                                ))}
                            </ul>
                        </div> : null}
                    </div>
                </div>
            </div>
            {businessToday ? <div className='order-types-and-expenses-main-container'>
                <div className='order-types-and-expenses-button-container'>
                    <button onClick={HandleOnlineOrdersButtonClick} style={{ border: onlineOrders ? '1.5px solid #8a2be2' : '1px solid  rgba(197, 191, 191, 1)', color: onlineOrders ? '#8a2be2' : 'grey', height: onlineOrders ? '54px' : '44px' }}>Online orders <AiOutlineShoppingCart /></button>
                    <button onClick={HandleOfflineOrdersButtonClick} style={{ border: offlineOrders ? '1.5px solid #8a2be2' : '1px solid  rgba(197, 191, 191, 1)', color: offlineOrders ? '#8a2be2' : 'grey', height: offlineOrders ? '54px' : '44px' }}>In-shop orders <BsShop /></button>
                    <button onClick={HandleExpensesButtonClick} style={{ border: expenses ? '1.5px solid #8a2be2' : '1px solid  rgba(197, 191, 191, 1)', color: expenses ? '#8a2be2' : 'grey', height: expenses ? '54px' : '44px' }}>Expenses <BiCoinStack /></button>
                </div>
                {OnlineOrdersLoading ?
                    <div className='admin-page-loading-div'> <LoadingBlue /> </div>
                    : onlineOrders && OnlineOrdersFlag ?
                        <div className='admin-page-online-orders'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Food</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {OnlineOrdersArray.map((object) => (
                                        object.orders.map((order) => (
                                            <tr key={order._id} className='order-details-tbody'>
                                                <td>{order.food}</td>
                                                <td>{order.quantity}</td>
                                                <td>{order.itemTotal}</td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                        </div> : onlineOrders && !OnlineOrdersFlag ? <div><img src={kitten} alt='kitten' className='kitten' /></div> : null}

                {OnlineOrdersLoading ?
                    null
                    : offlineOrders && OfflineOrdersFlag ?
                    <div className='admin-page-online-orders'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Food</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {OfflineOrdersArray.map((order) => (
                                    <tr key={order._id} className='order-details-tbody'>
                                        <td>{order.inputValue}</td>
                                        <td>{order.incomeAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> : offlineOrders && !OfflineOrdersFlag ? <div><img src={kitten} alt='kitten' className='kitten' /></div> : null}

                {OnlineOrdersLoading ?
                    null
                    : expenses && ExpensesFlag ?
                    <div className='admin-page-online-orders'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Expense</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ExpensesArray.map((order) => (
                                    <tr key={order._id} className='order-details-tbody'>
                                        <td>{order.inputValue}</td>
                                        <td>{order.incomeAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> : expenses && !ExpensesFlag ? <div><img src={kitten} alt='kitten' className='kitten' /></div> : null}
            </div> : null}

            {monthlyStatements ?
                <div className='order-types-and-expenses-main-container'>

                    {monthlyStatementsLoadingFlag ? null 
                        : monthlyOnlineOrdersFlag ?
                        <div className='monthly-statements-container'>
                            <p><AiOutlineShoppingCart /> Online orders</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Buys</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthlyOrdersArray.map((innerArray, index) => {
                                        return innerArray.map((item, index) => {
                                            return (
                                                <tr key={index} className='order-details-tbody'>
                                                    <td>{item[0]}</td>
                                                    <td>{item[1]}</td>
                                                    <td>{item[2]}</td>
                                                </tr>
                                            );
                                        });
                                    })}
                                </tbody>
                            </table>

                        </div> : <div className='order-types-and-expenses-main-container'><p>No online orders statement</p><img src={diver} alt='diver' className='diver' /></div>
                    }
                    {monthlyStatementsLoadingFlag ? <div className='admin-page-loading-div'> <LoadingBlue /> </div> 
                        : monthlyOfflineOrdersFlag ?
                        <div className='monthly-statements-container'>
                            <p><BsShop /> In-shop orders</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Buys</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(incomeDataCount).map((key, index) => {
                                        return (
                                            <tr key={index} className='order-details-tbody'>
                                                <td>{key}</td>
                                                <td>{incomeDataCount[key].count}</td>
                                                <td>{incomeDataCount[key].totalIncome}</td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td style={{ fontSize: '12px', color: 'grey' }}>Total</td>
                                        <td>{totalIncome}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div> : <div className='order-types-and-expenses-main-container'><p>No inshop orders statement</p><img src={diver} alt='diver' className='diver' /></div>
                    }
                    {monthlyStatementsLoadingFlag ? null 
                        :monthlyExpensesFlag ?
                        <div className='monthly-statements-container'>
                            <p><BiCoinStack /> Expenses</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Expense</th>
                                        <th>Times</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(expenseDataCount).map((key, index) => {
                                        return (
                                            <tr key={index} className='order-details-tbody'>
                                                <td>{key}</td>
                                                <td>{expenseDataCount[key].count}</td>
                                                <td>{expenseDataCount[key].totalExpenses}</td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td style={{ fontSize: '12px', color: 'grey' }}>Total</td>
                                        <td>{totalExpenses}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> : <div className='order-types-and-expenses-main-container'><p>No expenses statement</p><img src={diver} alt='diver' className='diver' /></div>
                    }
                    <div className='page-white-space'></div>
                </div> : null}
        </div>
    )
}
export default AdminPage;