const {nanoid} = require('nanoid');
const books = require('./book');

const addBooks = (request, h) => {
    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    const id = nanoid(5);
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    }
    if (!name){
        const response = h.response({
            status: 'fail',
            message:'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    books.push(newBook);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if (isSuccess){
        if (readPage > pageCount){
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }else{
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data:{
                    bookId : id,
                },
            });
            response.code(201);
            return response;
        }   
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const showBooks = () => ({
    status : 'success',
    data: {
        books,
    },
});

const bookDetails = (request, h) => {
    const {id} = request.params;

    const book = books.filter((n) => n.id === id)[0];
    if (book !== undefined){
        const response = h.response({
            status: 'success',
            data:{
                books
            },
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      response.code(404);
      return response;
};

const editBook = (request,h) => {
    const{id} = request.params;
    const{name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    const updatedAt = new Date().toISOString();
    if (name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1){
        if (readPage > pageCount){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }else{
            books[index] = {
                ...books[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
            }
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            });
            response.code(400);
            return response;
        }
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
module.export = {addBooks,showBooks,bookDetails};
