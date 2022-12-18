import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import AdminPage from './AdminPage'
import { BiArrowBack } from 'react-icons/bi'
import DropdownInput from './DropDownInput';


// Dropdown input options array
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
    const [Login, setLogin] = useState('');
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
    const [data, setData] = useState(null)

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
    const HandleIncomeButtonClick = (e) =>{
        setincomeButtonActive(true)
        setorderButtonActive(false)
        setexpensesButtonActive(false)
    }
    const HandleExpensesButtonClick = (e) =>{
        setexpensesButtonActive(true)
        setincomeButtonActive(false)
        setorderButtonActive(false)
    }
    const HandleOrdersButtonClick = (e) =>{
        setorderButtonActive(true)
        setexpensesButtonActive(false)
        setincomeButtonActive(false)
    }
    useEffect(() => {
        async function fetchData(){
            const response = await fetch('/app/Home');
            const json = await response.json();
            setData(json);
        }
        fetchData();
        
    }, []);
    console.log(data)
    return (
        <div>
            {/* LOGIN PAGE */}

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
                    {data && <div>{data.contact}
                        </div>}
                </div>}

            {Login &&
                <div className='Employee-Page-Orders'>

                    <button className='back-arrow-buttons' id='employee-page-back-button' onClick={onBackButtonClicked}><BiArrowBack /></button>
                    <div className='orders-income-expense-div'>
                        <button onClick={HandleOrdersButtonClick} style={{backgroundColor: orderButtonActive ? 'rgba(120, 122, 106, 1)' : 'rgb(247, 245, 245)', color: orderButtonActive ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Orders</button>
                        <button onClick={HandleIncomeButtonClick} style={{backgroundColor: incomeButtonActive ? 'rgba(120, 122, 106, 1)' : 'rgb(247, 245, 245)', color: incomeButtonActive ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Income +</button>
                        <button onClick={HandleExpensesButtonClick} style={{backgroundColor: expensesButtonActive ? 'rgba(120, 122, 106, 1)' : 'rgb(247, 245, 245)', color: expensesButtonActive ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Expenses -</button>
                    </div>

                    {/* ORDERS PAGE */}
                    {orderButtonActive ? 
                     <div className='orders-main-container' >
                        <div className='orders-container'>
                            <div className='orders-container-ordernumber-amount'>
                                <p className='orders-container-ordernumber'>Order 1<b className='orders-container-amount'>&ensp;&ensp;&ensp;&ensp;&ensp;360</b></p>
                            </div>
                            <div className='orders-container-details-button-container'>
                                <button className='orders-container-details-button' onClick={() => navigate('/OrderDetails')}>Details</button>
                            </div>
                        </div>
                        <div className='orders-container'>
                            <div className='orders-container-ordernumber-amount'>
                                <p className='orders-container-ordernumber'>Order 2<b className='orders-container-amount'>&ensp;&ensp;&ensp;&ensp;&ensp;450</b></p>
                            </div>
                            <div className='orders-container-details-button-container'>
                                <button className='orders-container-details-button'>Details</button>
                            </div>

                        </div>
                    </div> : null}

                    {/* INCOME */}
                    {incomeButtonActive ?
                     <div className='orders-main-container'>
                        <div className='Employee-Page-Income'>
                            <DropdownInput
                                options={options.income}
                                onChange={(item) => setSelectedOption(item)}
                                selectedKey={selectedOption}
                                menuClassName='dropdown-input'
                                placeholder={'Chips + smokie'}
                            />
                            {selectedOption}
                        </div>
                    </div> : null}

                    {/* EXPENSES */}
                    {expensesButtonActive ?
                    <div className='orders-main-container'>
                        <div className='Employee-Page-Income'>
                            <DropdownInput
                                options={options.expenses}
                                onChange={(item) => setSelectedExpenseOption(item)}
                                selectedKey={selectedExpenseOption}
                                menuClassName='dropdown-input'
                                placeholder={'Cooking oil'}
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