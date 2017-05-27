import delay from './delay';

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (Order) => {
  return replaceAll(Order.title, ' ', '-');
};

class OrderApi {
  static getAllOrders() {
    return new Promise((resolve, reject) => {
      fetch(`/orders`)
      .then(res => res.json())
      .then(json => resolve(json));
    });
  }

  static saveOrder(order) {
    const saveOrder = Object.assign({}, order);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let methodType = order.id ? 'PUT' : 'POST';
    const myInit = { method: methodType,
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   body: JSON.stringify(saveOrder) };

    return new Promise((resolve, reject) => {
        fetch('/orders', myInit)
        .then(res => res.json())
        .then(json => resolve(json));
    });
  }

  static deleteOrder(order) {
    const deleteOrder = Object.assign({}, order);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const myInit = { method: 'DELETE',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   body: JSON.stringify(deleteOrder) };

    return new Promise((resolve, reject) => {
        fetch('/orders', myInit)
        .then(res => res.json())
        .then(json => resolve(json));
    }); 
  }
}

export default OrderApi;
