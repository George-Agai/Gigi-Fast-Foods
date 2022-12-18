import React from 'react'
import './GigiFastFoods.css'

export const CompletedOrdersView = ({ completedOrders }) => {
    return completedOrders.map(completedOrder => (
        <table id='completed-orders-view-table'>
            <tbody>
                <tr key={completedOrder.inputValue}>
                    <td>{completedOrder.inputValue}</td>
                    <td>{completedOrder.incomeAmount}</td>
                </tr>
            </tbody>
        </table>
    ))

}
