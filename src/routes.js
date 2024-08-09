const addBooks = require('./handler');
const showBooks = require('./handler');
const bookDetails = require('./handler');
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooks,
    },
    {
        method: 'GET',
        path: '/books',
        handler: showBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: bookDetails,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: () => {},
    }
];