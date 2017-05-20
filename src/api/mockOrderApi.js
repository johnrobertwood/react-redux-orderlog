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
    var order = Object.assign({}, order);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var myInit = { method: 'POST',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   body: JSON.stringify(order) };

    return new Promise((resolve, reject) => {
        fetch('/orders', myInit)
        .then(res => res.json())
        .then(json => resolve(json));
    });
  }
}

export default OrderApi;
