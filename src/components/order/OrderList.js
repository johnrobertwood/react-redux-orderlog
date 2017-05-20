import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import OrderListRow from './OrderListRow';
import { toggleOrder, orderComplete } from '../../actions/orderActions';

const OrderList = ({orders, onChange}) => {
 return (
   <table className="table">
     <thead>
       <tr>
         <th>&nbsp;</th>
         <th>WO</th>
         <th>Inspector</th>
         <th>Part Number</th>
         <th>Notes</th>
         <th>Complete</th>
       </tr>
     </thead>
     <tbody>
       {orders.map(order => 
        <OrderListRow key={order.id} order={order} onChange={() => onChange(order)}/>
       )}
     </tbody>
   </table>
  );
};

const getVisibleCourses = (orders, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return orders;
    case 'SHOW_COMPLETED':
      return orders.filter(t => t.complete);
    case 'SHOW_ACTIVE':
      return orders.filter(t => !t.complete);
    default:
      return orders;
  }
};

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  orders: getVisibleCourses(state.orders, state.visibilityFilter)
});

const mapDispatchToProps = {
  onChange: orderComplete
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);