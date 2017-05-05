import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const OrderListRow = ({order, onChange}) => {
  return (
    <tr style={{backgroundColor: order.complete ? '#e6e6e6' : '#ffffff'}}>
      <td><a href={order.watchHref} target="_blank">&nbsp;</a></td>
      <td><Link to={'/order/' + order.id}>{order.title}</Link></td>
      <td>{order.authorId}</td>
      <td>{order.category}</td>
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