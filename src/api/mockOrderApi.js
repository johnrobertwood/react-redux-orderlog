import delay from './delay';
import firebase from 'firebase';
import database from '../database';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const orders = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/orders/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript",
    complete: false
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/orders/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices",
    complete: false
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/orders/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture",
    complete: false
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/orders/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career",
    complete: false
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/orders/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5",
    complete: false
  }
];

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
      // var userId = firebase.auth().currentUser.uid;
      let orders = firebase.database().ref('/orders').once('value').then(function(snapshot) {
        // var username = snapshot.val().username;
        orders = Object.keys(snapshot.val()).map(function(key) {
          return snapshot.val()[key];
        });
        resolve(Object.assign([], orders));
      });
    });
  }

  static saveOrder(order) {

    order = Object.assign({}, order); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minOrderTitleLength = 1;
        if (order.title.length < minOrderTitleLength) {
          reject(`Title must be at least ${minOrderTitleLength} characters.`);
        }

        if (order.id) {
          const existingOrderIndex = orders.findIndex(a => a.id == order.id);
          orders.splice(existingOrderIndex, 1, order);
          firebase.database().ref('orders/' + order.id).set(
            order
          );
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new orders in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          // order.id = generateId(order);
          order.id = Date.now();
          // order.complete = false;
          order.watchHref = `http://www.pluralsight.com/orders/${order.id}`;
          orders.push(order);
          firebase.database().ref('orders/' + order.id).set(
            order
          );
        }

        resolve(order);
      }, delay);
    });
  }

  static deleteOrder(orderId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfOrderToDelete = orders.findIndex(order => {
          order.id == orderId;
        });
        orders.splice(indexOfOrderToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default OrderApi;
