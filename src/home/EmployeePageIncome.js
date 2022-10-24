import React from 'react'
import DropdownInput from './DropDownInput';
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


const options = [
  { key: 1, value: 'Chips + smokie' }, 
  { key: 2, value: 'chicken' }, 
  { key: 3, value: 'smokies' }, 
  { key: 4, value: 'fish' }
];

const EmployeePageIncome = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className='Employee-Page-Income'>
      <button className='back-arrows' onClick={() => navigate('/EmployeePageOrders')}>Back</button>
      <div>
        <DropdownInput
          options={options}
          onChange={(item) => setSelectedOption(item)}
          selectedKey={selectedOption}
          menuClassName='dropdown-input'
          placeholder={'Chips + smokie'}
          
        />
        {selectedOption}
      </div>
    </div>
  )
}
export default EmployeePageIncome;