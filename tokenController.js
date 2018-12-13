const request = require('request');

// Handle index actions
exports.view = function (req, res) {
    request.post({
        url:
        'https://github.com/login/oauth/access_token?client_id=e27022ca24dac6b11943&client_secret=a4ca3a55d48b5c53515f363b73dabf48d87767fa&code=' + req.params.code
    },
    (error, response, body) => {

        var hash;
        var token = {};
        var hashes = body.slice(body.indexOf('?') + 1).split('&');

        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            token[hash[0]] = hash[1];
        }

        res.json({
            token
        });
    });
};