var express = require('express');


function createAuthorRoutes(Book) {
    var authorRouter = express.Router();
    return authorRouter;
}

module.exports = createAuthorRoutes;