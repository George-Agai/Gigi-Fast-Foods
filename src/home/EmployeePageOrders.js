import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import AdminPage from './AdminPage'
import { BiArrowBack } from 'react-icons/bi'
import DropdownInput from './DropDownInput';
import PendingOrderTemplate from './PendingOrderTemplate'
import penguin from './images/penguin.png'
import LogoutIcon from './LogoutIcon';

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
    const [loginFlag, setloginFlag] = useState(() => {
        const LoginPage = localStorage.getItem('loginFlag');
        return LoginPage ? JSON.parse(LoginPage) : true;
    });
    const [Login, setLogin] = useState(() => {
        const EmployeeLoginPage = localStorage.getItem('Login');
        return EmployeeLoginPage ? JSON.parse(EmployeeLoginPage) : '';
    });
    const [adminLogin, setAdminLogin] = useState(() => {
        const AdminLoginPage = localStorage.getItem('adminLogin');
        return AdminLoginPage ? JSON.parse(AdminLoginPage) : '';
    });
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

    useEffect(() => {
        localStorage.setItem('loginFlag', JSON.stringify(loginFlag));
        localStorage.setItem('Login', JSON.stringify(Login));
        localStorage.setItem('adminLogin', JSON.stringify(adminLogin));
    }, [loginFlag, Login, adminLogin]);

    const onBackButtonClicked = (e) => {
        navigate('/Home')
        if (Login) {
            setloginFlag(false)
        }
        else {
            setLogin(true)
        }
    }
    //Employee login form onsubmit 
    const HandleEmployeeLogin = (e) => {
        e.preventDefault();
        const user = "Jane";
        const passwordd = "Jane2022";

        if (user === name && password === passwordd) {
            setLogin(true);
            setloginFlag(false);
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
            setloginFlag(false);
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

    useEffect(() => {
        const setConnectionToWebserver = () => {
            const ws = new WebSocket('wss://gigifoods.herokuapp.com');
            setWs(ws);
            ws.onopen = () => {
                console.log('WebSocket connection open nigaaaaaaa.');
            };
            ws.onmessage = ({ data }) => {
                const { pendingOrders, messageName } = JSON.parse(data)
                if (messageName === 'pending_order') {
                    if (pendingOrders.length >= 1) {
                        setNewOrder(pendingOrders)
                        setOrderFlag(true)
                    } else {
                        setOrderFlag(false)
                    }
                } else if (messageName === 'error') {
                    console.log('No pending order')
                }
                ws.close()
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
            {loginFlag &&
                <div className='manage-main-container'>
                    <h3 id='manage-main-container-heading'>GIGI FAST FOODS</h3>
                    <div id='employee-login-div'>
                        <p id='user'>User</p>
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
                </div>
            }

            {Login &&
                <div className='Employee-Page-Orders'>
                    <div className='admin-page-back-button-and-amount-container'>
                        <button className='back-arrow-buttons' id='employee-page-back-button' onClick={onBackButtonClicked}><BiArrowBack /></button>
                        <LogoutIcon />
                        </div>
                    <div className='orders-income-expense-div'>
                        <button onClick={HandleOrdersButtonClick} style={{ backgroundColor: orderButtonActive ? '#8a2be2' : 'rgb(247, 245, 245)', color: orderButtonActive ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Orders</button>
                        <button onClick={HandleIncomeButtonClick} style={{ backgroundColor: incomeButtonActive ? '#8a2be2' : 'rgb(247, 245, 245)', color: incomeButtonActive ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Income +</button>
                        <button onClick={HandleExpensesButtonClick} style={{ backgroundColor: expensesButtonActive ? '#8a2be2' : 'rgb(247, 245, 245)', color: expensesButtonActive ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Expenses -</button>
                    </div>

                    {orderButtonActive && OrderFlag ? <div className='orders-main-container'>
                        <PendingOrderTemplate newOrder={newOrder} />
                    </div>
                        : orderButtonActive && !OrderFlag ? <div className='orders-main-container'><img src={penguin} alt='penguin' className='penguin' /><p style={{ fontSize: '18px', fontWeight: '700' }}>No orders</p></div> : null}

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
                </div>
            }

            {adminLogin &&
                <div>
                    <AdminPage />
                </div>
            }

        </div>
    )
}
export default EmployeePageOrders;