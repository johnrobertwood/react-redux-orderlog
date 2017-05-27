import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../../actions/orderActions';
import OrderList from './OrderList';
import Footer from '../common/Footer';
import { browserHistory } from 'react-router';

class OrdersPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.redirectToAddOrderPage = this.redirectToAddOrderPage.bind(this);
  }

  orderRow(order, index) {
    return <div key={index}>{order.title}</div>;
  }

  redirectToAddOrderPage() {
    browserHistory.push('/order');
  }

  render() {
    const { orders } = this.props;
    
    return (
      <div className="list-wrapper">
        <div className="list-content">
          <h1>Orders</h1>
          <input 
            type="submit"
            value="Add Order"
            className="btn btn-primary"
            onClick={this.redirectToAddOrderPage} />
          <OrderList orders={orders} />
        </div>
        <Footer />
    </div>
    );
  }
}

OrdersPage.propTypes = {
  orders: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    orders: state.orders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(orderActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);