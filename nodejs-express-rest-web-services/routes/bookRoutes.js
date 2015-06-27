var express = require('express');


function createBookRoutes(Book) {
    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController.js')(Book);

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                console.log(err);
                res.status(500).send('Error');
            }
            else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('No Book Found');
            }
        });
    });
    bookRouter.route('/:bookId')
        .get(function (req, res) {
            var returnBook = req.book.toJSON();
            returnBook.links = {
                FilterByThisGenre: encodeURI('http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre)
            };
            res.json(returnBook);
        })
        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error');
                }
                else {
                    res.json(req.book);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }
            req.book.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error');
                }
                else {
                    res.json(req.book);
                }
            });
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error');
                }
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return bookRouter;
}

module.exports = createBookRoutes;