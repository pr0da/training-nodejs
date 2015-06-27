module.exports = bookController;


function bookController(Book) {
    return {
        post: post,
        get: get
    };

    function post(req, res) {
        var book = new Book(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        else {
            book.save();
            res.status(201);
            res.send(book);
        }
    }

    function get(req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err) {
                console.log(err);
            }
            else {
                var returnBooks = books.map(function (book) {
                    var bookJson = book.toJSON();
                    bookJson.links = {
                        self: 'http://' + req.headers.host + '/api/books/' + bookJson._id
                    };
                    return bookJson;
                });
                res.json(returnBooks);
            }
        });
    }
}