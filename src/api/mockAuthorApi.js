import delay from './delay';

const authors = [
  {
    id: 'john-wood',
    firstName: 'John',
    lastName: 'Wood'
  },
  {
    id: 'adrianne-derby',
    firstName: 'Adrianne',
    lastName: 'Derby'
  },
  {
    id: 'slava-perseverev',
    firstName: 'Slava',
    lastName: 'Perseverev'
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (author) => {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

class AuthorApi {
  static getAllAuthors() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], authors));
      }, delay);
    });
  }

  static saveAuthor(author) {
	author = Object.assign({}, author); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const minAuthorNameLength = 3;
        if (author.firstName.length < minAuthorNameLength) {
          reject(`First Name must be at least ${minAuthorNameLength} characters.`);
        }

        if (author.lastName.length < minAuthorNameLength) {
          reject(`Last Name must be at least ${minAuthorNameLength} characters.`);
        }

        if (author.id) {
          const existingAuthorIndex = authors.findIndex(a => a.id == author.id);
          authors.splice(existingAuthorIndex, 1, author);
        } else {
          author.id = generateId(author);
          authors.push(author);
        }

        resolve(author);
      }, delay);
    });
  }

  static deleteAuthor(authorId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfAuthorToDelete = authors.findIndex(author => {
          author.id == authorId;
        });
        authors.splice(indexOfAuthorToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default AuthorApi;
