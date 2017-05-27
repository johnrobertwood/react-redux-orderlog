import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const OrderListRow = ({order, onChange}) => {
  return (
    <tr style={{backgroundColor: order.complete ? '#e6e6e6' : '#ffffff'}}>
      <td><Link to={'/order/' + order.id}>{order.workorder}</Link></td>
      <td>{order.authorid}</td>
      <td>{order.partnumber}</td>
      <td>{order.notes}</td>
      <td><input type="checkbox" name="completeBox" value="complete" onChange={onChange} checked={order.complete}/></td>
    </tr>
  );
};

OrderListRow.propTypes = {
  order: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default OrderListRow;