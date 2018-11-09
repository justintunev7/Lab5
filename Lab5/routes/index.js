var express = require('express');
var router = express.Router();
/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database, for other labs, change what goes into the schema
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Creates collection named "comment" if it doesn't exist. On other labs, change name of collection. Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected to database');
});


/* GET home page. */
router.post('/comment', function(req, res, next) {
    console.log("POST comment route");
    console.log(req.body);
    var newcomment = new Comment(req.body);
    newcomment.save(function(err, result) {
        if (err) { console.log('Error: new comment') }
        else {
            console.log('Save worked');
            console.log(result);
            res.sendStatus(200);
        }
    });
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
    console.log("In the GET route");
    console.log(req.query);
    var requestname = req.query["q"];
    console.log(requestname);
    var obj = {};
    if (requestname) {
        obj = { Name: requestname };
    }
    Comment.find(obj, function(err, commentList) {
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(commentList); //Otherwise console log the comments you found
            res.json(commentList); //Then send the comments
        }
    });

});

router.delete('/comment', function(req, res, next) {
    console.log("In the DELETE route");
    Comment.deleteMany({}, function(err, commentList) {
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(commentList);
            res.json(commentList);
        }
    });
});


module.exports = router;
