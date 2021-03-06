var should = require('should'),
    sinon = require('sinon');

describe('Book Controller Tests:', function () {
    describe('POST', function () {
        it('should not allow an empty title on POST', function () {
            var req = {
                body: {
                    author: 'John'
                }
            };
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var bookCtrl = require('../controllers/bookController')(Book);

            bookCtrl.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});

function Book(book) {
    this.save = function () {

    };
}