import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../../actions/orderActions';
import OrderForm from './OrderForm';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import { pathToJS } from 'react-redux-firebase';

class ManageOrderPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: Object.assign({}, props.order),
      errors: {},
      saving: false
    };

    this.updateOrderState = this.updateOrderState.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
}
  
  componentWillReceiveProps(nextProps) {
    if (this.props.order.id != nextProps.order.id) {
      // Necessary to populate form when existing order is loaded directly.
      this.setState({order: Object.assign({}, nextProps.order)});
    }
  }
  
  updateOrderState(e) {
    const field = e.target.name;
    let order = this.state.order;
    order[field] = e.target.value;
    return this.setState({order: order});
  }

  saveOrder(e) {
    e.preventDefault();
    this.setState({saving: true});
    let order = this.state.order;
    this.props.actions.saveOrder(order)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      }); 
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Order saved');
    browserHistory.push('/orders'); 
  }

  render() {
    return (
      <OrderForm 
        allAuthors={this.props.authors}
        onChange={this.updateOrderState}
        onSave={this.saveOrder}
        order={this.state.order} 
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageOrderPage.propTypes = {
  order: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getOrderById(orders, id) {
  const order = orders.filter(order => order.id == id);
  if (order.length) return order[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const orderId = ownProps.params.id; // from the path `/order/:id`

  let order = {id: '', authorid: '', partnumber: '', notes: '', workorder: '', complete: false};
  
  if (orderId && state.orders.length > 0) {
    order = getOrderById(state.orders, orderId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    order: order,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(orderActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrderPage);

