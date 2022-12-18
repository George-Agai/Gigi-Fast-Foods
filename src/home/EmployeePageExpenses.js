import React from 'react'
import './GigiFastFoods.css'
import DropdownInput from './DropDownInput';
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


const options = [
  { key: 1, value: 'Cooking oil' }, 
  { key: 2, value: 'Potatoes' }, 
  { key: 3, value: 'Smokies' }, 
  { key: 4, value: 'Samosas' },
  { key: 5, value: 'Kebabs' },
  { key: 6, value: 'Tokens' }
];

const EmployeePageExpenses = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
 
  return (
    <div className='Employee-Page-Expenses'>
      <button className='back-arrows' onClick={() => navigate('/EmployeePageOrders')}>Back</button>
      <div>
        <DropdownInput
          options={options}
          onChange={(item) => setSelectedOption(item)}
          selectedKey={selectedOption}
          menuClassName='dropdown-input'
          placeholder={'Cooking oil'}
        />
        
      </div>
    </div>
  )
}
export default EmployeePageExpenses;