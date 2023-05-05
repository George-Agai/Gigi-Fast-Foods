import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import AdminPage from './AdminPage'
import { BiArrowBack } from 'react-icons/bi'
import DropdownInput from './DropDownInput';
import PendingOrderTemplate from './PendingOrderTemplate'
import penguin from './images/penguin.png'

const options = {
    income: [
        { key: 1, value: 'Chips + smokie' },
        { key: 2, value: 'chicken' },
        { key: 3, value: 'smokies' },
        { key: 4, value: 'fish' }
    ],
    expenses: [
        { key: 1, value: 'Cooking oil' },
        { key: 2, value: 'Potatoes' },
        { key: 3, value: 'Smokies' },
        { key: 4, value: 'Samosas' },
        { key: 5, value: 'Kebabs' },
        { key: 6, value: 'Tokens' }
    ]
}

const EmployeePageOrders = () => {
    const navigate = useNavigate();
    const [LoginPage, setLoginPage] = useState('true');
    const [Login, setLogin] = useState(false);
    const [adminLogin, setAdminLogin] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [adminName, setAdminName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedExpenseOption, setSelectedExpenseOption] = useState("");
    const [orderButtonActive, setorderButtonActive] = useState('true')
    const [incomeButtonActive, setincomeButtonActive] = useState('')
    const [expensesButtonActive, setexpensesButtonActive] = useState('')
    const [ws, setWs] = useState(null)
    const [newOrder, setNewOrder] = useState(null)
    const [OrderFlag, setOrderFlag] = useState()

    const onBackButtonClicked = (e) => {
        navigate('/Home')
        if (Login) {
            setLoginPage(false)
        }
        else {
            setLogin(true)
        }
    }
    //Employee login form onsubmit 
    const HandleEmployeeLogin = (e) => {
        e.preventDefault();
        connectNigga();
        const user = "Jane";
        const passwordd = "Jane2022";

        if (user === name && password === passwordd) {
            setLogin(true);
            setLoginPage(false);
        }
        else alert("Wrong password");
    }

    //Admin login form onsubmit 
    const HandleAdminLogin = (e) => {
        e.preventDefault();

        const admin = "Beril";
        const adminPasswordd = "Beril2022";

        if (admin === adminName && adminPasswordd === adminPassword) {
            setAdminLogin(true);
            setLoginPage(false);
            setLogin(false);
        }
        else alert("Wrong password");
    }
    const HandleIncomeButtonClick = (e) => {
        setincomeButtonActive(true)
        setorderButtonActive(false)
        setexpensesButtonActive(false)
    }
    const HandleExpensesButtonClick = (e) => {
        setexpensesButtonActive(true)
        setincomeButtonActive(false)
        setorderButtonActive(false)
    }
    const HandleOrdersButtonClick = (e) => {
        setorderButtonActive(true)
        setexpensesButtonActive(false)
        setincomeButtonActive(false)
    }

   







const connectNigga =()=>{
    const websocket = new WebSocket('wss://gigifoods.herokuapp.com:8080');
    if(websocket){
        console.log("Forced your ass to connect")
        console.log(websocket)
    }else{
        connectNigga()
        console.log("Lets go again, connect")
    }
    testConnect(websocket)
    return websocket;
}


const testConnect= (web)=>{
    //const websocket = await new WebSocket('wss://gigifoods.herokuapp.com:8080/');
    web.onopen = () => {
        console.log('Test socken open.');
    };
    web.onclose = () => {
        console.log('Test socket closed.');
    };
    console.log("Shit doesn't work again nigga damnnnnnnnnnn")
}













    useEffect(() => {
        const setConnectionToWebserver = () => {

            // eslint-disable-next-line no-restricted-globals
            // const HOST = location.origin.replace(/^https/, 'wss')
            // const ws = new WebSocket(HOST);
            const ws = new WebSocket('wss://gigifoods.herokuapp.com');
            //const ws = new WebSocket(`wss://${window.location.hostname}:${WS_PORT}`);
            setWs(ws);
            ws.onopen = () => {
                console.log('WebSocket connection open.');
            };
            ws.onmessage = ({ data }) => {
                const { pendingOrders, messageName } = JSON.parse(data)
                if (messageName === 'pending_order') {
                    if(pendingOrders.length >=1){
                        setNewOrder(pendingOrders)
                        setOrderFlag(true)
                    }else{
                        setOrderFlag(false)
                    } 
                    ws.close()
                } else if (messageName === 'error') {
                    console.log('No pending order')
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

    useEffect(() => {
        if (ws) {
            ws.addEventListener('open', () => {
                ws.send(JSON.stringify({ messageName: 'get_pending_order' }));
            });
        } else {
            console.log("Web socket didn't connect")
        }
    }, [ws]);
    const incomeMessage = "Income"
    const expensesMessage = "Expenses"
    return (
        <div>
            {LoginPage &&
                <div className='manage-main-container'>
                    <p id='manage-main-container-heading'>GIGI FAST FOODS</p>
                    <div id='employee-login-div'>
                        <form onSubmit={HandleEmployeeLogin}>
                            <label>Name</label>
                            <input type='text' name='name' onChange={(e) => setName(e.target.value)} value={name} />
                            <label>Password</label>
                            <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                            <button type='submit' value='Submit'>Login</button>
                        </form>
                    </div>
                    <div id='admin-login-div'>
                        <p>Admin</p>
                        <form onSubmit={HandleAdminLogin}>
                            <label>Name</label>
                            <input type='text' name='name' onChange={(e) => setAdminName(e.target.value)} value={adminName} />
                            <label>Password</label>
                            <input type='password' name='password' onChange={(e) => setAdminPassword(e.target.value)} value={adminPassword} />
                            <button type='submit' value='Submit'>Login</button>
                        </form>
                    </div>
                </div>}

            {Login &&
                <div className='Employee-Page-Orders'><button className='back-arrow-buttons' id='employee-page-back-button' onClick={onBackButtonClicked}><BiArrowBack /></button>
                    <div className='orders-income-expense-div'>
                        <button onClick={HandleOrdersButtonClick} style={{ backgroundColor: orderButtonActive ? '#8a2be2' : 'rgb(247, 245, 245)', color: orderButtonActive ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Orders</button>
                        <button onClick={HandleIncomeButtonClick} style={{ backgroundColor: incomeButtonActive ? '#8a2be2' : 'rgb(247, 245, 245)', color: incomeButtonActive ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Income +</button>
                        <button onClick={HandleExpensesButtonClick} style={{ backgroundColor: expensesButtonActive ? '#8a2be2' : 'rgb(247, 245, 245)', color: expensesButtonActive ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Expenses -</button>
                    </div>

                    {orderButtonActive && OrderFlag ? <div className='orders-main-container'>
                                <PendingOrderTemplate newOrder={newOrder} />
                            </div>
                         : orderButtonActive && !OrderFlag ? <div className='orders-main-container'><img src={penguin} alt='penguin' className='penguin'/><p style={{fontSize: '18px', fontWeight: '700'}}>No orders</p></div> : null}

                    {incomeButtonActive ?
                        <div className='orders-main-container'>
                            <div className='Employee-Page-Income'>
                                <DropdownInput
                                    options={options.income}
                                    onChange={(item) => setSelectedOption(item)}
                                    selectedKey={selectedOption}
                                    menuClassName='dropdown-input'
                                    placeholder={'Chips + smokie'}
                                    incomeMessage={incomeMessage}
                                />
                            </div>
                        </div> : null}

                    {expensesButtonActive ?
                        <div className='orders-main-container'>
                            <div className='Employee-Page-Income'>
                                <DropdownInput
                                    options={options.expenses}
                                    onChange={(item) => setSelectedExpenseOption(item)}
                                    selectedKey={selectedExpenseOption}
                                    menuClassName='dropdown-input'
                                    placeholder={'Cooking oil'}
                                    expensesMessage={expensesMessage}
                                />
                            </div>
                        </div> : null}
                </div>}

            {adminLogin &&
                <div>
                    <AdminPage />
                </div>
            }

        </div>
    )
}
export default EmployeePageOrders;